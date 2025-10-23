import { z } from "zod";

export const courseValidationSchema = z.object({
  userId: z.string(),
  image: z.string(),
  title: z.string().min(3, "Title should be at least 3 characters"),
});

export type courseValidationSchemaType = z.infer<typeof courseValidationSchema>;
