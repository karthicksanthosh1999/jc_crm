import z from "zod";

export const companyValidationSchema = z.object({
  id: z.string().optional(),
  companyName: z.string({ error: "Company name is required" }),
  logo: z.file({ error: "Logo is required" }),
  email: z.email({ error: "Email is required" }),
  mobile: z.string({ error: "Mobile is required" }),
});

export type companyValidationSchemaType = z.infer<
  typeof companyValidationSchema
>;
