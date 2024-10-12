import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Contentt() {
  const [isHovred, setIsHovred] = useState(true)
  const [isClicked, setIsClicked] = useState<boolean[]>(
    new Array(5).fill(false)
  );

  const handleClick = (index: number, value: boolean) => {
    setIsClicked((prevIsHovered) => {
      prevIsHovered[index] = value;
      return [...prevIsHovered];
    });
  };
  return (
    <div
      // onMouseEnter={() => setIsHovred(true)}
      // onMouseLeave={() => setIsHovred(false)}
      className="h-full flex w-72 justify-center items-center flex-row"
    >
      <motion.div
        onMouseEnter={() => handleClick(1, true)}
        onMouseLeave={() => handleClick(1, false)}
        whileHover={{ backgroundColor: "#e6e5db" }}
        className="h-10 w-24 select-none cursor-pointer rounded-xl justify-center items-center flex text-black mr-1"
      >
        Sing in
      </motion.div>
      <motion.div
        onMouseEnter={() => handleClick(2, true)}
        onMouseLeave={() => handleClick(2, false)}
        className="bg-red-500 cursor-pointer select-none h-10 w-24 rounded-xl justify-center items-center flex shadow-md shadow-[#454545]"
        whileHover={{ backgroundColor: "black" }}
      >
        Sing up
      </motion.div>
      <AnimatePresence>{isClicked[1] && <Content index={2} />}</AnimatePresence>
      <AnimatePresence>{isClicked[2] && <Content index={1} />}</AnimatePresence>
    </div>
  );
}

const Content = (index: number) => {
  console.log(index)
  return (
    <motion.div
      layout
      id="overlay-content"
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 8,
      }}
      className="absolute right-0 top-14 w-[calc(100%_-_24px)] sm:w-96 rounded-lg border border-neutral-600 bg-white h-96 p-4 mx-3 max-h-[calc(100dvh_-_100px)] overflow-auto"
    >
      <Bridge />
      <Nub />
    </motion.div>
  );
};

const Bridge = () => (
  <div className="absolute -top-[24px] left-0 right-0 h-[24px]" />
);

const Nub = ({}) => {
  return (
    <motion.span
      style={{
        clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)",
      }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="absolute right-3 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border border-neutral-600 bg-white"
    />
  );
};