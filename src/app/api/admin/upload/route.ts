import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { writeFile, mkdir } from "fs/promises";
import { join, extname } from "path";
import { randomBytes } from "crypto";

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  const form = await req.formData();
  const file = form.get("file") as File | null;
  const type = (form.get("type") as string) ?? "model";

  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const ext = extname(file.name).toLowerCase();
  const allowed = type === "logo"
    ? [".jpg", ".jpeg", ".png", ".webp", ".svg"]
    : [".glb", ".gltf", ".usdz"];

  if (!allowed.includes(ext)) {
    return NextResponse.json({ error: `Invalid file type: ${ext}` }, { status: 400 });
  }

  const subdir = type === "logo" ? "logos" : "models";
  const uploadDir = join(process.cwd(), "public", "uploads", subdir);
  await mkdir(uploadDir, { recursive: true });

  const filename = `${randomBytes(12).toString("hex")}${ext}`;
  const bytes = await file.arrayBuffer();
  await writeFile(join(uploadDir, filename), Buffer.from(bytes));

  return NextResponse.json({ url: `/uploads/${subdir}/${filename}` });
}

export const config = { api: { bodyParser: false } };
