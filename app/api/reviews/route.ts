import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {

  try {

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const userId = (session.user as any).id;

    const { providerId, rating, comment } = await req.json();

    const review = await prisma.review.create({
      data: {
        userId,
        providerId,
        rating,
        comment
      }
    });

    return NextResponse.json(review);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );

  }

}