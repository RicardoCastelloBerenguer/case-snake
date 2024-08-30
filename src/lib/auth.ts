"use server";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const validatePassword = async (
  user: User,
  password: string
): Promise<boolean> => {
  return await bcrypt.compare(password, user.password);
};

export const encryptPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error encrypting password: " + error.message);
    } else {
      throw new Error("Unknown error occurred during password encryption");
    }
  }
};

export const isAdmin = (email: string | undefined) => {
  if (!email) return;
  const adminEmail = process.env.ADMIN_EMAIL;
  console.log(email.includes(adminEmail!));

  return email.includes(adminEmail!);
};
