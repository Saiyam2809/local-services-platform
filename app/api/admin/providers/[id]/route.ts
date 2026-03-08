import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {

  const provider = await prisma.providerProfile.update({
    where: { id: params.id },
    data: {
      isApproved: true
    }
  });

  return NextResponse.json(provider);
}