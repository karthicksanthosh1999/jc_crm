import { z } from "zod";

export const LeadValidationSchema = z.object({
  userId: z.string(),
  image: z.url(),
  name: z.string().min(2),
  email: z.email(),
  dob: z.string(),
  doj: z.coerce.date({ message: "Invalid DOJ date" }),
  doe: z.coerce.date({ message: "Invalid DOE date" }),
  phone: z.string().min(10),
  company: z.string(),
  status: z.enum(["NEW", "ACTIVE", "INACTIVE", "CLOSED"]).default("NEW"),
  courseId: z.string(),
  address: z.string(),
  street: z.string(),
  state: z.string(),
  city: z.string(),
  pinCode: z.number(),
  country: z.string(),
  idProof: z.string(),
  assignedToId: z.string(),
});

export type LeadValidationSchemaType = z.infer<typeof LeadValidationSchema>;
