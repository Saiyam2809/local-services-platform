import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {

  try {

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const userId = (session.user as any).id;

    const totalBookings = await prisma.booking.count({
      where: { userId }
    });

    const completed = await prisma.booking.count({
      where: {
        userId,
        status: "COMPLETED"
      }
    });

    const pending = await prisma.booking.count({
      where: {
        userId,
        status: "PENDING"
      }
    });

    const reviews = await prisma.review.count({
      where: { userId }
    });

    return NextResponse.json({
      totalBookings,
      completed,
      pending,
      reviews
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Failed to load dashboard" },
      { status: 500 }
    );

  }
}