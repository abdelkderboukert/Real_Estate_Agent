"use client";
import React from 'react'
import Header from '../_auti/header'
import Link from 'next/link';
import { useState } from 'react';

export default function Page() {
  interface DefaultV {
    type: string;
    min: number;
    max: number;
  }

  interface Option {
    label: string;
    value: string;
  }

  const [defaultV, setdefaultV] = useState<DefaultV>({
    max: 500,
    min: 300,
    type: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setdefaultV({ ...defaultV, [event.target.name]: event.target.value });
  };

  const handleChange1 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("handleChange1 called with:", event.target.value);
    setdefaultV({ ...defaultV, type: event.target.value as string });
    
  };

  // const handleSelect = (option: string) => {
  //   setdefaultV({ ...defaultV, type: option });
  //   console.table(defaultV.type)
  // };
  console.table(defaultV);
  const options: Option[] = [
    { label: "Apartment", value: "apartment" },
    { label: "Condo", value: "condo" },
    { label: "Co-op", value: "co-op" },
    { label: "Single-Family", value: "single-family-detached" },
    { label: "Townhouse", value: "townhouse" },
    { label: "Tiny Home", value: "tiny-home" },
    { label: "Cabin", value: "cabin" },
    { label: "Cottage", value: "cottage" },
    { label: "Bungalow", value: "bungalow" },
    { label: "Ranch", value: "ranch" },
    { label: "Split-Level", value: "split-level" },
  ];
  return (
    <>
      <Header />
      <div className="flex flex-col h-screen w-screen items-center">
        <div className="w-screen h-4/5 bg-p1">
          <div className="flex flex-col h-full w-full p-10">
            <div className="flex w-max h-max mt-6 justify-center select-none items-center mx-auto font-bold playwrite-pe-f1 text-2xl sm:text-5xl lg:text-7xl text-white text-center">
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
            <div className="mx-auto min-w-max p-2 bg-zinc-200 justify-center items-center flex text-red-300 h-10 w-3/4 rounded-lg">
              New Yourk
            </div>
          </div>
          <div className="w-1/4 h-full px-5">
            <span className="text-zinc-700 font-medium text-lg">Type</span>{" "}
            <br />
            <select
              className="mx-auto min-w-max p-2 bg-zinc-200 justify-center items-center flex text-red-300 h-10 w-3/4 rounded-lg"
              name="type"
              value={defaultV.type}
              onChange={handleChange1}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/4 h-full px-5">
            <span className="text-zinc-700 font-medium text-lg mt-5">
              Price&nbsp;range
            </span>{" "}
            <br />
            <div className="mx-auto min-w-max p-2 bg-zinc-200 justify-center items-center flex text-red-300 h-10 w-3/4 rounded-lg">
              <input
                type="text"
                defaultValue={defaultV.min}
                onChange={handleChange}
                className=" border-none bg-zinc-200 w-7 max-w-min"
              />
              k&nbsp;-&nbsp;
              <input
                type="text"
                defaultValue={defaultV.max}
                onChange={handleChange}
                className=" border-none bg-zinc-200 w-7 max-w-min focus:outline-none"
              />
              k
            </div>
          </div>
          <div className="w-1/4 h-full justify-end items-center flex">
            <div className="text-white text-md bg-[#0e012d] h-12 w-2/3 min-w-24 rounded-xl shadow-md shadow-[#454545] justify-center items-center flex">
              Search
            </div>
          </div>
        </div>
      </div>

      <section
        className="h-screen w-screen p-5 grid grid-cols-1 sm:grid-cols-5 gap-3"
        id="gg"
      >
        <div className="sm:col-span-2 gap-3 flex justify-end items-center">
          <div
            className="lg:w-5/6 w-full aspect-square rounded-3xl shadow-xl bg-p2"
            content=""
          ></div>
        </div>
        <div className="sm:col-span-3 gap-3 flex justify-center flex-col p-5">
          <h1 className="lg:text-5xl md:text-3xl font-semibold text-black">
            We are the best and most <br />
            trusted{" "}
            <span className="text-[#868faa] font-semibold">
              Real estate agent
            </span>{" "}
          </h1>
          <span className="flex w-3/5 h-max select-none text-zinc-500 text-start lg:text-xl ">
            we&#39;ve&nbsp;holped&nbsp;a&nbsp;lot&nbsp;of&nbsp;peaple&nbsp;to&nbsp;finde&nbsp;there&nbsp;droom&nbsp;homes
          </span>
          <div
            className="w-full h-2/5 py-5 font-bold text-zinc-700 text-xl"
            content=""
          >
            <span className="flex flex-row">
              <div className=" flex justify-center items-center h-7 w-7 rounded-full bg-black mr-2 text-white font-bold">
                <ion-icon name="checkmark-sharp"></ion-icon>
              </div>
              678k buys have worked with us
            </span>
            <br />
            <span className="flex flex-row">
              <div className=" flex justify-center items-center h-7 w-7 rounded-full bg-red-400 mr-2 text-white font-bold">
                <ion-icon name="checkmark-sharp"></ion-icon>
              </div>
              Professional and expaircced rosources
            </span>
            <br />
            <span className="flex flex-row">
              <div className=" flex justify-center items-center h-7 w-7 rounded-full bg-blue-700 mr-2 text-white font-bold">
                <ion-icon name="checkmark-sharp"></ion-icon>
              </div>
              Provide the best service of users
            </span>
            <br />
          </div>
        </div>
      </section>

      <section className="h-screen w-screen">
        <br />
        <h1 className="flex justify-center mx-auto mt-5 lg:text-7xl md:text-4xl text-[#0e012d] font-semibold">
          Special&nbsp;Homes
        </h1>
        <div className="flex w-full h-max mt-5 justify-center items-center mx-auto select-none text-zinc-400 text-center text-xl">
          Find your place with on immorsive photo exporience and the most <br />{" "}
          things listing inckoding things want find anywhere else
        </div>
        <div
          className=" grid grid-flow-row px-28 grid-cols-3 p-10 gap-16 w-screen h-3/4"
          content=""
        >
          <div className="h-full w-full bg-white rounded-xl shadow-2xl flex flex-col">
            <div className="w-full h-3/6 bg-yellow-400 rounded-t-xl"></div>
            <button className="flex w-1/3 h-10 bg-red-400 mt-2 mr-5 mb-auto ml-auto rounded-2xl justify-center items-center text-white">
              View detai
            </button>
            <button className="flex w-1/2 h-12 bg-blue-600 mt-auto ml-auto rounded-br-xl justify-center items-center text-white font-semibold">
              View detai
            </button>
          </div>
          <div className="h-full w-full bg-white rounded-xl shadow-2xl"></div>
          <div className="h-full w-full bg-white rounded-xl shadow-2xl"></div>
        </div>
      </section>
    </>
  );
}
