import React, { Suspense } from "react";
import AuthDesign from "./AuthDesign";

const page = () => {
  return (
    <div
      style={{ height: "calc(100vh - 80px - 57px)" }}
      className="w-ful flex flex-col justify-center items-center"
    >
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex flex-col gap-2">
          <AuthDesign></AuthDesign>
        </div>
      </Suspense>
    </div>
  );
};

export default page;
