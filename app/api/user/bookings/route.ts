import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json([]);
  }

  const userId = (session.user as any).id;

  const bookings = await prisma.booking.findMany({
    where: {
      userId
    },
    include: {
      provider: {
        include: {
          user: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return NextResponse.json(bookings);
}