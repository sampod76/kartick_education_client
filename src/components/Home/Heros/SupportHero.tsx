'use client'
import React from "react";
import supportImage from "@/assets/SideImage/supporthero.png";
import Image from "next/image";

const SupportHero = () => {
  return (
    <div className="block lg:flex justify-between text-start my-[5rem] gap-5 container mx-auto px-2 lg:px-7 py-7 lg:py-12 rounded shadow bg-white ">
      <section>
        <h2 className="text-[#31576A]   lg:text-[3.5vw] xl:text-4xl font-[800] uppercase">
          Literacy suppot in <span className="text-secondary">Math</span>
          <br />& <span className="text-secondary">languages arts</span>
        </h2>
        <ul className="text-[#023047E5] text-md lg:text-xl gap-y-3 font-[500] mt-7 list-none">
          <li className="flex items-center my-1 ">
            <span className="bg-secondary rounded-full inline-block w-3 h-3 mr-3"></span>
            Curriculum Packages at Affordable Rates
          </li>
          <li className="flex items-center my-1 ">
            <span className="bg-secondary rounded-full inline-block w-3 h-3 mr-3"></span>
            Literacy-based Curriculum Across Content
          </li>
          <li className="flex items-center my-1 ">
            <span className="bg-secondary rounded-full inline-block w-3 h-3 mr-3"></span>
            Book Program K8
          </li>{" "}
          <li className="flex items-center my-1 ">
            <span className="bg-secondary rounded-full inline-block w-3 h-3 mr-3"></span>
            Writing Support
          </li>{" "}
          <li className="flex items-center my-1 ">
            <span className="bg-secondary rounded-full inline-block w-3 h-3 mr-3"></span>
            Podcasts & Activities for Curious Kids & Their Grown-Ups
          </li>{" "}
          <li className="flex items-center my-1 ">
            <span className="bg-secondary rounded-full inline-block w-3 h-3 mr-3"></span>
            The Learning Arc Free Tutoring for Any Subject K12
          </li>{" "}
          <li className="flex items-center my-1 ">
            <span className="bg-secondary rounded-full inline-block w-3 h-3 mr-3"></span>
            Professional Development for 9-12 and Beyond
          </li>
        </ul>
      </section>
      <section className="mt-5 lg:mt-0">
        <h1 className="text-[#31576A] text-[2vw] md:text-[3vw] xl:text-3xl font-[500]">
          FIND YOU SKILLS PLAN
        </h1>

        <Image
          src={supportImage}
          style={{ marginTop: "10px" }}
          height={332}
          width={570}
          alt="support"
        />
      </section>
    </div>
  );
};

export default SupportHero;
