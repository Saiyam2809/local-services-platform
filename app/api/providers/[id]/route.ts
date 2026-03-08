import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req:Request,
  {params}:{params:{id:string}}
){

  const provider = await prisma.providerProfile.findUnique({
    where:{ id: params.id },
    include:{
      user:true
    }
  });

  return NextResponse.json(provider);

}