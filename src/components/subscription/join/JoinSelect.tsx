"use client";
import { message } from "antd";
import React from "react";

export default function JoinSelect({
  plan,
  setPlan,
  quantity,
  setQuantity,
}: {
  plan: string;
  setPlan: React.Dispatch<React.SetStateAction<string>>;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}) {
  const increasePlanHandler = (value: "increase" | "decrease") => {
    if (value === "increase") {
      setQuantity((q) => q + 1);
    } else if (value === "decrease" && quantity > 1) {
      setQuantity((q) => q - 1);
    } else {
      message.error("Please chose at least 1 plan ");
    }
  };
  return (
    <div className="flex justify-start gap-7">
      {/* Select section */}
      <aside className="">
        <h2 className="text-[1.4rem] text-slate-700 font-normal mt-5 mb-2">
          Choose a Plan
        </h2>
        <div className="flex items-center gap-0 ">
          <button className="w-[9rem] bg-primary h-[48px] border  hover:bg-white hover:text-primary  border-y-2 hover:border-l-2 border-primary  text-center px-7 py-3 text-white font-semibold  rounded-l-[8px]">
            Monthly
          </button>
          <button className="w-[9rem] bg-white text-primary hover:bg-primary h-[48px] border-y-2 border-r-2 border-primary text-center px-7 py-3 hover:text-white font-semibold  rounded-r-[8px]">
            Yearly
          </button>
        </div>
      </aside>

      {/* ?choose number */}

      <aside>
        <h2 className="text-[1.4rem] text-slate-700 font-normal mt-5 mb-2">
          Choose number of children
        </h2>

        <div className="flex items-center">
          <button
            onClick={() => increasePlanHandler("increase")}
            className="min-w-[4rem] h-[3rem] border border-slate-700 hover:bg-primary hover:text-white font-bold text-2xl hover:border-white rounded-sm"
          >
            +
          </button>
          <button className="min-w-[5.5rem] h-[3rem] border border-slate-700 rounded-sm">
            {quantity}
          </button>
          <button
            onClick={() => increasePlanHandler("decrease")}
            className="min-w-[4rem] h-[3rem] border border-slate-700 hover:bg-primary hover:text-white font-bold text-2xl hover:border-white rounded-sm"
          >
            -
          </button>
          <p className="text-[12px] text-grey px-2 ">
            Each additional child is <br /> only $4!
          </p>
        </div>
      </aside>
    </div>
  );
}
