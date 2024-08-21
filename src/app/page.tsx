/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Icons from "@/components/Icons";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Phone from "@/components/Phone";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import { buttonVariants } from "@/components/ui/button";
import UserReview from "@/components/UserReview";
import { ArrowRight, Check, Star } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-slate-50 grainy-light">
      <section>
        <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="absolute w-28 left-0 -top-20 hidden lg:block">
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t via-slate-50/50 from-slate-50 h-28" />
                <img src="/snake-1.png" className="w-full" />
              </div>
              <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">
                Your Image on a{" "}
                <span className="bg-green-600 px-2 text-white">Custom</span>{" "}
                Phone Case
              </h1>
              <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                Capture your favorite memories with your own,{" "}
                <span className="font-semibold">one-of-one</span> phone case.
                CaseCobra allows you to protect your memories, not just your
                phone case.
              </p>

              <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                <div className="space-y-2">
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    High-quality, durable material
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />5 year
                    print guarantee
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    Modern iPhone models supported
                  </li>
                </div>
              </ul>

              <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="flex -space-x-4">
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    src="/users/user-1.png"
                    alt="user image"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    src="/users/user-2.png"
                    alt="user image"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    src="/users/user-3.png"
                    alt="user image"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                    src="/users/user-4.jpg"
                    alt="user image"
                  />
                  <img
                    className="inline-block object-cover h-10 w-10 rounded-full ring-2 ring-slate-100"
                    src="/users/user-5.jpg"
                    alt="user image"
                  />
                </div>

                <div className="flex flex-col justify-between items-center sm:items-start">
                  <div className="flex gap-0.5">
                    <Star className="h-4 w-4 text-green-600 fill-green-600" />
                    <Star className="h-4 w-4 text-green-600 fill-green-600" />
                    <Star className="h-4 w-4 text-green-600 fill-green-600" />
                    <Star className="h-4 w-4 text-green-600 fill-green-600" />
                    <Star className="h-4 w-4 text-green-600 fill-green-600" />
                  </div>

                  <p>
                    <span className="font-semibold">1.250</span> happy customers
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit">
            <div className="relative md:max-w-xl">
              <img
                src="/your-image.png"
                className="absolute w-40 lg:w-52 left-56 -top-20 select-none hidden sm:block lg:hidden xl:block"
              />
              <img
                src="/line.png"
                className="absolute w-20 -left-6 -bottom-6 select-none"
              />
              <Phone className="w-64" imgSource="/testimonials/1.jpg" />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section id="value-section" className="bg-slate-100 py-24">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm-gap-32">
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
            <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
              What our{" "}
              <span className="relative px-2">
                costumers{" "}
                <Icons.underline className="hidden sm:block pointer-events-none inset-x-0 absolute -bottom-6 text-green-500"></Icons.underline>{" "}
              </span>{" "}
              say
            </h2>

            <img
              src="/snake-2.png"
              className="w-28 order-0 lg:order-2"
              alt=""
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 lg:max-w-none gap-y-16">
            <UserReview
              starCount={5}
              clientTextReview={{
                firstText:
                  "The case feels durable and I even got a compliment on the design. Had the case for two and a half months now and",
                highlightedText: "the image is super clean",
                secondText: ". I dig it.",
              }}
              profile={{ imgUrl: "/users/user-1.png", name: "Jonathan" }}
            />
            <UserReview
              profile={{ imgUrl: "/users/user-2.png", name: "Anna" }}
              starCount={5}
              clientTextReview={{
                firstText:
                  "I usually keep my phone together with my keys in my pocket and that lead to some pretty heavy scratch marks on all of my last phone cases. This one, besides a barely noticeable scratch on the corner,",
                highlightedText: "looks brand new after about half a year",
                secondText:
                  ", on the case I had before, the image started fading into yellow-ish color after a couple weeks. Love it ",
              }}
            />
            <UserReview
              profile={{ imgUrl: "/users/user-3.png", name: "María" }}
              starCount={5}
              clientTextReview={{
                firstText:
                  "I'm always dropping my phone and the last few cases I had barely protected it from getting dinged up. This case, however,",
                highlightedText: "has been amazing.",
                secondText:
                  " After six months of use, it only has a tiny scuff on one edge. My previous case got cracks and the design wore off within the first month. This one still looks as good as new. Highly recommend!",
              }}
            />
            <UserReview
              starCount={5}
              profile={{ imgUrl: "/users/user-4.jpg", name: "Josh" }}
              clientTextReview={{
                firstText:
                  "My phone usually shares a pocket with my coins, which often results in my cases getting scratched up pretty quickly. Surprisingly,",
                highlightedText: "this case has held up really well",
                secondText:
                  " After about six months, it only has a slight scratch on one corner. The last case I used turned dull and had the design fade within a few weeks. This one is durable and looks great. Very happy with this purchase!",
              }}
            />
          </div>
        </MaxWidthWrapper>

        <div className="pt-16">
          <Reviews />
        </div>
      </section>

      <section>
        <MaxWidthWrapper className="py-24">
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
                Upload your photo and get{" "}
                <span className="relative px-2 bg-green-600 text-white">
                  your own case{" "}
                </span>{" "}
                now
              </h2>
            </div>
          </div>

          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="relative flex flex-col items-center md:grid grid-cols-2 gap-40">
              <img
                src="/arrow.png"
                className="absolute top-[25rem] md:top-1/2 -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0"
                alt="Arrow image"
              />

              <div className="relative h-80 md:h-full w-full md:justify-self-end max-w-sm rounded-xl bg-gray-900/5 ring-inset ring-gray-900/10 lg:rounded-2xl">
                <img
                  src="/horse.jpg"
                  className="rounded-md object-cover bg-white shadow-2xl ring-1 ring-gray-900/10 h-full w-full"
                  alt="Horse Image"
                />
              </div>

              <Phone className="w-60" imgSource="/horse.jpg" />
            </div>
          </div>

          <ul className="mx-auto mt-12 max-w-prose sm:text-lg space-y-2 w-fit">
            <li className="w-fit">
              <Check className="size-5 text-green-600 inline mr-1.5 " />
              <p className="inline">High quality silicone material</p>
            </li>
            <li className="w-fit">
              <Check className="size-5 text-green-600 inline mr-1.5 " />
              <p className="inline">Anti-slip to prevent accidental drops</p>
            </li>
            <li className="w-fit">
              <Check className="size-5 text-green-600 inline mr-1.5 " />
              <p className="inline">Scratch and wear-resistant</p>
            </li>
            <li className="w-fit">
              <Check className="size-5 text-green-600 inline mr-1.5 " />
              <p className="inline">5 year print warranty</p>
            </li>
            <li className="w-fit">
              <Check className="size-5 text-green-600 inline mr-1.5 " />
              <p className="inline">Compatibility with wireless charging</p>
            </li>

            <div className="flex justify-center">
              <Link
                className={buttonVariants({
                  size: "lg",
                  className: "mx-auto mt-8",
                })}
                href={"/configure/upload"}
              >
                Create your own case now
              </Link>
            </div>
          </ul>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
