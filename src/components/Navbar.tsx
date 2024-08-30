"use client";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { color } from "framer-motion";
import { useUser } from "@/contexts/userContext";
import { useEffect } from "react";
import { isAdmin as isAdminFunction } from "@/lib/auth";

const Navbar = () => {
  const { user, isLoading, isLoggedIn, logout } = useUser();

  let isAdmin = isAdminFunction(user?.email);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    isAdmin = isAdminFunction(user?.email);
  }, [user]);

  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            case <span className="text-primary">Snake</span>
          </Link>
          <div className="h-full flex flex-items items-center space-x-4">
            {isLoggedIn ? (
              <>
                {/* <p>{user?.email === process.env.ADMIN_EMAIL ? "Jola" : "kk"}</p> */}
                {/* <p>{user?.email}</p> */}
                <p>{process.env.ADMIN_EMAIL}</p>
                {isAdmin && (
                  <Link
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                    href="/dashboard"
                  >
                    Dashboard ✨
                  </Link>
                )}

                <Button
                  disabled={isLoading}
                  isLoading={isLoading}
                  loadingText=""
                  onClick={logout}
                  style={{ color: "black" }} // Estilo en línea
                  className={buttonVariants({ size: "sm", variant: "outline" })}
                >
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                  href="/auth?login=false"
                >
                  Sign up
                </Link>
                <Link
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                  href="/auth?login=true"
                >
                  Login
                </Link>

                <div className="h-8 w-px bg-zinc-200 hidden sm:block" />
              </>
            )}

            <Link
              className={buttonVariants({
                size: "sm",
                className: "hidden sm:flex items-center gap-1",
              })}
              href="/configure/upload"
            >
              Create case
              <ArrowRight className="ml-1.5 size-5"></ArrowRight>
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
