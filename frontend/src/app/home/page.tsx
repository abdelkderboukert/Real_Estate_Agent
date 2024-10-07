import React from 'react'
import Header from '../_auti/header'
import Link from 'next/link';

export default function page() {
  return (
    <>
      <Header />
      <div className="flex flex-col h-screen w-screen items-center">
        <div className="w-screen h-4/5 bg-p1">
          <div className="flex flex-col h-full w-full p-10">
            <div className="flex w-max h-max mt-6 justify-center select-none items-center mx-auto font-medium playwrite-pe-f1 text-2xl sm:text-5xl lg:text-7xl text-white text-center">
              Your perfect home <br /> is waiting for you
            </div>
            <div className="flex w-3/5 h-max mt-5 justify-center items-center mx-auto select-none text-zinc-300 text-center">
              we have more thant 200k proportion around the <br /> world to show
              you
            </div>
            <Link
              href="./#gg"
              className="h-12 w-40 bg-white mx-auto mt-4 rounded-xl items-center justify-center flex text-black"
            >
              Explore mores
            </Link>
          </div>
        </div>
        <div className="w-2/3 bg-white shadow-2xl rounded-2xl px-5 py-2 h-24 relative -top-12 justify-between items-center flex flex-row">
          <div className="w-1/4 h-full px-5">
            <span className="text-zinc-700 font-medium text-lg">
              Localisation
            </span>{" "}
            <br />
            <div className="mx-auto bg-zinc-200 justify-center items-center flex text-red-300 h-10 w-3/4 rounded-lg">
              Apartmer
            </div>
          </div>
          <div className="w-1/4 h-full px-5">
            <span className="text-zinc-700 font-medium text-lg">Type</span>{" "}
            <br />
            <div className="mx-auto bg-zinc-200 justify-center items-center flex text-red-300 h-10 w-3/4 rounded-lg">
              Apartmer
            </div>
          </div>
          <div className="w-1/4 h-full px-5">
            <span className="text-zinc-700 font-medium text-lg mt-5">
              Price range
            </span>{" "}
            <br />
            <div className="mx-auto bg-zinc-200 justify-center items-center flex text-red-300 h-10 w-3/4 rounded-lg">
              400k - 500k
            </div>
          </div>
          <div className="w-1/4 h-full justify-end items-center flex">
            <div className="text-white text-md bg-[#0e012d] h-12 w-2/3 min-w-24 rounded-xl shadow-md shadow-[#454545] justify-center items-center flex">
              Search
            </div>
          </div>
        </div>
      </div>
      <section className="h-screen w-screen" id="gg"></section>
    </>
  );
}
