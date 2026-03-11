import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const ASSETS_DIR = path.join(process.cwd(), "assets");
const DEFAULT_RESUME_FILE = "CV Zidan BSA.pdf";

function getResumeFileName(): string {
  const configured = process.env.PORTFOLIO_RESUME_FILE?.trim();
  if (!configured) {
    return DEFAULT_RESUME_FILE;
  }

  // Prevent path traversal from env input.
  return path.basename(configured);
}

export async function GET() {
  const fileName = getResumeFileName();
  const filePath = path.join(ASSETS_DIR, fileName);

  try {
    const fileBuffer = await readFile(filePath);
    const encodedName = encodeURIComponent(fileName);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"; filename*=UTF-8''${encodedName}`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json(
      {
        error: `Resume file not found in assets folder: ${fileName}`,
      },
      { status: 404 }
    );
  }
}
