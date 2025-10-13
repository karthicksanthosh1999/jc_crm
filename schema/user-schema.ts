import { MAX_DATE_RANGE_DAYS } from "@/lib/constand";
import { differenceInDays } from "date-fns";
import { z } from "zod";

export const userValidationSchema = z.object({
  image: z.string().optional(),
  firstName: z.string().min(3, "First Name should be at least 3 characters"),
  lastName: z.string().min(3, "Last Name should be at least 3 characters"),
  mobile: z.string().min(10, "Invalid mobile number"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(3, "Password should be at least 3 characters"),
  role: z.enum(["SUPER_ADMIN", "ADMIN", "SALES_MANAGER"]),
  location: z.string().min(3, "Location should be at least 3 characters"),
});

export type UserValidationSchemaType = z.infer<typeof userValidationSchema>;

export const userLoginValidationSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(3, "Password should be at least 3 characters"),
});

export type UserLoginValidationSchemaType = z.infer<
  typeof userLoginValidationSchema
>;

// SEARCH INPUT VALIDATION SCHEMA
export const UserSearchValidationSchema = z
  .object({
    from: z.coerce.date(),
    to: z.coerce.date(),
    userType: z.coerce.string().optional(),
    search: z.coerce.string().optional(),
  })
  .refine(
    (args) => {
      const { from, to } = args;
      if (from && to) {
        const days = differenceInDays(to, from);
        const isValidRange = days >= 0 && days <= MAX_DATE_RANGE_DAYS;
        return isValidRange;
      }
      return true;
    },
    {
      error:
        "`Invalid date range. The range must be within ${MAX_DATE_RANGE_DAYS} days.`,",
    }
  );
