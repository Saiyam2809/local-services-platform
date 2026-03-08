import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

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

    const { providerId, date, address } = await req.json();

    if (!providerId || !date || !address) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const provider = await prisma.providerProfile.findUnique({
      where: { id: providerId }
    });

    if (!provider || !provider.categoryId) {
      return NextResponse.json(
        { error: "Provider not valid" },
        { status: 404 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        userId,
        providerId,
        categoryId: provider.categoryId,
        address,
        date: new Date(date)
      }
    });

    return NextResponse.json(booking);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Booking failed" },
      { status: 500 }
    );
  }
}