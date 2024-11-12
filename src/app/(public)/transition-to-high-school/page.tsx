"use client";
import SupportDonateHelpDesk from "@/components/widgets/SupportDonate";
import Image from "next/image";
import React from "react";

export default function Transition() {
  return (
    <div className="">
      <div className="">
        {/* <div
          style={{
            backgroundImage: "url('/banner/careropp.png')",
            backgroundAttachment: "fixed",
            backgroundSize: "cover", // Add this line for covering the full height
            height: "33vh",
          }}
        ></div> */}
        <div className="relative">
          <Image
            src={"/banner/transition-to-high.jpg"}
            width={1900}
            height={750}
            alt=""
            className="w-full overflow-auto lg:w-[100vw] h-full lg:h-[75vh]"
          />
          <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-5 lg:px-10 py-3 rounded-[35px] bg-white bg-opacity-50 w-fit mx-auto text-black whitespace-nowrap text-xl lg:text-2xl">
            Transition to High School
          </h1>
        </div>
        <div className="h-10 bg-primary "></div>
        <div className="flex mb-20 flex-col justify-center items-center py-7 space-y-5 lg:space-y-12 text-center px-5 lg:px-28">
          <h1
            data-aos="zoom-in"
            className="text-3xl lg:text-4xl mt-2 lg:mt-6 font-bold"
          >
            Transition to High School
          </h1>
          <p data-aos="zoom-in" className="bodyText lg:pb-6">
            Transitioning to high school at iBlossomLearn is a comprehensive and
            enriching journey designed to equip students with both academic and
            emotional tools for success. Our curriculum offers a wide range of
            electives, allowing students to explore their passions and develop
            new skills, ensuring a well-rounded education. The iBlossom Cast
            platform further enhances this experience, providing a creative
            outlet for building confidence through storytelling and expression.
            Additionally, our Social and Emotional Learning (SEL) curriculum
            nurtures students’ social and emotional growth, helping them
            navigate high school challenges with resilience and self-assurance.
            This holistic approach ensures that students are not only
            academically prepared but also emotionally equipped for success in
            high school and beyond. Understanding that the transition to high
            school is a pivotal moment for homeschooling families, iBlossomLearn
            is committed to providing full support. Our experienced counselors
            are dedicated to preparing students for higher education, ensuring
            they are both college and career ready. Through personalized
            academic planning, students receive the guidance they need to
            confidently navigate high school. With a blend of rigorous
            coursework, engaging electives, and opportunities like iBlossom
            Cast, we empower students to excel academically while exploring
            their passions and preparing for a successful future.
          </p>
          {/* <div className="  self-center w-80 mt-6 rounded-3xl p-1 border-2 border-primary">
            <button className="bg-primary p-2 rounded-3xl px-5  text-[12px] lg:text-base text-white  w-full ">
              <p className="text-xl">Ready, Set, Go</p>
            </button>
          </div> */}
        </div>
      </div>
      <SupportDonateHelpDesk />
    </div>
  );
}
