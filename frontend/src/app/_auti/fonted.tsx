import React from 'react'

export default function Fonted() {
  return (
    <section
      className="w-screen h-full lg:h-96 bg-slate-500 p-5 lg:p-10 grid grid-flow-row px-28 grid-cols-1 lg:grid-cols-4 gap-16 lg:gap-12"
      content=" "
    >
      <div className="h-full w-full flex flex-col justify-center">
        <div className="h-max w-48 flex justify-center items-center flex-row">
          <div className="h-12 w-12 bg-logo"></div>
          <span className="text-[#0e012d] font-semibold text-xl protest-strike-regular">
            Restate
          </span>
        </div>
        <span className="text-blue-950 my-5">
          {" "}
          some bla bla abiut choosing us for your buying and stoll your mony i
          mean give you the best choise what did you mean i will not do that
          aver are u{" "}
        </span>
      </div>
      <div className="h-full w-full bg-white flex flex-col"></div>
      <div className="h-full w-full bg-white flex flex-col"></div>
      <div className="h-full w-full bg-white flex flex-col"></div>
    </section>
  );
}
