"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { uploadBuffer, deleteObjects } from "@/lib/s3";
import { processGalleryImage } from "@/lib/image";

function revalidateYearbookPaths() {
  revalidatePath("/admin/yearbooks");
  revalidatePath("/");
  revalidatePath("/yearbooks");
}

export async function createYearbook(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const yearValue = String(formData.get("year") ?? "");
  const coverFile = formData.get("cover");
  const pdfFile = formData.get("pdf");

  if (!title || !yearValue) {
    throw new Error("Title and year are required");
  }
  if (!(pdfFile instanceof File) || pdfFile.size === 0) {
    throw new Error("PDF file is required");
  }

  const yearbook = await prisma.yearbook.create({
    data: {
      title,
      year: Number(yearValue),
      pdfUrl: "",
      pdfKey: "",
      fileSize: pdfFile.size,
    },
  });

  const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer());
  const pdfKey = `yearbooks/${yearbook.id}/book.pdf`;
  const pdfUrl = await uploadBuffer(pdfBuffer, pdfKey, "application/pdf");

  let coverUrl: string | undefined;
  let coverKey: string | undefined;
  let blurDataUrl: string | undefined;

  if (coverFile instanceof File && coverFile.size > 0) {
    const inputBuffer = Buffer.from(await coverFile.arrayBuffer());
    const processed = await processGalleryImage(inputBuffer);
    coverKey = `yearbooks/${yearbook.id}/cover.webp`;
    coverUrl = await uploadBuffer(processed.buffer, coverKey, processed.contentType);
    blurDataUrl = processed.blurDataUrl;
  }

  await prisma.yearbook.update({
    where: { id: yearbook.id },
    data: { pdfUrl, pdfKey, coverUrl, coverKey, blurDataUrl },
  });

  revalidateYearbookPaths();
  redirect("/admin/yearbooks");
}

export async function deleteYearbook(id: string) {
  const yearbook = await prisma.yearbook.findUnique({ where: { id } });
  if (!yearbook) return;

  await deleteObjects(
    [yearbook.pdfKey, yearbook.coverKey].filter((k): k is string => !!k),
  );
  await prisma.yearbook.delete({ where: { id } });

  revalidateYearbookPaths();
}
