import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

import { isAdminRequest } from "@/lib/auth";
import { createLead, getLeads } from "@/lib/site-content";
import { leadInputSchema } from "@/lib/site-schema";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json(
      {
        message: "未授权访问。",
      },
      {
        status: 401,
      },
    );
  }

  const leads = await getLeads();

  return NextResponse.json({
    leads,
  });
}

export async function POST(request: Request) {
  try {
    const payload = leadInputSchema.parse(await request.json());
    const lead = await createLead(payload);

    revalidatePath("/admin");

    return NextResponse.json(
      {
        lead,
        message: "咨询需求已提交，我们会尽快与你联系。",
      },
      {
        status: 201,
      },
    );
  } catch {
    return NextResponse.json(
      {
        message: "请完整填写咨询信息后再提交。",
      },
      {
        status: 400,
      },
    );
  }
}
