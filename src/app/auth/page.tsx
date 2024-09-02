import React from "react";
import AuthDesign from "./AuthDesign";

const page = () => {
  return (
    <div
      style={{ height: "calc(100vh - 80px - 57px)" }}
      className="w-ful flex flex-col justify-center items-center"
    >
      <div className="flex flex-col gap-2">
        <AuthDesign></AuthDesign>
      </div>
    </div>
  );
};

export default page;
