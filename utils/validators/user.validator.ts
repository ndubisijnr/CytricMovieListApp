import { z } from "zod";

export const UserSchema = z.object({
  email: z
    .string({ required_error: "User email is required" })
    .email({ message: "Invalid Email" })
    .trim(),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be above 6 characters")
    .regex(/[0-9]/, "Password requires a number")
    .regex(/[a-z]/, "Password requires a lowercase letter")
    .regex(/[A-Z]/, "Password requires an uppercase letter")
    .regex(/[^\w]/, "Password requires a symbol"),
});
