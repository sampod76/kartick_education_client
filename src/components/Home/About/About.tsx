import Image from "next/image";
import Link from "next/link";
import React from "react";
import aboutImage from "../../../assets/about/homechildred.jpeg";
import aboutCourse2 from "../../../assets/about/Aboutgroup.jpeg";

const About = () => {
  return (
    <div className="w-full">
      <div className="container mx-auto mt-7 flex flex-col gap-4">
        <div className="w-[90%] mx-auto">
          <div className="flex flex-col justify-center items-center">
            <p className="w-fit text-sm md:text-lg  bg-[#fcdbb6] rounded-sm text-[#FB8500]">
              &nbsp;&nbsp; WHO WE ARE? &nbsp;&nbsp;
            </p>
            <h1 className="mt-2 text-3xl">About Us</h1>
          </div>
          <div className="grid md:grid-cols-2 ">
            <div className="flex flex-col gap-5">
              <h1>The Learning Arc</h1>
              <p>
                The Learning Arc Educators are looking for effective, scalable
                and evidence-based strategies to provide academic help to an
                unprecedented number of struggling students, especially in the
                wake of COVID-19. To achieve this goal, and move above the
                limited efficacy of many traditional remediation strategies,
                iBLossoom Learn is utilizing The Learning Arc; non-profit
                platform, to embrace learning acceleration to target unfinished
                learning
              </p>
              <Link
                className="font-bold text-[#FB8500] hover:text-[#c78336]"
                href={"/about"}
              >
                READ MORE
              </Link>
            </div>
            <div className="w-full flex flex-col justify-center items-center md:items-end mx-auto mt-4 md:mt-0">
              <Image className="w-[400px]" alt="" src={aboutImage} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#fb860028] mt-10">
        <div className="w-[90%] mx-auto flex flex-col justify-center items-center gap-5 py-8">
          <h1 className="text-4xl font-sans font-bold">BLOSSOM CAST</h1>
          <p className="text-gray-500">
            Cast.IBLossomLearn Podcasts & Activities for Curious Kids & Their
            Grown-Up
          </p>
          <div className="w-full h-[500px] ">
            <iframe
              src="https://player.vimeo.com/video/547719391?h=5e18ec9b54"
              className="w-full h-full rounded-lg"
              frameBorder="0"
            ></iframe>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
