import { z } from "zod";

export const userInfoSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format (YYYY-MM-DD expected)",
  }),
  occupation: z.string().min(2, "Occupation is required"),
  gender: z.enum(["Male", "Female", "Other"], { message: "Invalid gender" }),
});

export const userContactSchema = z.object({
  email: z.string().email("Invalid email format"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  fax: z.string().optional(),
  linkedInUrl: z.string().url("Invalid LinkedIn URL").optional(),
});

export const userAddressSchema = z.object({
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  country: z.string().min(2, "Country is required"),
  zipCode: z.string().regex(/^\d{5,6}$/, "Invalid Zip Code"),
});

export const userAcademicsSchema = z.object({
  pastSchools: z.array(
    z.string().min(2, "School name must be at least 2 characters")
  ),
});

export const userSchema = z.object({
  userInfo: userInfoSchema,
  userContact: userContactSchema,
  userAddress: userAddressSchema,
  userAcademics: userAcademicsSchema,
});

export type UserInfoFormData = z.infer<typeof userInfoSchema>;
export type UserContactFormData = z.infer<typeof userContactSchema>;
export type UserAddressFormData = z.infer<typeof userAddressSchema>;
export type UserAcademicsFormData = z.infer<typeof userAcademicsSchema>;
export type UserFormData = z.infer<typeof userSchema>;

export interface User {
  userInfo?: z.infer<typeof userInfoSchema>;
  userContact?: z.infer<typeof userContactSchema>;
  userAddress?: z.infer<typeof userAddressSchema>;
  userAcademics?: z.infer<typeof userAcademicsSchema>;
}
