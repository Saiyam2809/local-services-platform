import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {

  const providers = await prisma.providerProfile.findMany({
    include: {
      user: true,
      category: true
    }
  });

  return NextResponse.json(providers);
}