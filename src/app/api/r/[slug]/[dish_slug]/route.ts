import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ slug: string; dish_slug: string }> }
) {
  const { slug, dish_slug } = await params;
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug, active: true },
    include: {
      dishes: {
        where: { visible: true },
        orderBy: { order: "asc" },
      },
    },
  });
  if (!restaurant) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const dish = restaurant.dishes.find(d => d.slug === dish_slug);
  if (!dish) return NextResponse.json({ error: "Dish not found" }, { status: 404 });
  return NextResponse.json({ restaurant, dish, allDishes: restaurant.dishes });
}
