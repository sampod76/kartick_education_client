import CoursesTab from "@/components/Home/coureses/CoursesTab";
import SupportDonateHelpDesk from "@/components/widgets/SupportDonate";
import Link from "next/link";
import React from "react";

export default function Enroll() {
  return (
    <div>
      <CoursesTab />
      <div className="flex justify-center items-center mb-3 lg:mb-16">
        <Link data-aos="zoom-out" href={"/signup"}>
          <div className="  self-center w-80 mt-6 rounded-3xl p-1 border-2 border-primary">
            <button className="bg-primary p-2 rounded-3xl px-5  text-[12px] lg:text-base text-white  w-full ">
              <p className="text-xl">Register</p>
            </button>
          </div>
        </Link>
      </div>
      <SupportDonateHelpDesk />
    </div>
  );
}
