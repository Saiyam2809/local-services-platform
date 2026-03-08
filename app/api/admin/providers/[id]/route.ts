import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {

  try {

    const { id } = await context.params;

    const provider = await prisma.providerProfile.update({
      where: { id },
      data: {
        isApproved: true
      }
    });

    return NextResponse.json(provider);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Failed to approve provider" },
      { status: 500 }
    );

  }

}