import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const services = await prisma.serviceCategory.findMany({
    orderBy: { name: "asc" },
  });

  return NextResponse.json(services);
}