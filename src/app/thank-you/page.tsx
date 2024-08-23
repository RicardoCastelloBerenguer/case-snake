import React, { Suspense } from "react";
import ThankYou from "./ThankYou";

const Page = () => {
  return (
    <Suspense>
      <ThankYou></ThankYou>
    </Suspense>
  );
};

export default Page;
