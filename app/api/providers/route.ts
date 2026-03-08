import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {

    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");

    const providers = await prisma.providerProfile.findMany({
  where: {
    isApproved: true,
    isAvailable: true,
    categoryId: categoryId ? categoryId : undefined
  },
  include: {
    user: true,
    category: true
  }
});

    return NextResponse.json(providers);

  } catch (error) {

    return NextResponse.json(
      { error: "Failed to fetch providers" },
      { status: 500 }
    );

  }
}