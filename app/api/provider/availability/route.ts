import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PATCH(req: Request) {

  const session = await getServerSession(authOptions);

  const { isAvailable } = await req.json();

  const provider = await prisma.providerProfile.update({
    where: {
      userId: (session?.user as any).id
    },
    data: {
      isAvailable
    }
  });

  return NextResponse.json(provider);
}