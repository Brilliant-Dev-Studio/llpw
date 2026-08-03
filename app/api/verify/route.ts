import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code")?.trim();

  if (!code) {
    return NextResponse.json({ found: false }, { status: 400 });
  }

  const certificate = await prisma.certificate.findUnique({
    where: { code },
  });

  if (!certificate) {
    return NextResponse.json({ found: false });
  }

  return NextResponse.json({ found: true, certificate });
}
