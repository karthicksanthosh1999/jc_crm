import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { updateImage } from "@/lib/cloudinaryHelper";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    let title = formData.get("title") as string;
    let image = formData.get("image") as File | null;
    let userId = formData.get("userId") as string;

    console.log(title, image, userId);
    if (!title || !userId || !image) {
      return NextResponse.json(
        { message: "Please fille the all fields", success: false },
        { status: 400 }
      );
    }
    let userImage = null;
    if (image) {
      userImage = await updateImage(image, "courses");
    }
    const course = await prisma.course.create({
      data: {
        title,
        userId,
        image: userImage?.url || null,
        imagePublicId: userImage?.public_id || null,
      },
    });

    return NextResponse.json(
      {
        message: "Course Created Successfully",
        success: true,
        data: course,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";

    const course = await prisma.course.findMany({
      where: {
        title: { contains: search, mode: "insensitive" },
      },
    });
    return NextResponse.json(
      {
        message: "Course Filtered Successfully",
        success: true,
        data: course,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
