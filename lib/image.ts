import sharp from "sharp";

const MAX_DIMENSION = 1920;
const TARGET_BYTES = 350 * 1024;
const QUALITY_STEPS = [75, 60, 45];
const BLUR_WIDTH = 20;

export type ProcessedImage = {
  buffer: Buffer;
  contentType: string;
  width: number;
  height: number;
  blurDataUrl: string;
};

export async function processGalleryImage(
  input: Buffer,
): Promise<ProcessedImage> {
  const base = sharp(input).rotate().resize({
    width: MAX_DIMENSION,
    height: MAX_DIMENSION,
    fit: "inside",
    withoutEnlargement: true,
  });

  let buffer = await base.clone().webp({ quality: QUALITY_STEPS[0] }).toBuffer();
  for (const quality of QUALITY_STEPS.slice(1)) {
    if (buffer.byteLength <= TARGET_BYTES) break;
    buffer = await base.clone().webp({ quality }).toBuffer();
  }

  const { width, height } = await sharp(buffer).metadata();

  const blurBuffer = await base
    .clone()
    .resize({ width: BLUR_WIDTH })
    .webp({ quality: 30 })
    .toBuffer();

  return {
    buffer,
    contentType: "image/webp",
    width: width ?? MAX_DIMENSION,
    height: height ?? MAX_DIMENSION,
    blurDataUrl: `data:image/webp;base64,${blurBuffer.toString("base64")}`,
  };
}
