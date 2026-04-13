import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { get, list, put } from "@vercel/blob";

import siteContentSeed from "../../content/site-content.json";
import leadsSeed from "../../content/leads.json";
import {
  leadInputSchema,
  leadSchema,
  siteContentSchema,
  type Lead,
  type LeadInput,
  type SiteContent,
} from "./site-schema";

const BUNDLED_CONTENT_DIR = path.join(process.cwd(), "content");
const RUNTIME_DATA_DIR = path.join(process.cwd(), ".vmbrand-data");
const TEMP_DATA_DIR = path.join(os.tmpdir(), "vmbrand-data");

const SITE_CONTENT_PREFIX = "site-content/";
const LEADS_PREFIX = "leads/";

const defaultSiteContent = siteContentSchema.parse(siteContentSeed);
const defaultLeads = Array.isArray(leadsSeed) ? leadsSeed : [];

let cachedWritableContentDir: string | null = null;
let hasLoggedFallbackDir = false;
let hasLoggedBlobUsage = false;

function usesBlobStorage() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

function getConfiguredContentDir() {
  const value = process.env.VMBRAND_CONTENT_DIR?.trim();

  if (!value) {
    return null;
  }

  if (path.isAbsolute(value)) {
    return value;
  }

  return path.join(process.cwd(), /* turbopackIgnore: true */ value);
}

function getWritableDirectoryCandidates() {
  return [
    getConfiguredContentDir(),
    BUNDLED_CONTENT_DIR,
    RUNTIME_DATA_DIR,
    TEMP_DATA_DIR,
  ].filter((value, index, list): value is string =>
    Boolean(value) && list.indexOf(value) === index,
  );
}

async function canWriteToDirectory(dir: string) {
  try {
    await mkdir(dir, { recursive: true });
    const probePath = path.join(dir, `.write-test-${process.pid}-${Date.now()}`);
    await writeFile(probePath, "ok", "utf8");
    await rm(probePath, { force: true });
    return true;
  } catch {
    return false;
  }
}

async function resolveWritableContentDir() {
  if (cachedWritableContentDir) {
    return cachedWritableContentDir;
  }

  for (const dir of getWritableDirectoryCandidates()) {
    if (await canWriteToDirectory(dir)) {
      cachedWritableContentDir = dir;

      if (dir !== BUNDLED_CONTENT_DIR && !hasLoggedFallbackDir) {
        hasLoggedFallbackDir = true;
        console.warn(
          `[vmbrand] Using fallback writable data directory: ${dir}. ` +
            "Set VMBRAND_CONTENT_DIR to a persistent writable path for production leads.",
        );
      }

      return dir;
    }
  }

  throw new Error(
    "No writable data directory available. Set VMBRAND_CONTENT_DIR to a writable path.",
  );
}

function ensureBlobLogging() {
  if (!hasLoggedBlobUsage) {
    hasLoggedBlobUsage = true;
    console.info("[vmbrand] Using Vercel Blob for site content and booking leads.");
  }
}

async function readJsonFromFile<T>(filePath: string) {
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw) as T;
}

async function writeJsonToFile(filePath: string, value: unknown) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

async function readStorageFile<T>(fileName: string, fallback: T): Promise<T> {
  const writableDir = await resolveWritableContentDir();
  const readableDirs = [
    writableDir,
    BUNDLED_CONTENT_DIR,
    RUNTIME_DATA_DIR,
    TEMP_DATA_DIR,
  ].filter((value, index, list) => list.indexOf(value) === index);

  for (const dir of readableDirs) {
    try {
      return await readJsonFromFile<T>(path.join(dir, fileName));
    } catch (error) {
      const code = (error as NodeJS.ErrnoException).code;
      if (code === "ENOENT") {
        continue;
      }

      throw error;
    }
  }

  await writeJsonToFile(path.join(writableDir, fileName), fallback);
  return fallback;
}

async function writeStorageFile(fileName: string, value: unknown) {
  const writableDir = await resolveWritableContentDir();
  await writeJsonToFile(path.join(writableDir, fileName), value);
}

function createBlobTimestampKey(value: string) {
  return value.replaceAll(":", "-").replaceAll(".", "-");
}

function buildSiteContentBlobPath(updatedAt: string) {
  return `${SITE_CONTENT_PREFIX}${createBlobTimestampKey(updatedAt)}.json`;
}

function buildLeadBlobPath(lead: Lead) {
  return `${LEADS_PREFIX}${createBlobTimestampKey(lead.createdAt)}-${lead.id}.json`;
}

async function streamToText(stream: ReadableStream<Uint8Array>) {
  return await new Response(stream).text();
}

