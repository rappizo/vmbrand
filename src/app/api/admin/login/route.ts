import { NextResponse } from "next/server";

import {
  attachAdminSession,
  validateAdminCredentials,
} from "@/lib/auth";
import { loginSchema } from "@/lib/site-schema";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = loginSchema.parse(await request.json());

    if (!validateAdminCredentials(body.username, body.password)) {
      return NextResponse.json(
        {
          message: "账号或密码不正确。",
        },
        {
          status: 401,
        },
      );
    }

    const response = NextResponse.json({
      message: "登录成功。",
    });

    attachAdminSession(response, body.username);
    return response;
  } catch {
    return NextResponse.json(
      {
        message: "请填写完整的登录信息。",
      },
      {
        status: 400,
      },
    );
  }
}
