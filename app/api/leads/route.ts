import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { LeadStatus } from "@prisma/client";
import { updateImage } from "@/lib/cloudinaryHelper";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const userId = (formData.get("userId") as string) || "";
    const name = (formData.get("name") as string) || "";
    const email = (formData.get("email") as string) || "";
    const dob = (formData.get("dob") as string) || "";
    const doj = (formData.get("doj") as string) || "";
    const doe = (formData.get("doe") as string) || "";
    const phone = (formData.get("phone") as string) || "";
    const company = (formData.get("company") as string) || "";
    const state = (formData.get("state") as string) || "";
    const courseId = (formData.get("courseId") as string) || "";
    const street = (formData.get("street") as string) || "";
    const city = (formData.get("city") as string) || "";
    const country = (formData.get("country") as string) || "";
    const pinCodeStr = (formData.get("pinCode") as string) || "0";
    const pinCode = Number(pinCodeStr);
    const statusStr = (formData.get("status") as string) || "NEW";
    const status: LeadStatus = statusStr as LeadStatus;
    const assignedToId = (formData.get("assignedToId") as string) || "";
    const image = formData.get("image") as File | null;
    const idProof = formData.get("idProof") as File | null;

    let userImage,
      idProofImage = null;

    if (image) userImage = await updateImage(image, "image");
    if (idProof) idProofImage = await updateImage(idProof, "idProof");

    const parseDate = (dateStr: string) => {
      if (!dateStr) return null;
      const [day, month, year] = dateStr.split("-");
      return new Date(`${year}-${month}-${day}`); // converts to valid Date object
    };

    const dobDate = parseDate(dob);
    const dojDate = parseDate(doj);
    const doeDate = parseDate(doe);

    const lead = await prisma.lead.create({
      data: {
        userId,
        image: userImage?.url || "",
        imagePublicId: userImage?.public_id || "",
        name,
        email,
        dob: dobDate as Date,
        doj: dojDate as Date,
        doe: doeDate as Date,
        phone,
        company,
        status,
        courseId,
        street,
        state,
        city,
        pinCode,
        country,
        idProof: idProofImage?.url || "",
        idProofPublicId: idProofImage?.public_id || "",
        assignedToId,
      },
    });

    return NextResponse.json(
      { success: true, message: "Lead created successfully", lead },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}
export async function GET(req: Request) {
  try {
    const lead = await prisma.lead.findMany();
    return NextResponse.json(
      {
        success: true,
        message: "Lead created successfully",
        data: lead,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}
