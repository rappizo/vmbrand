import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { ZodError } from "zod";

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

  return NextResponse.json(
    {
      leads,
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

export async function POST(request: Request) {
  try {
    const payload = leadInputSchema.parse(await request.json());
    const lead = await createLead(payload);

    revalidatePath("/admin");

    return NextResponse.json(
      {
        lead,
        message: "预约信息已提交。",
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: "请完整填写预约信息后再提交。",
          errors: error.flatten().fieldErrors,
        },
        {
          status: 400,
        },
      );
    }

    console.error("Failed to create consultation lead", error);

    return NextResponse.json(
      {
        message: "预约系统暂时不可用，请稍后再试，或直接通过电话和邮箱联系我们。",
      },
      {
        status: 500,
      },
    );
  }
}
