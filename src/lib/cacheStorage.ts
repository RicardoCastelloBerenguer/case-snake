"use client";
// import { User } from "@prisma/client";

export const saveUserOnCache = (user: { email: string; admin: boolean }) => {
  console.log(user);
  localStorage.setItem("currentUser", JSON.stringify(user));
};
