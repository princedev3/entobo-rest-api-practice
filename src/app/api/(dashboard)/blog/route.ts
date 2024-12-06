import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const categoryId = searchParams.get("categoryId");
    if (
      !userId ||
      !categoryId ||
      typeof Number(userId) !== "number" ||
      typeof Number(categoryId) !== "number"
    ) {
      return new NextResponse(
        JSON.stringify({ message: "userId and categoryId are required" }),
        { status: 400 }
      );
    }

    const blogs = await prisma.blog.findMany({
      where: {
        categoryId: Number(categoryId),
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return new NextResponse(JSON.stringify(blogs), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: "can not get blogs" }), {
      status: 500,
    });
  }
};

export const POST = async (req: Request, res: Response) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const categoryId = searchParams.get("categoryId");
    if (
      !userId ||
      !categoryId ||
      typeof Number(userId) !== "number" ||
      typeof Number(categoryId) !== "number"
    ) {
      return new NextResponse(
        JSON.stringify({ message: "userId and categoryId are required" }),
        { status: 400 }
      );
    }
    const body = await req.json();
    const createdBlog = await prisma.blog.create({
      data: {
        title: body.title,
        desc: body.desc,
        categoryId: Number(categoryId),
        userId: Number(userId),
      },
    });
    return new NextResponse(JSON.stringify(createdBlog), { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "can not create blog" }),
      {
        status: 500,
      }
    );
  }
};
