'use client'
import onlineProgramsData from "@/db/programmes";
import React from "react";
import SIngleProgramme from "./SinglePrograme";

const Programmes = () => {
  return (
    <div className="mt-7  container mx-auto ">
      <div className="flex  justify-between gap-3 py-3 px-2">
        <h1 className="text-xl lg:text-3xl text-[#282938] font-[600]">
          Book & Online Programs Grades K-12
        </h1>
        <button className="p-2 text-nowrap border-2 border-primary rounded px-3 font-semibold gap-3 hover:bg-primary hover:text-white">
          Join Now
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 first-letter:">
        {onlineProgramsData?.map((item: any, index: number) => {
          return <SIngleProgramme programme={item} key={index + 1} />;
        })}
      </div>
    </div>
  );
};

export default Programmes;