async function listAllBlobs(prefix: string) {
  const blobs: Awaited<ReturnType<typeof list>>["blobs"] = [];
  let cursor: string | undefined;

  do {
    const page = await list({
      prefix,
      cursor,
    });

    blobs.push(...page.blobs);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  return blobs;
}

async function readLatestBlobJson<T>(prefix: string) {
  const blobs = await listAllBlobs(prefix);

  if (blobs.length === 0) {
    return null;
  }

  const latestBlob = blobs.sort(
    (left, right) => right.uploadedAt.getTime() - left.uploadedAt.getTime(),
  )[0];

  const result = await get(latestBlob.pathname, {
    access: "private",
    useCache: false,
  });

  if (!result) {
    return null;
  }

  if (!result.stream) {
    return null;
  }

  const raw = await streamToText(result.stream);
  return JSON.parse(raw) as T;
}

async function writeBlobJson(pathname: string, value: unknown) {
  ensureBlobLogging();

  await put(pathname, JSON.stringify(value, null, 2), {
    access: "private",
    addRandomSuffix: false,
    contentType: "application/json",
  });
}

async function getSiteContentFromBlob() {
  const raw = await readLatestBlobJson<SiteContent>(SITE_CONTENT_PREFIX);

  if (!raw) {
    return defaultSiteContent;
  }

  const parsed = siteContentSchema.safeParse(raw);

  if (parsed.success) {
    return parsed.data;
  }

  return defaultSiteContent;
}

async function saveSiteContentToBlob(content: SiteContent) {
  const parsed = siteContentSchema.parse({
    ...content,
    updatedAt: new Date().toISOString(),
  });

  await writeBlobJson(buildSiteContentBlobPath(parsed.updatedAt), parsed);
  return parsed;
}

async function getLeadsFromBlob() {
  const blobs = await listAllBlobs(LEADS_PREFIX);

  if (blobs.length === 0) {
    return [];
  }

  const leads = await Promise.all(
    blobs
      .sort((left, right) => right.uploadedAt.getTime() - left.uploadedAt.getTime())
      .map(async (blob) => {
        const result = await get(blob.pathname, {
          access: "private",
          useCache: false,
        });

        if (!result) {
          return null;
        }

        if (!result.stream) {
          return null;
        }

        const raw = await streamToText(result.stream);
        const parsed = leadSchema.safeParse(JSON.parse(raw));
        return parsed.success ? parsed.data : null;
      }),
  );

  return leads
    .filter((lead): lead is Lead => Boolean(lead))
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}

async function createLeadInBlob(input: LeadInput) {
  const validatedInput = leadInputSchema.parse(input);

  const nextLead = leadSchema.parse({
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...validatedInput,
  });

  await writeBlobJson(buildLeadBlobPath(nextLead), nextLead);
  return nextLead;
}

export async function getSiteContent(): Promise<SiteContent> {
  if (usesBlobStorage()) {
    return await getSiteContentFromBlob();
  }

  const raw = await readStorageFile("site-content.json", defaultSiteContent);
  const parsed = siteContentSchema.safeParse(raw);

  if (parsed.success) {
    return parsed.data;
  }

  await writeStorageFile("site-content.json", defaultSiteContent);
  return defaultSiteContent;
}

export async function saveSiteContent(content: SiteContent): Promise<SiteContent> {
  if (usesBlobStorage()) {
    return await saveSiteContentToBlob(content);
  }

  const parsed = siteContentSchema.parse({
    ...content,
    updatedAt: new Date().toISOString(),
  });

  await writeStorageFile("site-content.json", parsed);
  return parsed;
}

async function readLeadsFromDisk(): Promise<Lead[]> {
  const raw = await readStorageFile("leads.json", defaultLeads);
  const parsed = leadSchema.array().safeParse(raw);

  if (parsed.success) {
    return parsed.data.sort((left, right) =>
      right.createdAt.localeCompare(left.createdAt),
    );
  }

  await writeStorageFile("leads.json", []);
  return [];
}

export async function getLeads(): Promise<Lead[]> {
  if (usesBlobStorage()) {
    return await getLeadsFromBlob();
  }

  return await readLeadsFromDisk();
}

export async function createLead(input: LeadInput): Promise<Lead> {
  if (usesBlobStorage()) {
    return await createLeadInBlob(input);
  }

  const validatedInput = leadInputSchema.parse(input);
  const leads = await readLeadsFromDisk();

  const nextLead = leadSchema.parse({
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...validatedInput,
  });

  await writeStorageFile("leads.json", [nextLead, ...leads]);
  return nextLead;
}
