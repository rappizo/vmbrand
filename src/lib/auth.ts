import { createHmac, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";
import type { NextRequest, NextResponse } from "next/server";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "Vmbrands2026!";
const ADMIN_SECRET = process.env.ADMIN_SECRET ?? "vmbrands-local-secret";
const COOKIE_NAME = "vmbrands-admin-session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

function sign(payload: string) {
  return createHmac("sha256", ADMIN_SECRET).update(payload).digest("hex");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function encodeSession(username: string) {
  const expiresAt = Date.now() + SESSION_TTL_SECONDS * 1000;
  const payload = `${username}.${expiresAt}`;
  const signature = sign(payload);

  return Buffer.from(`${payload}.${signature}`).toString("base64url");
}

function decodeSession(token?: string) {
  if (!token) {
    return null;
  }

  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const parts = decoded.split(".");

    if (parts.length !== 3) {
      return null;
    }

    const [username, expiresAtText, signature] = parts;
    const payload = `${username}.${expiresAtText}`;
    const expectedSignature = sign(payload);
    const expiresAt = Number(expiresAtText);

    if (!safeEqual(signature, expectedSignature) || Number.isNaN(expiresAt)) {
      return null;
    }

    if (Date.now() > expiresAt) {
      return null;
    }

    return { username };
  } catch {
    return null;
  }
}

export function getDefaultAdminUsername() {
  return ADMIN_USERNAME;
}

export function validateAdminCredentials(username: string, password: string) {
  return safeEqual(username, ADMIN_USERNAME) && safeEqual(password, ADMIN_PASSWORD);
}

export function attachAdminSession(response: NextResponse, username: string) {
  response.cookies.set({
    name: COOKIE_NAME,
    value: encodeSession(username),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export function clearAdminSession(response: NextResponse) {
  response.cookies.set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return Boolean(decodeSession(cookieStore.get(COOKIE_NAME)?.value));
}

export function isAdminRequest(request: NextRequest) {
  return Boolean(decodeSession(request.cookies.get(COOKIE_NAME)?.value));
}
