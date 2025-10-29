import { z } from "zod";

export const LeadValidationSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  name: z.string().min(2),
  email: z.email(),
  phone: z.string().min(10),
  city: z.string(),
  course: z.string(),

  image: z.url().optional(),
  dob: z.string().optional(),
  doj: z.coerce.date({ message: "Invalid DOJ date" }).optional(),
  doe: z.coerce.date({ message: "Invalid DOE date" }).optional(),
  company: z.string().optional(),
  status: z.enum(["NEW", "ACTIVE", "INACTIVE", "CLOSED"]).default("NEW"),
  courseId: z.string().optional(),
  address: z.string().optional(),
  street: z.string().optional(),
  state: z.string().optional(),
  pinCode: z.number().optional(),
  country: z.string().optional(),
  idProof: z.string().optional(),
  assignedToId: z.string().optional(),
});

export type LeadValidationSchemaType = z.infer<typeof LeadValidationSchema>;
