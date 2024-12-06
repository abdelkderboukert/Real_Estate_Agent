"use client";
import React, { useState, useEffect, useRef } from "react";
import Fonted from "../_auti/fonted";
import Header from "../_auti/header";
import { motion } from "framer-motion";
import { IonIcon } from "@ionic/react";
import { carSportSharp, bedSharp } from "ionicons/icons";

export default function Page() {
  const word = "pizza";
  const letters: string[] = [];
  // const [click1, setclick] = useState<boolean>(false);
  // console.log(click1);

  // const handleClick = () => {
  //   setclick(true);
  // };

  word.split("").forEach((letter) => {
    letters.push(letter);
  });

  // const [surfaceArea, setSurfaceArea] = useState("");
  // const [predictedPrice, setPredictedPrice] = useState(null);
  // const [error, setError] = useState<string | null>(null);

  // const handleSubmit1 = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setError(null);
  //   setPredictedPrice(null);

  //   try {
  //     const response = await fetch(
  //       `http://127.0.0.1:8000/api/predict/?surface_area=${surfaceArea}`
  //     );
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const data = await response.json();
  //     setPredictedPrice(data.predicted_price);
  //   } catch (err) {
  //     if (err instanceof Error) {
  //       setError(err.message);
  //     } else {
  //       setError("An unknown error occurred");
  //     }
  //   }
  // };

  const divRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  const [test, settest] = useState<boolean>(true);
  console.log(width);

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

  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/houseDsply/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setHouses(data);
      } catch (error) {
        // @ts-expect-error The error message is not provided, so we need to add a description
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);
  if(error) {
    // @ts-expect-error The error message is not provided, so we need to add a description
    console.log(error.message);
  }

  const bounceVariants = {
    initial: { y: 0 },
    animate: {
      marginLeft: ["0%", "85%", "0%"],
      transition: {
        duration: 2,
        ease: 'easeInOut',
        loop: Infinity,
        repeatDelay: 0.5,
      },
    },
  };
  
  return (
    <div>
      <Header />
      <section className="h-max min-h-screen w-screen flex justify-center items-center">
        <div
          className=" grid grid-flow-row px-28 md:grid-cols-2 lg:grid-cols-3 p-10 gap-16 lg:gap-12 w-screen h-max"
          content=""
        >
          {loading
            ? houses.map((house) => (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="h-96 w-full bg-white rounded-xl shadow-2xl flex flex-col"
                  // @ts-expect-error the id will be there when i fetch
                  key={house.id}
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
              ))
            : ["1", "1", "1", "1", "1", "1"].map((user) => (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="h-96 w-full bg-white rounded-xl shadow-2xl flex flex-col"
                  key={user.indexOf(user)}
                >
                  <div className="w-full h-3/6 bg-zinc-300 rounded-t-xl"></div>
                  <div className="w-full h-1/2 rounded-b-xl flex flex-col">
                    <div className="h-16 w-full flex flex-row">
                      <h1 className="w-2/3 h-10 text-2xl lg:text-3xl ml-5 mt-2 font-semibold text-zinc-700">
                        <div className="bg-zinc-300 w-full h-9 rounded-md">
                          <motion.div
                            variants={bounceVariants}
                            initial="initial"
                            animate="animate"
                            className="h-full w-9 bg-zink-blue-zink text-zinc-200 rounded-md"
                          ></motion.div>
                        </div>
                        <div className="text-xs lg:text-sm h-4 lg:h-5 bg-zinc-300 leading-relaxed font-normal my-1 w-full" >
                          <motion.div
                            variants={bounceVariants}
                            initial="initial"
                            animate="animate"
                            className="h-full w-9 bg-zink-blue-zink text-zinc-200 rounded-md"
                          ></motion.div>
                        </div>
                      </h1>
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
                        <div className="text-xs lg:text-sm h-4 lg:h-5 bg-zinc-300 leading-relaxed font-normal my-1 w-full" >
                          <motion.div
                            variants={bounceVariants}
                            initial="initial"
                            animate="animate"
                            className="h-full w-9 bg-zink-blue-zink text-zinc-200 rounded-md"
                          ></motion.div>
                        </div>
                      </div>
                      <div className="h-7 w-[95%] text-zinc-400 flex flex-row">
                        <span className="text-black text-xl mr-2">
                          <IonIcon icon={bedSharp} />
                        </span>
                        <div className="text-xs lg:text-sm h-4 lg:h-5 bg-zinc-300 leading-relaxed font-normal my-1 w-full" >
                          <motion.div
                            variants={bounceVariants}
                            initial="initial"
                            animate="animate"
                            className="h-full w-9 bg-zink-blue-zink text-zinc-200 rounded-md"
                          ></motion.div>
                        </div>
                      </div>
                      <div className="h-7 w-[95%] text-zinc-400 flex flex-row">
                        <span className="text-black text-xl mr-2">
                          <IonIcon icon={bedSharp} />
                        </span>
                        <div className="text-xs lg:text-sm h-4 lg:h-5 bg-zinc-300 leading-relaxed font-normal my-1 w-full" >
                          <motion.div
                            variants={bounceVariants}
                            initial="initial"
                            animate="animate"
                            className="h-full w-3 bg-zink-blue-zink text-zinc-200 rounded-md"
                          ></motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>
      </section>
      <Fonted />
    </div>
  );
}
