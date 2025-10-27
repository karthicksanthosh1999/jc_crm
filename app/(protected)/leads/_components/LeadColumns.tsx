"use client";

import { LeadValidationSchemaType } from "@/schema/lead_schema";
import { ColumnDef } from "@tanstack/react-table";

export const leadsColumns: ColumnDef<LeadValidationSchemaType>[] = [
  {
    accessorKey: "userId",
    header: "UserId",
  },
  {
    accessorKey: "image",
    header: "Image",
  },
  {
    accessorKey: "name",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "dob",
    header: "Date Of Birth",
  },
  {
    accessorKey: "doj",
    header: "Date Of Joining",
  },
  {
    accessorKey: "doe",
    header: "Date Of End",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "courseId",
    header: "CourseId",
  },
  {
    accessorKey: "street",
    header: "Street",
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "pinCode",
    header: "Pincode",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "idProof",
    header: "Id-Proof",
  },
  {
    accessorKey: "assignedToId",
    header: "Assigned User",
  },
];
