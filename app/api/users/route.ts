import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import {
  UserSearchValidationSchema,
  userValidationSchema,
} from "@/schema/user-schema";
import { getServerSession } from "next-auth";

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

export async function GET(request: Request) {
  try {
    const user = await getServerSession();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);

    const queryParams = UserSearchValidationSchema.safeParse({
      search: searchParams.get("search") || "",
      userType: searchParams.get("userType") || "",
      from: searchParams.get("from"),
      to: searchParams.get("to"),
    });

    if (!queryParams.success) {
      return Response.json(queryParams.error.message, {
        status: 400,
      });
    }
    const { from, to, search, userType } = queryParams.data;

    const filter: any = { AND: [] };

    if (userType) filter.AND.push({ userType });
    if (search) {
      filter.AND.push({
        OR: [
          { email: { contains: search, mode: "insensitive" } },
          { mobile: { contains: search, mode: "insensitive" } },
        ],
      });
    }
    if (from && to) {
      filter.AND.push({
        createdAt: {
          gte: from,
          lte: to,
        },
      });
    }

    const users = await prisma.user.findMany({
      where: filter.AND.length ? filter : undefined,
    });

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
