import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function RestaurantRootPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug, active: true },
    include: {
      dishes: { where: { visible: true }, orderBy: { order: "asc" }, take: 1 },
    },
  });
  if (!restaurant) notFound();
  const first = restaurant.dishes[0];
  if (!first) notFound();
  redirect(`/r/${slug}/${first.slug}`);
}
