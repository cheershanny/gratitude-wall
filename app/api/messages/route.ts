import { createMessageSchema } from "@/app/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, name } = body;
    const validation = createMessageSchema.safeParse(body);
    
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    await prisma.$connect();
    
    const newMessage = await prisma.message.create({
      data: {
        message, 
        name, 
      },
    });

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}