"use client";
import React, { useEffect, useState } from "react";
import AuthForm from "./AuthForm";
import { useRouter, useSearchParams } from "next/navigation";

const AuthDesign = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // console.log(searchParams.get("register"));
  const [isLogin, setIsLogin] = useState(true);
  const [errorsMessage, setErrorsMessage] = useState([]);

  const toggleAuthMode = () => {
    router.push(`/auth?login=${!isLogin}`);
  };

  useEffect(() => {
    const loginParam = searchParams.get("login");

    setIsLogin(loginParam === "true" || loginParam === null);
  }, [searchParams]);

  return (
    <>
      <div className="w-full flex justify-center">
        <h2 className="py-2 px-5 text-white text-center text-5xl font-bold bg-primary inline">
          {isLogin ? "LOGIN" : "REGISTER"}
        </h2>
      </div>

      <p className="text-base tracking-tight text-zinc-500 mt-2 text-center">
        {isLogin
          ? "Enter your email below to login your account"
          : "Enter your data below to register your account"}
      </p>

      <AuthForm onError={setErrorsMessage} isLogin={isLogin}></AuthForm>

      <div className="relative">
        <p className="text-center mt-5 text-zinc-600">
          Dont have an account?{" "}
          <button
            onClick={() => toggleAuthMode()}
            className="text-black underline hover:text-zinc-700 transition-all"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
        <div className="flex flex-col gap-2 absolute left-1/2 transform -translate-x-1/2 -bottom-32">
          {/* Verifica si errorsMessage no es null o undefined y es un array */}
          {Array.isArray(errorsMessage) && errorsMessage.length > 0
            ? errorsMessage.map((msg, index) => (
                <p key={index} className="text-red-500 w-full text-center">
                  {msg}
                </p>
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default AuthDesign;
