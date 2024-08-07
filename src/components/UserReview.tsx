/* eslint-disable @next/next/no-img-element */
import { Check, Star } from "lucide-react";
import React from "react";

const UserReview = ({
  starCount = 5,
  clientTextReview = { firstText: "", secondText: "", highlightedText: "" },
  profile = { imgUrl: "/users/user-1.png", name: "Jonathan" },
}: {
  starCount: number;
  clientTextReview: {
    firstText: string;
    secondText: string;
    highlightedText: string;
  };
  profile: { imgUrl: string; name: string };
}) => {
  const stars = Array.from({ length: starCount }, (_, index) => (
    <Star key={index} className="size-5 text-green-600 fill-green-600" />
  ));

  return (
    <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16">
      <div className=" flex flex-auto flex-col gap-1  lg:pr-8 xl:pr-20">
        <div className="flex gap-0.5 mb-2">{stars}</div>
        <div className="text-lg leading-8">
          <p>
            &quot;
            {clientTextReview.firstText}{" "}
            <span className="p-0.5 bg-slate-800 text-white">
              {clientTextReview.highlightedText}
            </span>
            {clientTextReview.secondText}&quot;
          </p>
        </div>

        <div className="flex gap-4 mt-2">
          <img
            className="rounded-full size-12 object-cover"
            src={profile.imgUrl}
            alt="user image"
          />
          <div className="flex flex-col">
            <p className="font-semibold"> {profile.name}</p>
            <div className="flex gap-1.5 items-center text-zinc-600">
              <Check className="size-4 stroke-[3px] text-green-600" />
              <p className="text-sm">Verified Purchase</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserReview;
