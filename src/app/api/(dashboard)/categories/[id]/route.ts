import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    if (!id || typeof Number(id) !== "number") {
      return new NextResponse(JSON.stringify({ message: "id is required" }), {
        status: 400,
      });
    }
    const body = await req.json();
    if (!body.title) {
      return new NextResponse(JSON.stringify({ message: "name is required" }), {
        status: 400,
      });
    }
    const updateCategory = await prisma.category.update({
      where: { id: Number(id) },
      data: { title: body.title },
    });
    return new NextResponse(JSON.stringify({ message: updateCategory }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "can not update category" }),
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
    if (!id || typeof Number(id) !== "number") {
      return new NextResponse(JSON.stringify({ message: "id is required" }), {
        status: 400,
      });
    }
    const deleteCategory = await prisma.category.delete({
      where: { id: Number(id) },
    });
    return new NextResponse(JSON.stringify({ message: "category deleted" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "can not delete category" }),
      { status: 500 }
    );
  }
};
