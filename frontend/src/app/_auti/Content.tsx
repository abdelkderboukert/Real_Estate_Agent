import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Contentt() {
  
  
  const [isHovred, setIsHovred] = useState(true)
  // const [isClicked, setIsClicked] = useState<boolean[]>(
  //   new Array(5).fill(false)
  // );
  const [isClicked, setIsClicked] = useState<boolean>(false);

  // const handleClick = (index: number, value: boolean) => {
  //   setIsClicked((prevIsHovered) => {
  //     prevIsHovered[index] = value;
  //     return [...prevIsHovered];
  //   });
  // };
  const handleClick = (value: boolean) => {
    console.log(value)
    setIsClicked(value);
  };

  return (
    <div
      // onMouseEnter={() => setIsHovred(true)}
      // onMouseLeave={() => setIsHovred(false)}
      className=" flex w-72 justify-center items-center flex-row h-max"
    >
      <motion.div
        // onMouseEnter={() => handleClick(1, true)}
        // onMouseLeave={() => handleClick(1, false)}
        onClick={() => handleClick(true)}
        whileHover={{ backgroundColor: "#e6e5db" }}
        className="h-10 w-24 select-none cursor-pointer rounded-xl justify-center items-center flex text-black mr-1"
      >
        Sing in
      </motion.div>
      <motion.div
        // onMouseEnter={() => handleClick(2, true)}
        // onMouseLeave={() => handleClick(2, false)}
        onClick={() => handleClick(true)}
        className="bg-red-500 cursor-pointer select-none h-10 w-24 rounded-xl justify-center items-center flex shadow-md shadow-[#454545]"
        whileHover={{ backgroundColor: "black" }}
      >
        Sing up
      </motion.div>
      <AnimatePresence>
        {/* {isClicked[1] && isHovred && (
          <Content index={2} />
        )} */}
        {isClicked && isHovred && (
          <Content index={2} onButtonClick={handleClick} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {/* {isClicked[2] && isHovred && (
          <Content index={1} />
        )} */}
        {isClicked && isHovred && (
          <Content index={1} onButtonClick={handleClick} />
        )}
      </AnimatePresence>
    </div>
  );
}

interface ContentProps {
  index: number;
  onButtonClick: (value: boolean) => void;
}

const Content = ({ index, onButtonClick }: ContentProps) => {
  interface User {
    email: string;
    password: string;
  }

  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("handleChange1 called with:", event.target.value);
    setUser({
      ...user,
      [event.target.name]: event.target.value as string,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);
    // Do something with the form data, such as sending it to a server
  };

  console.log(index);
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
      className="absolute right-0 top-14 w-[calc(100%_-_24px)] sm:w-96 rounded-3xl border bg-white h-max p-4 mx-3 max-h-[calc(100dvh_-_100px)] overflow-auto z-50"
    >
      <Bridge />
      <Nub />
      <motion.div
        // initial={{ y: 48, opacity: 0 }}
        // whileInView={{ y: 0, opacity: 1 }}
        // transition={{ ease: "easeInOut", duration: 0.75 }}
        className="mb-10 w-full flex flex-col p-5"
      >
        <div
          className=" absolute h-10 w-10 text-4xl flex justify-center items-center text-black top-3 right-2 rounded-md hover:bg-zinc-50 "
          onClick={() => onButtonClick(false)}
        >
          <ion-icon name="close-outline"></ion-icon>
        </div>
        <h1 className="text-2xl text-[#0e012d]">Log in or sing up</h1>
        <h2 className="text-zinc-400">Get started for free</h2>
        <br />
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="flex w-full h-10 border-zinc-200 border rounded-lg justify-center items-center text-black"
        >
          {" "}
          <div className="w-5 h-5 mr-2 bg-p6"></div>Continue with Google
        </motion.button>
        <hr className="w-full bg-zinc-200 mt-6" />
        <div className=" relative flex mx-auto justify-center items-center -top-4 w-14 h-7 text-black p-2 bg-white">
          or
        </div>
        <form className="w-full h-max flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="email" className="text-zinc-400 text-base">
            {" "}
            Work email
          </label>
          <input
            type="email"
            name="email"
            id=""
            className="h-10 w-full bg-gray-50 rounded-lg p-2 placeholder:text-zinc-200 placeholder:text"
            placeholder="Your work email"
            onChange={handleChange}
          />
          <label htmlFor="password" className="text-zinc-400 text-base mt-3">
            {" "}
            Verification code
          </label>
          <input
            type="password"
            name="password"
            id=""
            className="h-10 w-full bg-gray-50 rounded-lg p-2 placeholder:text-zinc-200 placeholder:text"
            placeholder="Paste sing up code"
            onChange={handleChange}
          />
          <span className="text-zinc-300 text-sm mb-3">
            We sent verification code to your inbox.&nbsp;{" "}
            <span className="text-[#0e012d]">Resend</span>
          </span>
          <button
            type="submit"
            className="h-10 w-full flex items-center justify-center bg-[#0e012d] text-white rounded-lg mb-5"
          >
            Continue
          </button>
          <span className="text-zinc-300 text-sm">
            By clicking &#34;Continue with Google / Email&#34; you agree to our{" "}
            <a href="" className="">
              Teams of Service
            </a>{" "}
            and{" "}
            <a href="" className="">
              Policy
            </a>
          </span>
        </form>
      </motion.div>
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