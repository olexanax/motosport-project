import { ValidationError } from "@/config/validation-errors";
import { z } from "zod";

export const ContactUsValidator = z.object({
  name: z
    .string({
      required_error: ValidationError.Required,
    })
    .min(1, ValidationError.MinLength)
    .max(40, ValidationError.MaxLength),
  surname: z
    .string({
      required_error: ValidationError.Required,
    })
    .min(1, ValidationError.MinLength)
    .max(40, ValidationError.MaxLength),
  email: z
    .string({
      required_error: ValidationError.Required,
    })
    .email(ValidationError.InvalidEmail),
  phone: z
    .string({
      required_error: ValidationError.Required,
    })
    .min(8, ValidationError.MinLength)
    .max(15, ValidationError.MaxLength),
  notes: z.string().max(500, ValidationError.MaxLength),
});

export type ContactUsSchema = z.infer<typeof ContactUsValidator>;
