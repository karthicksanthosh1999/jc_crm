import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { LeadValidationSchema } from "@/schema/lead_schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Validate request body with Zod
    const result = LeadValidationSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill the all fields",
          err: result.error,
        },
        { status: 400 }
      );
    }

    const data = result.data;

    // Create a new lead record in the database
    const lead = await prisma.lead.create({
      data: {
        userId: data.userId,
        image: data.image,
        name: data.name,
        email: data.email,
        dob: data.dob,
        doj: data.doj,
        doe: data.doe,
        phone: data.phone,
        company: data.company,
        status: data.status || "NEW",
        courseId: data.courseId,
        address: data.address,
        street: data.street,
        state: data.state,
        city: data.city,
        pinCode: data.pinCode,
        country: data.country,
        idProof: data.idProof,
        assignedToId: data.assignedToId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Lead created successfully",
        lead,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      {
        success: false,
        message: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
