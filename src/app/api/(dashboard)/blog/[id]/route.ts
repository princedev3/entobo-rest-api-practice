import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    const blog = await prisma.blog.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (blog) {
      return new NextResponse(JSON.stringify(blog), { status: 200 });
    }
    return new NextResponse(JSON.stringify({ message: "blog not found" }), {
      status: 404,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "can not get single blog" }),
      { status: 500 }
    );
  }
};

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    const { title, desc } = await req.json();
    const blog = await prisma.blog.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        desc,
      },
    });
    if (blog) {
      return new NextResponse(JSON.stringify(blog), { status: 200 });
    }
    return new NextResponse(JSON.stringify({ message: "blog not found" }), {
      status: 404,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "can not update blog" }),
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
    const blog = await prisma.blog.delete({
      where: {
        id: parseInt(id),
      },
    });
    if (blog) {
      return new NextResponse(JSON.stringify(blog), { status: 200 });
    }
    return new NextResponse(JSON.stringify({ message: "blog not found" }), {
      status: 404,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "can not delete blog" }),
      { status: 500 }
    );
  }
};
