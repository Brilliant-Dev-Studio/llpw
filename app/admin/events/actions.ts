"use server";

import { nanoid } from "nanoid";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { uploadBuffer, deleteObjects } from "@/lib/s3";
import { processGalleryImage } from "@/lib/image";

const MAX_IMAGES = 20;

function revalidateEventPaths() {
  revalidatePath("/admin/events");
  revalidatePath("/");
  revalidatePath("/events");
}

export async function createEvent(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const dateValue = String(formData.get("date") ?? "");
  const files = formData
    .getAll("images")
    .filter((f): f is File => f instanceof File && f.size > 0)
    .slice(0, MAX_IMAGES);

  if (!title || !dateValue) {
    throw new Error("Title and date are required");
  }

  const event = await prisma.event.create({
    data: { title, date: new Date(dateValue) },
  });

  const images = [];
  for (const file of files) {
    const inputBuffer = Buffer.from(await file.arrayBuffer());
    const processed = await processGalleryImage(inputBuffer);
    const key = `events/${event.id}/${nanoid()}.webp`;
    const url = await uploadBuffer(processed.buffer, key, processed.contentType);
    images.push({ url, key, width: processed.width, height: processed.height, blurDataUrl: processed.blurDataUrl });
  }

  if (images.length > 0) {
    await prisma.eventImage.createMany({
      data: images.map((img, i) => ({ ...img, eventId: event.id, order: i })),
    });
  }

  revalidateEventPaths();
  redirect("/admin/events");
}

export async function deleteEvent(id: string) {
  const event = await prisma.event.findUnique({
    where: { id },
    include: { images: true },
  });
  if (!event) return;

  await deleteObjects(event.images.map((img) => img.key));
  await prisma.event.delete({ where: { id } });

  revalidateEventPaths();
}
