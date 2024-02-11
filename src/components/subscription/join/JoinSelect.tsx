"use client";
import { message } from "antd";
import React from "react";
import { IPlan } from "./JoinMain";
import { useSearchParams } from "next/navigation";
import { Error_model_hook } from "@/utils/modalHook";

export default function JoinSelect({
  plan,
  setPlan,
  quantity,
  setQuantity,
}: {
  plan: IPlan;
  setPlan: React.Dispatch<React.SetStateAction<IPlan>>;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}) {
  const searchParams = useSearchParams();
  const packName = searchParams.get("pack") as string;

  const planHandler = (value: IPlan) => {

    if (value === "monthly") {
      setPlan("monthly");
    } else if (value === "yearly") {
      setPlan("yearly");
    }
    else {
      setPlan("biannual")
    }
  };
  const quantityHandler = (value: "increase" | "decrease") => {
    if (packName === 'family_personal' && quantity >= 10 && value === "increase") {
      message.info("Select max 10 for Family Pack")
      return
    }
    else if (packName === 'school_teacher' && quantity <= 10 && value === "decrease") {
      message.info("Select min 10 for School Teacher  Pack")
      return
    }
    if (value === "increase") {
      setQuantity((q) => q + 1);
    } else if (value === "decrease" && quantity > 1) {
      setQuantity((q) => q - 1);
    } else {
      Error_model_hook("Please chose at least 1 plan ");
    }
  };

  const activePlan = `w-[9rem] bg-primary h-[48px] border border-2 border-primary  text-center px-7 py-3 text-white font-semibold `;

  const deActivePlane = `w-[9rem] bg-white text-primary h-[48px] border-2 border-primary text-center px-7 py-3  font-semibold `;

  // console.log(plan);
  const quantityInputHandler = (value: number) => {
    if (
      (packName === 'family_personal' && value > 10) ||
      (packName === 'school_teacher' && value < 1)
    ) {
      message.info("Select max 10 for Family Pack");
    } else if (value >= 1) {
      setQuantity(value);
    } else {
      Error_model_hook("Please choose at least 1 plan");
    }
  };

  return (
    <div className="block lg:flex justify-start gap-7 items-center">
      {/* Select section */}
      <aside className="">
        <h2 className="text-[1.4rem] text-slate-700 font-normal mt-5 mb-2">
          Choose a Plan
        </h2>
        <div className="flex items-center gap-0 ">
          <button
            onClick={() => planHandler("monthly")}
            className={`rounded-l-md ${plan === "monthly" ? activePlan : deActivePlane
              }`}
          >
            Monthly
          </button>
          <button
            onClick={() => planHandler("biannual")}
            className={` ${plan === "biannual" ? activePlan : deActivePlane
              } border-x-none`}
          >
            Biannual
          </button>
          <button
            onClick={() => planHandler("yearly")}
            className={`rounded-r-md ${plan === "yearly" ? activePlan : deActivePlane
              }`}
          >
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
            onClick={() => quantityHandler("increase")}
            className="min-w-[4rem] h-[3rem] border border-slate-700 hover:bg-primary hover:text-white font-bold text-2xl hover:border-white rounded-sm"
          >
            +
          </button>
          {/* <button className="min-w-[5.5rem] h-[3rem] border border-slate-700 rounded-sm">
            {quantity}
          </button> */}
          <input
            onChange={(e) => quantityInputHandler(Number(e.target.value))}
            type="number"
            className="w-[7rem] h-[3rem] border border-slate-700 rounded-sm text-center outline-none bg-transparent"
            value={quantity}
          />
          <button
            onClick={() => quantityHandler("decrease")}
            className="min-w-[4rem] h-[3rem] border border-slate-700 hover:bg-primary hover:text-white font-bold text-2xl hover:border-white rounded-sm"
          >
            -
          </button>
          <p className="text-[12px] text-grey px-2 ">
            Each additional child is <br /> willbe increase
          </p>
        </div>
      </aside>
    </div>
  );
}
