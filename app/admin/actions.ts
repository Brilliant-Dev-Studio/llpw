"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { customAlphabet } from "nanoid";
import { prisma } from "@/lib/prisma";
import { uploadStudentPhoto } from "@/lib/s3";
import {
  ADMIN_COOKIE,
  getSessionToken,
  isValidPassword,
} from "@/lib/admin-auth";

const generateCode = customAlphabet("ABCDEFGHJKLMNPQRSTUVWXYZ23456789", 8);

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (!isValidPassword(password)) {
    redirect("/admin/login?error=1");
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, getSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect("/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

export async function createCertificate(formData: FormData) {
  const schoolName = String(formData.get("schoolName") ?? "");
  const studentName = String(formData.get("studentName") ?? "");
  const rollNo = String(formData.get("rollNo") ?? "");
  const className = String(formData.get("className") ?? "");
  const photoFile = formData.get("photoFile");

  const code = `LLPW-${generateCode()}`;

  let photoUrl: string | null = null;
  if (photoFile instanceof File && photoFile.size > 0) {
    photoUrl = await uploadStudentPhoto(photoFile, code);
  }

  await prisma.certificate.create({
    data: { code, schoolName, studentName, rollNo, className, photoUrl },
  });

  return code;
}

export async function deleteCertificate(id: string) {
  await prisma.certificate.delete({ where: { id } });
  revalidatePath("/admin");
}
