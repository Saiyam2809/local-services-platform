import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){

 const categories = await prisma.serviceCategory.findMany();

 return NextResponse.json(categories);
}

export async function POST(req:Request){

 const {name} = await req.json();

 const category = await prisma.serviceCategory.create({
  data:{name}
 });

 return NextResponse.json(category);
}