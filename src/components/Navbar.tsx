import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";

const Navbar = () => {
  const user = false;
  const isAdmin = true;
  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            case <span className="text-green-600">Snake</span>
          </Link>

          <div className="h-full flex flex-items items-center space-x-4">
            {user ? (
              <>
                {isAdmin && (
                  <Link
                    className={buttonVariants({ size: "sm", variant: "ghost" })}
                    href="/api/auth/logout"
                  >
                    Dashboard ✨
                  </Link>
                )}
                <Link
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                  href="/api/auth/logout"
                >
                  Sign out
                </Link>
              </>
            ) : (
              <>
                <Link
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                  href="/api/auth/register"
                >
                  Sign up
                </Link>
                <Link
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                  href="/api/auth/register"
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
              href="/api/auth/logout"
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
