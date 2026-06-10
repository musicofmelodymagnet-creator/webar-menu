import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;
  const { id } = await params;
  const data = await req.json();
  const dish = await prisma.dish.update({
    where: { id },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.slug !== undefined && { slug: data.slug }),
      ...(data.modelUrl !== undefined && { modelUrl: data.modelUrl }),
      ...(data.usdzUrl !== undefined && { usdzUrl: data.usdzUrl }),
      ...(data.photoUrl !== undefined && { photoUrl: data.photoUrl }),
      ...(data.order !== undefined && { order: data.order }),
      ...(data.visible !== undefined && { visible: data.visible }),
    },
  });
  return NextResponse.json(dish);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;
  const { id } = await params;
  await prisma.dish.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
