import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Proxies the yearbook PDF through our own origin so the client-side
// pdfjs reader (which fetches via XHR/fetch, unlike a plain <a href> link)
// isn't blocked by the S3 bucket's lack of a CORS policy.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const yearbook = await prisma.yearbook.findUnique({ where: { id } });
  if (!yearbook) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const upstream = await fetch(yearbook.pdfUrl);
  if (!upstream.ok || !upstream.body) {
    return NextResponse.json({ error: "Failed to fetch PDF" }, { status: 502 });
  }

  return new NextResponse(upstream.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
