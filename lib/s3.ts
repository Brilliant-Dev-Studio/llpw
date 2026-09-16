import {
  S3Client,
  PutObjectCommand,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const bucket = process.env.S3_BUCKET_NAME!;

export async function uploadBuffer(
  buffer: Buffer,
  key: string,
  contentType: string,
) {
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    }),
  );

  return `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}

export async function deleteObjects(keys: string[]) {
  if (keys.length === 0) return;

  // S3's bulk-delete API returns 200 even when individual keys fail (e.g.
  // missing IAM permission) — it doesn't throw, so failures go silent
  // unless the per-key Errors array is checked explicitly.
  const result = await s3.send(
    new DeleteObjectsCommand({
      Bucket: bucket,
      Delete: { Objects: keys.map((Key) => ({ Key })) },
    }),
  );

  if (result.Errors && result.Errors.length > 0) {
    console.error("S3 deleteObjects: failed to delete some keys", result.Errors);
  }
}

export async function uploadStudentPhoto(file: File, code: string) {
  const extension = file.name.split(".").pop() || "jpg";
  const key = `student-photos/${code}.${extension}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  return uploadBuffer(buffer, key, file.type || "image/jpeg");
}
