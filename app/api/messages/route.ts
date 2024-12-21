import { createMessageSchema } from "@/app/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import client from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { message, name } = body;
  const validation = createMessageSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  
  const newMessage = await client.message.create({
    data: {
      message, 
      name, 
    },
  });
  return NextResponse.json(newMessage, { status: 201 });
}
