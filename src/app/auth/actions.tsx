"use client";
import { createUser, getUserByEmail } from "@/api/user";
import { toast } from "@/components/ui/use-toast";
import { db } from "@/db";
import { encryptPassword, isAdmin, validatePassword } from "@/lib/auth";
import { userSchema } from "../../validators/schemas/authSchema";
import { User } from "@prisma/client";
import * as yup from "yup";
import { saveUserOnCache } from "@/lib/cacheStorage";

export const loginUser = async (userIntroduced: {
  email: string;
  password: string;
}) => {
  const existingUser: User | boolean = await getUserByEmail(
    userIntroduced.email
  );

  await validateForm(userIntroduced);

  if (!existingUser || typeof existingUser === "boolean") {
    throw new Error(
      JSON.stringify({
        success: false,
        status: 404,
        message:
          "El email o la contraseña son incorrectos. Por favor, inténtalo de nuevo.",
      })
    );
  }

  const matchPasswords = await validatePassword(
    existingUser,
    userIntroduced.password
  );

  if (matchPasswords) {
    saveUserOnCache({
      email: existingUser.email,
      admin: isAdmin(existingUser.email) ? true : false,
    });
  } else {
    throw new Error(
      JSON.stringify({
        success: false,
        status: 404,
        message:
          "El email o la contraseña son incorrectos. Por favor, inténtalo de nuevo.",
      })
    );
  }
};

const validateForm = async (formData: { email: string; password: string }) => {
  try {
    await userSchema.validate(formData, {
      abortEarly: false,
    });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      throw new Error(
        JSON.stringify({
          success: false,
          errors: error.errors,
          message: "Validation failed",
        })
      );
    } else throw new Error("Unexpected error occurred during validation");
  }
};

export const registerUser = async (userIntroduced: {
  email: string;
  password: string;
}) => {
  await validateForm(userIntroduced);

  const existingUser = await getUserByEmail(userIntroduced.email);

  if (existingUser) {
    throw new Error(
      JSON.stringify({
        success: false,
        status: 404,
        message: "User already exists",
      })
    );
  } else {
    createUser(userIntroduced);
  }
};
