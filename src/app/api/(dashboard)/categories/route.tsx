import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId || userId === "undefined") {
      return new NextResponse(
        JSON.stringify({ message: "userId is required" }),
        { status: 400 }
      );
    }

    const categories = await prisma.category.findMany({
      where: {
        userId: Number(userId),
      },
    });
    return new NextResponse(JSON.stringify(categories), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "can not create category" }),
      { status: 500 }
    );
  }
};

export const POST = async (req: Request, res: Response) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const body = await req.json();

    if (!userId || userId === "undefined") {
      return new NextResponse(
        JSON.stringify({ message: "userId is required" }),
        { status: 400 }
      );
    }

    const category = await prisma.category.create({
      data: {
        title: body.title,
        userId: Number(userId),
      },
    });
    return new NextResponse(JSON.stringify(category), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "can not create category" }),
      { status: 500 }
    );
  }
};
