import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { userValidationSchema } from "@/schema/user-schema";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = userValidationSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({
        message: "Please fill the all fields",
        status: 400,
      });
    }
    const {
      image,
      firstName,
      lastName,
      location,
      mobile,
      email,
      password,
      role,
    } = result.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        image,
        firstName,
        lastName,
        password: hashedPassword,
        location,
        mobile,
        email,
        role,
      },
    });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      user,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: (error as Error).message,
    });
  }
}

export async function GET(_req: Request) {
  try {
    const user = await getServerSession();
    if (!user) {
      redirect("/login");
    }

    const users = await prisma.user.findMany();
    return NextResponse.json({
      message: "User get successfully",
      success: true,
      users,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: (error as Error).message,
    });
  }
}
