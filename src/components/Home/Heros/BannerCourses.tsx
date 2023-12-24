import Image from "next/image";
import React from "react";
import Wave from "../../../../public/banner/wave.png";
import Link from "next/link";

const BannerCourses = () => {
  return (
    <div
      className="wrapper"
      style={{
        backgroundImage: `url('/banner/courses_banner.png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "50vh",
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-start",
      }}
    >
      <div className="flex   uppercase justify-between items-center gap-5 py-7 font-[550]">
        <Link
          className="py-3 px-7 rounded-tl-[20px] rounded-br-[20px] bg-green-500 text-white border-2 border-white"
          href="/login"
        >
          {" "}
          Arts Language
        </Link>
        <Link
          className="py-3 px-7  rounded-tl-[20px] rounded-br-[20px] bg-secondary border-2 border-secondary text-white"
          href="/"
        >
          Mathematic
        </Link>

        <Link
          className="py-3 px-7 rounded-tl-[20px] rounded-br-[20px] bg-[#FACA10] text-white border-2 border-[#FACA10]"
          href="/login"
        >
          Physics
        </Link>
      </div>

      {/* <Image
      
        src="/banner/wave.png"
        className="h-[5rem] w-full  -mt-[10]"
        height={100}
        width={100}
        alt="wave"
      /> */}
    </div>
  );
};

export default BannerCourses;
