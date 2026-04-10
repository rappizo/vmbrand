import { NextResponse } from "next/server";

import { clearAdminSession } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST() {
  const response = NextResponse.json({
    message: "已退出后台。",
  });

  clearAdminSession(response);
  return response;
}
