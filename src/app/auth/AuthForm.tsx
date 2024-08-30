"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "./actions";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/contexts/userContext";
import { DetailedError } from "@/errors/DetailedError";
import { useRouter } from "next/navigation";

const LoginForm = ({
  isLogin,
  onError,
}: {
  isLogin: boolean;
  onError: (errorMessage: []) => void;
}) => {
  const router = useRouter();
  const { user, checkIsLoggedIn } = useUser();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  const { mutate: loginUserMutation, isPending: isPendingLogin } = useMutation({
    mutationKey: ["login-user"],
    mutationFn: loginUser,
    onSuccess: () => {
      onError([]);

      checkIsLoggedIn();

      const configStored = localStorage.getItem("configurationId");

      if (configStored) {
        router.push(`/configure/preview?id=${configStored}`);
      } else router.push("/");

      toast({
        title: "Logged in successfully",
        description: email,
        variant: "default",
      });

      clearForm();
    },
    onError: (error) => {
      if (error instanceof Error) {
        const parsedError = JSON.parse(error.message);

        console.log(parsedError.status === 404);

        if (parsedError.status === 404) {
          toast({
            title: parsedError.message,
            description: email || "No email specified",
            variant: "destructive",
          });
        }

        if (
          parsedError &&
          parsedError.errors.length > 0 &&
          parsedError.status != 404
        ) {
          console.log(parsedError);
          onError(parsedError.errors);
        }
      }
    },
  });

  const { mutate: registerUserMutation, isPending: isPendingRegister } =
    useMutation({
      mutationKey: ["login-user"],
      mutationFn: registerUser,
      onSuccess: () => {
        onError([]);
        toast({
          title: "User created successfully",
          description: email,
          variant: "default",
        });

        clearForm();
      },
      onError: (error) => {
        if (error instanceof Error) {
          const parsedError = JSON.parse(error.message);

          console.log(parsedError.status === 404);

          if (parsedError.status === 404) {
            toast({
              title: parsedError.message,
              variant: "destructive",
            });
          }

          if (
            parsedError &&
            parsedError.errors.length > 0 &&
            parsedError.status != 404
          ) {
            console.log(parsedError);
            onError(parsedError.errors);
          }
        }
      },
    });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = { email: email, password: password };
    if (isLogin) loginUserMutation(user);
    else registerUserMutation(user);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 mt-3"
      action=""
    >
      <label className="font-semibold text-base tracking-tight" htmlFor="">
        Email
      </label>
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className=""
        type="email"
        placeholder="mail@example.com"
      />
      <label className="font-semibold text-base tracking-tight" htmlFor="">
        Password
      </label>
      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="**********"
      />
      <div className="mt-4">
        {isLogin ? (
          <Button
            isLoading={isPendingLogin}
            type="submit"
            className="w-full text-base tracking-wide"
          >
            Login
          </Button>
        ) : (
          <Button
            isLoading={isPendingRegister}
            type="submit"
            className="w-full text-base tracking-wide"
          >
            Register
          </Button>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
