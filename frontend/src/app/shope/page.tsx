"use client";
import React, { useState } from "react";
import Fonted from "../_auti/fonted";
import Header from "../_auti/header";
import { motion } from "framer-motion";

export default function Page() {
  const word = "pizza";
  const letters: string[] = [];
  const [click1, setclick] = useState<boolean>(false);
  console.log(click1);

  const handleClick = () => {
    setclick(true);
  };

  word.split("").forEach((letter) => {
    letters.push(letter);
  });

  const [surfaceArea, setSurfaceArea] = useState("");
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit1 = async (e: React.FormEvent<HTMLFormElement>) => {
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
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  // console.log(letters);
  return (
    <div>
      <Header />
      <section className="h-screen w-screen flex justify-center items-center">
        {" "}
        <div className="w-full h-full justify-end items-center flex">
          {click1 ? (
            <motion.form
              animate={
                click1 ? { height: 96, width: "66.666666%" } : { scale: 1, rotate: 0 }
              }
              onSubmit={handleSubmit1}
              className="w-2 bg-white shadow-2xl rounded-2xl px-5 py-2 h-2 justify-between items-center flex mx-auto flex-row"
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
                  The&nbsp;prce&nbsp;(DZD):
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
            </motion.form>
          ) : (
            <motion.button
              type="submit"
              className="text-white text-md  cursor-pointer mx-auto select-none  bg-[#0e012d] h-12 w-24 min-w-24 rounded-2xl shadow-md shadow-[#454545] justify-center items-center flex"
              animate={
                click1
                  ? { height: 96, width: "66.66666%", color: "tr" }
                  : { scale: 1, rotate: 0 }
              }
              whileTap={{ scale: 0.75 }}
              onClick={handleClick}
            >
              {letters.map((letter) => (
                <motion.h1
                  animate={{ top: 5 }}
                  className=""
                  key={letters.indexOf(letter)}
                >
                  {letter}
                </motion.h1>
              ))}
            </motion.button>
          )}
        </div>
      </section>
      <Fonted />
    </div>
  );
}
