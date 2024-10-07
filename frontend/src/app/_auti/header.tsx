import React from "react";

export default function Header() {
  return (
    <div className="bg-white flex w-screen h-11 md:h-14 items-center justify-between px-4 sm:px-7 lg:px-12 shadow-lg ">
      <div className="bg-green-500 h-full w-48 flex justify-center items-center"></div>
      <div className="h-full w-full items-center justify-between"></div>
      <div className="bg-red-500 h-full flex w-72 justify-center items-center"></div>
    </div>
  );
}
