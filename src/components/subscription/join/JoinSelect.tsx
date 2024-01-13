"use client";
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

    
  return (
    <div>
      {/* Select section */}
      <aside className="">
        <h2 className="text-3xl font-normal mt-5">Choose a Plan</h2>
        <div className="flex items-center gap-0 mt-2">
          <button className="w-[9rem] bg-primary h-[48px] border  hover:bg-white hover:text-primary  border-y-2 hover:border-l-2 border-primary  text-center px-7 py-3 text-white font-semibold  rounded-l-[8px]">
            Monthly
          </button>
          <button className="w-[9rem] bg-white text-primary hover:bg-primary h-[48px] border-y-2 border-r-2 border-primary text-center px-7 py-3 hover:text-white font-semibold  rounded-r-[8px]">
            Yearly
          </button>
        </div>
      </aside>
    </div>
  );
}
