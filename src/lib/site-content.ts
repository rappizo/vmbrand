import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

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

const CONTENT_DIR = path.join(process.cwd(), "content");
const SITE_CONTENT_FILE = path.join(CONTENT_DIR, "site-content.json");
const LEADS_FILE = path.join(CONTENT_DIR, "leads.json");

const defaultSiteContent = siteContentSchema.parse(siteContentSeed);
const defaultLeads = Array.isArray(leadsSeed) ? leadsSeed : [];

async function ensureDirectory() {
  await mkdir(CONTENT_DIR, { recursive: true });
}

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "ENOENT") {
      await writeJsonFile(filePath, fallback);
      return fallback;
    }

    throw error;
  }
}

async function writeJsonFile(filePath: string, value: unknown) {
  await ensureDirectory();
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export async function getSiteContent(): Promise<SiteContent> {
  const raw = await readJsonFile(SITE_CONTENT_FILE, defaultSiteContent);
  const parsed = siteContentSchema.safeParse(raw);

  if (parsed.success) {
    return parsed.data;
  }

  await writeJsonFile(SITE_CONTENT_FILE, defaultSiteContent);
  return defaultSiteContent;
}

export async function saveSiteContent(content: SiteContent): Promise<SiteContent> {
  const parsed = siteContentSchema.parse({
    ...content,
    updatedAt: new Date().toISOString(),
  });

  await writeJsonFile(SITE_CONTENT_FILE, parsed);
  return parsed;
}

async function readLeadsFromDisk(): Promise<Lead[]> {
  const raw = await readJsonFile(LEADS_FILE, defaultLeads);
  const parsed = leadSchema.array().safeParse(raw);

  if (parsed.success) {
    return parsed.data.sort((left, right) =>
      right.createdAt.localeCompare(left.createdAt),
    );
  }

  await writeJsonFile(LEADS_FILE, []);
  return [];
}

export async function getLeads(): Promise<Lead[]> {
  return readLeadsFromDisk();
}

export async function createLead(input: LeadInput): Promise<Lead> {
  const validatedInput = leadInputSchema.parse(input);
  const leads = await readLeadsFromDisk();

  const nextLead = leadSchema.parse({
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...validatedInput,
  });

  await writeJsonFile(LEADS_FILE, [nextLead, ...leads]);
  return nextLead;
}
