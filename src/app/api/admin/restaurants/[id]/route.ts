import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;
  const { id } = await params;
  const r = await prisma.restaurant.findUnique({ where: { id }, include: { dishes: { orderBy: { order: "asc" } } } });
  if (!r) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(r);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;
  const { id } = await params;
  const data = await req.json();
  try {
    const r = await prisma.restaurant.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        active: data.active,
        logoUrl: data.logoUrl,
      },
    });
    return NextResponse.json(r);
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;
  const { id } = await params;
  await prisma.restaurant.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
