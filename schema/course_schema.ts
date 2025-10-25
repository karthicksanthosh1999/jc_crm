import { z } from "zod";

export const courseValidationSchema = z.object({
  id: z.string().optional(),
  userId: z.string({ error: "UserId is required" }),
  image: z.file({ error: "Image is required" }),
  title: z
    .string({ error: "Title is required" })
    .min(3, "Title should be at least 3 characters"),
});

export type courseValidationSchemaType = z.infer<typeof courseValidationSchema>;
