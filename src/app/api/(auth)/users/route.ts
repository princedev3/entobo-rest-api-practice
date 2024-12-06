import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const users = await prisma.user.findMany();
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: "can not get user" }), {
      status: 500,
    });
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "can not create user" }),
      { status: 500 }
    );
  }
};
