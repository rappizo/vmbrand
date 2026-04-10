import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

import { isAdminRequest } from "@/lib/auth";
import { getSiteContent, saveSiteContent } from "@/lib/site-content";
import { siteContentSchema } from "@/lib/site-schema";

export const runtime = "nodejs";

export async function GET() {
  const content = await getSiteContent();

  return NextResponse.json({
    content,
  });
}

export async function PUT(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json(
      {
        message: "请先登录后台后再保存内容。",
      },
      {
        status: 401,
      },
    );
  }

  try {
    const payload = siteContentSchema.parse(await request.json());
    const content = await saveSiteContent(payload);

    revalidatePath("/");
    revalidatePath("/admin");

    return NextResponse.json({
      content,
      message: "内容保存成功。",
    });
  } catch {
    return NextResponse.json(
      {
        message: "内容格式不正确，请检查后重试。",
      },
      {
        status: 400,
      },
    );
  }
}
