import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const IMAGES_DIR = path.join(process.cwd(), "assets", "images");

const CONTENT_TYPES: Record<string, string> = {
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function sanitizeFileName(rawFileName: string): string | null {
  const decoded = decodeURIComponent(rawFileName).trim();
  if (!decoded) {
    return null;
  }

  const safeName = path.basename(decoded);
  if (safeName !== decoded || safeName.includes("..")) {
    return null;
  }

  return safeName;
}

function getContentType(fileName: string): string {
  const extension = path.extname(fileName).toLowerCase();
  return CONTENT_TYPES[extension] ?? "application/octet-stream";
}

function getCacheControlHeader(): string {
  const rawValue = process.env.PORTFOLIO_IMAGE_CACHE_SECONDS;
  if (!rawValue) {
    return "no-store";
  }

  const parsed = Number.parseInt(rawValue, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return "no-store";
  }

  return `public, max-age=${parsed}, stale-while-revalidate=${Math.max(parsed * 10, parsed)}`;
}

function createMissingImageSvg(fileName: string): string {
  const safeLabel = fileName.replace(/[<>&"]/g, "");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#bg)"/>
  <rect x="60" y="60" width="1080" height="680" rx="24" fill="none" stroke="#334155" stroke-width="4"/>
  <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" fill="#e2e8f0" font-size="44" font-family="Arial, sans-serif">Image Not Found</text>
  <text x="50%" y="53%" dominant-baseline="middle" text-anchor="middle" fill="#94a3b8" font-size="24" font-family="Arial, sans-serif">${safeLabel}</text>
</svg>`;
}

export async function GET(
  _request: Request,
  context: { params: { imageName: string } } | { params: Promise<{ imageName: string }> }
) {
  const params = await Promise.resolve(context.params);
  const fileName = sanitizeFileName(params.imageName);

  if (!fileName) {
    return NextResponse.json({ error: "Invalid image name" }, { status: 400 });
  }

  const filePath = path.join(IMAGES_DIR, fileName);

  try {
    const fileBuffer = await readFile(filePath);
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": getContentType(fileName),
        "Cache-Control": getCacheControlHeader(),
      },
    });
  } catch {
    const fallbackSvg = createMissingImageSvg(fileName);
    return new NextResponse(fallbackSvg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "no-store",
        "X-Image-Status": "missing-fallback",
      },
    });
  }
}
