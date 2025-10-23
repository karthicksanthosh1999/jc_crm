import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const user = await prisma?.user.delete({
      where: { id },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
          success: false,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "User deleted successfully",
      success: false,
      data: user,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Internal Server Error",
      success: false,
      error: (error as Error).message,
    });
  }
}
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const user = await prisma?.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
          success: false,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "User get successfully",
      success: false,
      data: user,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Internal Server Error",
      success: false,
      error: (error as Error).message,
    });
  }
}
