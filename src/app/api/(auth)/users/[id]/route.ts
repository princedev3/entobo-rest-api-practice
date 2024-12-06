import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    const body = await req.json();
    const existingUser = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (!existingUser) {
      return new NextResponse(JSON.stringify({ message: " user not found" }), {
        status: 400,
      });
    }
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: body,
    });

    return new NextResponse(JSON.stringify(updatedUser), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "can not update user" }),
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;

    const existingUser = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (!existingUser) {
      return new NextResponse(JSON.stringify({ message: " user not found" }), {
        status: 400,
      });
    }
    const updatedUser = await prisma.user.delete({
      where: { id: Number(id) },
    });

    return new NextResponse(JSON.stringify({ message: "user deleted" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: "can not deleteuser" }), {
      status: 500,
    });
  }
};
