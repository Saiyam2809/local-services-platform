import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {

    const { id } = await context.params;

    await prisma.serviceCategory.delete({
      where: { id }
    });

    return NextResponse.json({
      message: "Category deleted"
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );

  }
}