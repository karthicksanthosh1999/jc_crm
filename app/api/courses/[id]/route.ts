import { deleteImage } from "@/lib/cloudinaryHelper";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const user = await prisma.course.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Course not found",
          success: false,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Course get successfully",
        success: true,
        date: user,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({
      message: "Internal Server Error",
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const existingCourse = await prisma.course.findUnique({
      where: { id },
    });
    console.log(existingCourse);

    if (!existingCourse) {
      return NextResponse.json(
        {
          message: "Course not found",
          success: false,
        },
        { status: 404 }
      );
    }

    if (existingCourse?.imagePublicId) {
      await deleteImage(existingCourse?.imagePublicId);
    }

    await prisma.course.delete({
      where: { id: existingCourse?.id },
    });

    return NextResponse.json(
      {
        message: "Course delete successfully",
        success: true,
        data: existingCourse,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({
      message: "Internal Server Error",
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
