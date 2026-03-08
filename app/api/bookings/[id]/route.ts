import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {

    const { status } = await req.json();

    const { id } = await context.params; // ✅ FIX

    const booking = await prisma.booking.update({
      where: { id },
      data: {
        status
      }
    });

    return NextResponse.json(booking);

  } catch (error) {

    console.error("BOOKING UPDATE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}