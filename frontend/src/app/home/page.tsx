"use client";
import React from "react";
import Header from "../_auti/header";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { IonIcon } from "@ionic/react";
import { checkmarkSharp, carSportSharp, bedSharp } from "ionicons/icons";
import { motion } from "framer-motion";
import Fonted from "../_auti/fonted";

export default function Page() {
  interface DefaultV {
    type: string;
    localoitation: string;
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
    localoitation: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value) * 1000;
    setdefaultV({ ...defaultV, [event.target.name]: newValue });
  };

  const handleChange1 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("handleChange1 called with:", event.target.value);
    setdefaultV({
      ...defaultV,
      [event.target.name]: event.target.value as string,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(defaultV);
    // Do something with the form data, such as sending it to a server
  };

  const divRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  const [test, settest] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      if (divRef.current) {
        const newWidth = divRef.current.offsetWidth;
        setWidth(newWidth);
        if ((newWidth as number) < 140) {
          settest(false);
        } else {
          settest(true);
        }
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [divRef]);

  const [surfaceArea, setSurfaceArea] = useState("");
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit1 = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setError(null);
    setPredictedPrice(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/predict/?surface_area=${surfaceArea}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPredictedPrice(data.predicted_price);
    } catch (err) {
      setError(err.message);
    }
  };

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
      <div className="flex flex-col h-screen w-screen items-center" id="home">
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
              href="./#us"
              className="h-12 w-40 bg-white mx-auto mt-4 rounded-xl items-center justify-center flex text-black"
            >
              Explore mores
            </Link>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-2/3 bg-white shadow-2xl rounded-2xl px-5 py-2 h-24 relative -top-12 justify-between items-center flex flex-row"
        >
          <div className="w-1/4 h-full px-5">
            <span className="text-zinc-700 font-medium text-lg">
              Localisation
            </span>{" "}
            <br />
            <select
              className="mx-auto min-w-max p-2 bg-zinc-200 justify-center items-center flex text-red-300 h-10 w-3/4 rounded-lg"
              name="localoitation"
              value={defaultV.type}
              onChange={handleChange1}
            >
              {options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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
                name="min"
                defaultValue={defaultV.min}
                onChange={handleChange}
                className=" border-none bg-zinc-200 w-7 max-w-min focus:outline-none"
              />
              k&nbsp;-&nbsp;
              <input
                type="text"
                name="max"
                defaultValue={defaultV.max}
                onChange={handleChange}
                className=" border-none bg-zinc-200 w-7 max-w-min focus:outline-none"
              />
              k
            </div>
          </div>
          <div className="w-1/4 h-full justify-end items-center flex">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.75 }}
              className="text-white text-md  cursor-pointer select-none  bg-[#0e012d] h-12 w-2/3 min-w-24 rounded-xl shadow-md shadow-[#454545] justify-center items-center flex"
            >
              Search
            </motion.button>
          </div>
        </form>
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
                {/* <ion-icon name="checkmark-sharp"></ion-icon> */}
                <IonIcon icon={checkmarkSharp} />
              </div>
              678k buys have worked with us
            </span>
            <br />
            <span className="flex flex-row">
              <div className=" flex justify-center items-center h-7 w-7 rounded-full bg-red-400 mr-2 text-white font-bold">
                {/* <ion-icon name="checkmark-sharp"></ion-icon> */}
                <IonIcon icon={checkmarkSharp} />
              </div>
              Professional and expaircced rosources
            </span>
            <br />
            <span className="flex flex-row">
              <div className=" flex justify-center items-center h-7 w-7 rounded-full bg-blue-700 mr-2 text-white font-bold">
                {/* <ion-icon name="checkmark-sharp"></ion-icon> */}
                <IonIcon icon={checkmarkSharp} />
              </div>
              Provide the best service of users
            </span>
            <br />
          </div>
        </div>
      </section>

      <section className="lg:h-screen h-full w-screen">
        <br />
        <h1 className="flex justify-center mx-auto mt-5 lg:text-7xl md:text-4xl text-[#0e012d] font-semibold">
          Special&nbsp;Homes
        </h1>
        <div className="flex w-full h-max mt-5 justify-center items-center mx-auto select-none text-zinc-400 text-center text-xl">
          Find your place with on immorsive photo exporience and the most <br />{" "}
          things listing inckoding things want find anywhere else
        </div>
        <div
          className=" grid grid-flow-row px-28 md:grid-cols-2 lg:grid-cols-3 p-10 gap-16 lg:gap-12 w-screen h-max"
          content=""
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="h-96 w-full bg-white rounded-xl shadow-2xl flex flex-col"
          >
            <div className="w-full h-3/6 bg-yellow-400 rounded-t-xl"></div>
            <div className="w-full h-1/2 rounded-b-xl flex flex-col">
              <div className="h-16 w-full flex flex-row">
                <h1 className="w-2/3 h-10 text-2xl lg:text-3xl ml-5 mt-2 font-semibold text-zinc-700">
                  $5,000,000 <br />
                  <span className=" relative -top-5 text-xs lg:text-sm text-zinc-400 leading-relaxed font-normal">
                    dgbsdgb sfgnsfgn gnbdqgbsd
                  </span>
                </h1>
                <div className="flex w-1/3 h-10 bg-red-400 mt-2 mr-5 mb-auto ml-auto rounded-2xl justify-center items-center text-white">
                  {/* <Link
                    // href="/shope/[id]"
                    // as={`/shope/${plant.category}/${plant.id}`}
                  > */}
                  View detai
                  {/* </Link> */}
                </div>
              </div>
              <div className=" grid grid-flow-row grid-cols-2 grid-rows-2 h-[calc(100%_-_64px)] w-full px-3 py-3">
                <div
                  ref={divRef}
                  className="flex items-center px-2 h-7 w-[95%] text-zinc-400"
                >
                  <span className="text-black text-xl mr-2">
                    {/* <ion-icon name="car-sport-sharp"></ion-icon> */}
                    <IonIcon icon={carSportSharp} />
                  </span>
                  2{test && <span>&nbsp;grage&nbsp;spice</span>}
                </div>
                <div className="h-7 w-[95%] text-zinc-400 flex flex-row">
                  <span className="text-black text-xl mr-2">
                    <IonIcon icon={bedSharp} />
                  </span>
                  3{test && <span>&nbsp;badroom&nbsp;chamber</span>}
                </div>
                <div className="h-7 w-[95%] text-zinc-400 flex flex-row">
                  <span className="text-black text-xl mr-2">
                    <IonIcon icon={bedSharp} />
                  </span>
                  3{test && <span>&nbsp;badroom&nbsp;chamber</span>}
                </div>
              </div>
              <button className="flex w-1/2 h-12 bg-blue-600 mt-auto rounded-br-xl ml-auto justify-center items-center text-white font-semibold">
                View detai
              </button>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="h-96 w-full bg-white rounded-xl shadow-2xl flex flex-col"
          >
            <div className="w-full h-3/6 bg-yellow-400 rounded-t-xl"></div>
            <div className="w-full h-1/2 rounded-b-xl flex flex-col">
              <div className="h-16 w-full flex flex-row">
                <h1 className="w-2/3 h-10 text-2xl lg:text-3xl ml-5 mt-2 font-semibold text-zinc-700">
                  $5,000,000 <br />
                  <span className=" relative -top-5 text-xs lg:text-sm text-zinc-400 leading-relaxed font-normal">
                    dgbsdgb sfgnsfgn gnbdqgbsd
                  </span>
                </h1>
                <div className="flex w-1/3 h-10 bg-red-400 mt-2 mr-5 mb-auto ml-auto rounded-2xl justify-center items-center text-white">
                  {/* <Link
                    href="/shope/[id]"
                    // as={`/shope/${plant.category}/${plant.id}`}
                  > */}
                  View detai
                  {/* </Link> */}
                </div>
              </div>
              <div className=" grid grid-flow-row grid-cols-2 grid-rows-2 h-[calc(100%_-_64px)] w-full px-3 py-3">
                <div
                  ref={divRef}
                  className="flex items-center px-2 h-7 w-[95%] text-zinc-400"
                >
                  <span className="text-black text-xl mr-2">
                    <IonIcon icon={carSportSharp} />
                  </span>
                  2{test && <span>&nbsp;grage&nbsp;spice</span>}
                </div>
                <div className="h-7 w-[95%] text-zinc-400 flex flex-row">
                  <span className="text-black text-xl mr-2">
                    <IonIcon icon={bedSharp} />
                  </span>
                  3{test && <span>&nbsp;badroom&nbsp;chamber</span>}
                </div>
                <div className="h-7 w-[95%] text-zinc-400 flex flex-row">
                  <span className="text-black text-xl mr-2">
                    <IonIcon icon={bedSharp} />
                  </span>
                  3{test && <span>&nbsp;badroom&nbsp;chamber</span>}
                </div>
              </div>
              <button className="flex w-1/2 h-12 bg-blue-600 mt-auto rounded-br-xl ml-auto justify-center items-center text-white font-semibold">
                View detai
              </button>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="h-96 w-full bg-white rounded-xl shadow-2xl flex flex-col"
          >
            <div className="w-full h-3/6 bg-yellow-400 rounded-t-xl"></div>
            <div className="w-full h-1/2 rounded-b-xl flex flex-col">
              <div className="h-16 w-full flex flex-row">
                <h1 className="w-2/3 h-10 text-2xl lg:text-3xl ml-5 mt-2 font-semibold text-zinc-700">
                  $5,000,000 <br />
                  <span className=" relative -top-5 text-xs lg:text-sm text-zinc-400 leading-relaxed font-normal">
                    dgbsdgb sfgnsfgn gnbdqgbsd
                  </span>
                </h1>
                <div className="flex w-1/3 h-10 bg-red-400 mt-2 mr-5 mb-auto ml-auto rounded-2xl justify-center items-center text-white">
                  {/* <Link
                    href="/shope/[id]"
                    // as={`/shope/${plant.category}/${plant.id}`}
                  > */}
                  View detai
                  {/* </Link> */}
                </div>
              </div>
              <div className=" grid grid-flow-row grid-cols-2 grid-rows-2 h-[calc(100%_-_64px)] w-full px-3 py-3">
                <div
                  ref={divRef}
                  className="flex items-center px-2 h-7 w-[95%] text-zinc-400"
                >
                  <span className="text-black text-xl mr-2">
                    <IonIcon icon={carSportSharp} />
                  </span>
                  2{test && <span>&nbsp;grage&nbsp;spice</span>}
                </div>
                <div className="h-7 w-[95%] text-zinc-400 flex flex-row">
                  <span className="text-black text-xl mr-2">
                    <IonIcon icon={bedSharp} />
                  </span>
                  3{test && <span>&nbsp;badroom&nbsp;chamber</span>}
                </div>
                <div className="h-7 w-[95%] text-zinc-400 flex flex-row">
                  <span className="text-black text-xl mr-2">
                    <IonIcon icon={bedSharp} />
                  </span>
                  3{test && <span>&nbsp;badroom&nbsp;chamber</span>}
                </div>
              </div>
              <button className="flex w-1/2 h-12 bg-blue-600 mt-auto rounded-br-xl ml-auto justify-center items-center text-white font-semibold">
                View detai
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="lg:h-screen h-full w-screen mb-10" id="service">
        <br />
        <br />
        <h1 className="flex mt-14 justify-center mx-auto lg:text-7xl md:text-4xl text-[#0e012d] font-semibold">
          Our&nbsp;Services
        </h1>
        <div className="flex w-full h-max mt-5 justify-center items-center mx-auto select-none text-zinc-400 text-center text-xl">
          Find your place with on immorsive photo exporience and the most <br />{" "}
          things listing inckoding things want find anywhere else
        </div>
        <div
          className=" grid grid-flow-row px-28 md:grid-cols-2 lg:grid-cols-3 p-10 gap-16 lg:gap-12 w-screen h-max"
          content=""
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="h-96 w-full flex flex-col"
          >
            <div className="flex w-full h-3/6 rounded-t-xl justify-center items-center">
              <div className="w-36 h-36 bg-purple-200 rounded-full flex justify-center items-center ">
                <div className="h-20 w-20 bg-purple-900"></div>
              </div>
            </div>
            <h1 className="text-2xl font-semibold mx-auto text-black">
              gdbsdgbgbsdgb
            </h1>
            <br />
            <span className="text-center text-zinc-400">
              {" "}
              dgfbqd dgbdq dbqd dfbrnzrsg gdbdsgb dgsbbg dgbsgn dgbdb sdgbsdg
              dsgbsdbg
            </span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="h-96 w-full rounded-xl flex flex-col border-black"
          >
            <div className="flex w-full h-3/6 rounded-t-xl justify-center items-center">
              <div className="w-36 h-36 bg-blue-200 rounded-full flex justify-center items-center ">
                <div className="h-20 w-20 bg-blue-900"></div>
              </div>
            </div>
            <h1 className="text-2xl font-semibold mx-auto text-black">
              gdbsdgbgbsdgb
            </h1>
            <br />
            <span className="text-center text-zinc-400">
              {" "}
              dgfbqd dgbdq dbqd dfbrnzrsg gdbdsgb dgsbbg dgbsgn dgbdb sdgbsdg
              dsgbsdbg
            </span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="h-96 w-full rounded-xl flex flex-col"
          >
            <div className="flex w-full h-3/6 rounded-t-xl justify-center items-center">
              <div className="w-36 h-36 bg-orange-200 rounded-full flex justify-center items-center ">
                <div className="h-20 w-20 bg-amber-600"></div>
              </div>
            </div>
            <h1 className="text-2xl font-semibold mx-auto text-black">
              gdbsdgbgbsdgb
            </h1>
            <br />
            <span className="text-center text-zinc-400">
              {" "}
              dgfbqd dgbdq dbqd dfbrnzrsg gdbdsgb dgsbbg dgbsgn dgbdb sdgbsdg
              dsgbsdbg
            </span>
          </motion.div>
        </div>
      </section>

      <section className="lg:h-screen h-full w-screen bg-[#d0cae6] flex justify-center items-center">
        <video controls src="" className="w-[90%] h-[90%] aspect-auto"></video>
      </section>

      <section className=" h-min w-screen" id="blog">
        <br />
        <h1 className="flex justify-center mx-auto mt-5 lg:text-7xl md:text-4xl text-[#0e012d] font-semibold">
          Our&nbsp;best&nbsp;blogs
        </h1>
        <div
          className="grid grid-flow-row px-28 grid-cols-1 lg:grid-cols-2 p-10 gap-16 lg:gap-12 w-screen h-max"
          content=""
        >
          <div className="h-max w-full flex flex-col">
            <div className="w-full h-48 p-5 flex flex-row">
              <div className="w-1/4 h-full bg-black rounded-2xl"></div>
              <div className="w-3/4 h-full flex flex-col p-3">
                <h1 className="text-black text-xl font-semibold">
                  dfbsdbsdgbgbsdb dbsdbsdb dbdqbd sgb dg edgbr gbeg
                </h1>
                <br />
                <span className="text-zinc-500">
                  dggbsd dgbdsg fgbzeb gbzeb etgzeb bebrgb ebgebg dbggb gbrgnb
                  sdgbebg sdgbgb dbdb dbb dgbsdg{" "}
                </span>
              </div>
            </div>
            <div className="w-full h-48 p-5 flex flex-row">
              <div className="w-1/4 h-full bg-black rounded-2xl"></div>
              <div className="w-3/4 h-full flex flex-col p-3">
                <h1 className="text-black text-xl font-semibold">
                  dfbsdbsdgbgbsdb dbsdbsdb dbdqbd sgb dg edgbr gbeg
                </h1>
                <br />
                <span className="text-zinc-500">
                  dggbsd dgbdsg fgbzeb gbzeb etgzeb bebrgb ebgebg dbggb gbrgnb
                  sdgbebg sdgbgb dbdb dbb dgbsdg{" "}
                </span>
              </div>
            </div>
            <div className="w-full h-48 p-5 flex flex-row">
              <div className="w-1/4 h-full bg-black rounded-2xl"></div>
              <div className="w-3/4 h-full flex flex-col p-3">
                <h1 className="text-black text-xl font-semibold">
                  dfbsdbsdgbgbsdb dbsdbsdb dbdqbd sgb dg edgbr gbeg
                </h1>
                <br />
                <span className="text-zinc-500">
                  dggbsd dgbdsg fgbzeb gbzeb etgzeb bebrgb ebgebg dbggb gbrgnb
                  sdgbebg sdgbgb dbdb dbb dgbsdg{" "}
                </span>
              </div>
            </div>
          </div>
          <div className="h-[576px] w-full bg-white rounded-3xl shadow-2xl bg-p3"></div>
        </div>
      </section>

      <section
        className="lg:h-screen w-screen grid grid-flow-row px-28 grid-cols-1 lg:grid-cols-2 p-10 gap-16 lg:gap-12"
        id="us"
      >
        <div className=" relative h-full w-full bg-white rounded-3xl shadow-2xl bg-p4 ">
          <motion.div
            whileHover={{
              width: "100%",
              height: "100%",
              bottom: 0,
              right: 0,
              border: 0,
            }}
            className="absolute bottom-14 -right-12 w-72 h-48 rounded-2xl border-white border-4 bg-black bg-p5"
            content=" "
          ></motion.div>
        </div>
        <div className="h-full w-full flex justify-center text-black p-10 flex-col">
          <span className="text-6xl font-semibold flex justify-start">
            Why
            <br />
            choose&nbsp;Us{" "}
          </span>
          <span className="text-zinc-500 my-5">
            {" "}
            some bla bla abiut choosing us for your buying and stoll your mony i
            mean give you the best choise what did you mean i will not do that
            aver are u{" "}
          </span>
          <motion.div
            whileHover={{ scale: 0.97 }}
            className="w-1/2 h-16 bg-red-500 rounded-2xl cursor-pointer shadow-2xl text-xl text-white"
          >
            <Link
              href={""}
              className="h-full w-full flex justify-center items-center"
            >
              Read&nbsp;More
            </Link>
          </motion.div>
        </div>
      </section>

      <section className=" h-svh w-screen">
        <br />
        <h1 className="flex justify-center mx-auto mt-5 lg:text-7xl md:text-4xl text-[#0e012d] font-semibold">
          Price&nbsp;Prediction
        </h1>
        <div className="flex w-full h-max mt-5 justify-center items-center mx-auto select-none text-zinc-400 text-center text-xl">
          We give you an approximate price for the hous based on the area <br />{" "}
          this is done by comparing the area with Millions of houses in our
          database
        </div>
        <form
          onSubmit={handleSubmit1}
          className="w-2/3 bg-white shadow-2xl rounded-2xl px-5 py-2 h-24 justify-between items-center flex mx-auto mt-20 flex-row"
        >
          <div className="w-1/4 h-full px-5">
            <span className="text-zinc-700 font-medium text-lg">
              Surface&nbsp;Area&nbsp;(m²):
            </span>{" "}
            <br />
            <input
              type="number"
              className="mx-auto min-w-max p-2 bg-zinc-200 justify-center items-center flex text-red-300 h-10 w-3/4 rounded-lg focus:outline-none"
              value={surfaceArea}
              onChange={(e) => setSurfaceArea(e.target.value)}
              required
            />
          </div>
          <div className="w-1/4 h-full px-5">
            <span className="text-zinc-700 font-medium text-lg mt-5">
              The&nbsp;prce&nbsp;(DZD)
            </span>{" "}
            <br />
            <div className="mx-auto min-w-max p-2 bg-zinc-200 justify-center items-center flex text-red-300 h-10 rounded-lg">
              {predictedPrice && <h2>{predictedPrice}</h2>}
              {error && <h2 style={{ color: "red" }}>Error: {error}</h2>}
            </div>
          </div>
          <div className="w-1/4 h-full justify-end items-center flex">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.75 }}
              className="text-white text-md  cursor-pointer select-none  bg-[#0e012d] h-12 w-3/4 min-w-24 rounded-xl shadow-md shadow-[#454545] justify-center items-center flex"
            >
              Search
            </motion.button>
          </div>
        </form>
      </section>
      <Fonted />
    </>
  );
}
