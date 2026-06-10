import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;
  const { id } = await params;
  const dishes = await prisma.dish.findMany({ where: { restaurantId: id }, orderBy: { order: "asc" } });
  return NextResponse.json(dishes);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { error } = await requireAdmin();
  if (error) return error;
  const { id } = await params;
  const { name, slug, modelUrl, usdzUrl, photoUrl, order } = await req.json();
  if (!name || !slug || !modelUrl) {
    return NextResponse.json({ error: "name, slug, modelUrl required" }, { status: 400 });
  }
  try {
    const dish = await prisma.dish.create({
      data: { restaurantId: id, name, slug, modelUrl, usdzUrl, photoUrl, order: order ?? 0 },
    });
    return NextResponse.json(dish, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Slug already in use for this restaurant" }, { status: 409 });
  }
}
