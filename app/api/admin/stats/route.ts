import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {

  const users = await prisma.user.count({
    where: { role: "USER" }
  });

  const providers = await prisma.providerProfile.count();

  const bookings = await prisma.booking.count();

  return NextResponse.json({
    users,
    providers,
    bookings
  });

}