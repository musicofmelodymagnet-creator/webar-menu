import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-guard";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  const restaurants = await prisma.restaurant.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { dishes: true } } },
  });
  return NextResponse.json(restaurants);
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;
  const { name, slug, logoUrl } = await req.json();
  if (!name || !slug) return NextResponse.json({ error: "name and slug required" }, { status: 400 });
  try {
    const restaurant = await prisma.restaurant.create({ data: { name, slug, logoUrl } });
    return NextResponse.json(restaurant, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
  }
}
