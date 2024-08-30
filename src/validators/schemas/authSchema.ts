import * as yup from "yup";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const userSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRegex, "Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

console.log(userSchema);
