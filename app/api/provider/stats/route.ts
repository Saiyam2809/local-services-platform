import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const providerId = searchParams.get("providerId");

    if (!providerId) {
      return NextResponse.json({ error: "Missing providerId" }, { status: 400 });
    }

    const totalBookings = await prisma.booking.count({
      where: { providerId },
    });

    const pendingBookings = await prisma.booking.count({
      where: {
        providerId,
        status: "PENDING",
      },
    });

    const completedBookings = await prisma.booking.count({
      where: {
        providerId,
        status: "COMPLETED",
      },
    });

    return NextResponse.json({
      totalBookings,
      pendingBookings,
      completedBookings,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}