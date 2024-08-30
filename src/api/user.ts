"use server";
import { db } from "@/db";
import { User } from "@prisma/client";
import { DetailedError } from "@/errors/DetailedError";
import React from "react";
import { encryptPassword } from "@/lib/auth";

export const getUserByEmail = async (
  email: string
): Promise<User | boolean> => {
  const existingUser = await db.user.findFirst({
    where: { email: email },
  });

  if (existingUser) return existingUser;
  else return false;
};

export const createUser = async (user: { email: string; password: string }) => {
  const passwordEncrypted = await encryptPassword(user.password);
  const newUser = await db.user.create({
    data: {
      email: user.email,
      password: passwordEncrypted,
    },
  });
  return newUser;
};
