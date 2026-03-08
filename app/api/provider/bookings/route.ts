import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const userId = (session.user as any).id;

  // find provider profile
  const provider = await prisma.providerProfile.findUnique({
    where: { userId }
  });

  if (!provider) {
    return NextResponse.json([]);
  }

  const bookings = await prisma.booking.findMany({
    where: {
      providerId: provider.id
    },
    include: {
      user: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return NextResponse.json(bookings);
}