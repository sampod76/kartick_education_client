"use client";
import React from "react";
import { Button, Form, Input, message } from "antd";
import { CiLinkedin } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { AiFillTwitterCircle } from "react-icons/ai";
import { IoLogoInstagram } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function SupportDonateHelpDesk() {
  const currnet = usePathname();
 
  return (
    <div className="mx-w-[1990px] mx-auto">
      <div style={{ backgroundColor: "#5373fe" }} className=" text-white p-10 ">
        <div
          className={`${currnet === "/" ? "" : "lg:pl-20"} grid grid-cols-12`}
        >
          <div data-aos="fade-right" className="col-span-12 lg:col-span-7">
            <h2 className="text-xl lg:text-3xl font-bold">
              Support Our Scholars Donate Today !
            </h2>
            <p className="text-sm lg:text-lg mt-2  mx-auto">
              Help us build a brighter future by supporting a diverse and
              inclusive educational environment where every child can thrive.
              Donate today to make a lasting impact!
            </p>
          </div>
          <div data-aos="fade-left" className="col-span-12 lg:col-span-5 mt-6">
            <div className="border-2 border-white rounded-3xl p-1  h-fit w-[80%] mx-auto">
              <button
                type="button"
                className="bg-white w-full p-2 rounded-3xl  text-[12px] lg:text-base text-black "
              >
                <Link href={'/donation'}>Donate</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={` bg-gray-200 py-5 2xl:py-12 grid grid-cols-1 lg:grid-cols-2 2xl:px-16`}
      >
        <div
          data-aos="fade-right"
          className="grid-cols-1 flex justify-center items-center"
        >
          <div className="space-y-2 my-5 lg:my-0">
            <div className="flex justify-center items-center gap-3 ">
              <Link href={"/"}>
                <CiFacebook fontSize={40} />
              </Link>
              <Link href={"/"}>
                <CiLinkedin fontSize={40} />
              </Link>
              <Link href={"/"}>
                <AiFillTwitterCircle fontSize={40} />
              </Link>
              <Link href={"/"}>
                <IoLogoInstagram fontSize={40} />
              </Link>
            </div>
            <p className="font-bold text-xl">Follow Us on Social Media</p>
          </div>
        </div>
        <div
          data-aos="fade-left"
          className="grid-cols-1 text-center bg-[#5373fe] rounded-lg "
        >
          <h2 className="text-3xl font-bold my-6 text-white">Help Desk</h2>
          <form className="max-w-2xl mx-auto  p-6 rounded-lg  text-left">
            <div className="mb-4">
              <Input placeholder="Name" className="w-full p-3 rounded-lg " />
            </div>
            <div className="mb-4">
              <Input
                placeholder="Email"
                type="email"
                className="w-full p-3 rounded-lg "
              />
            </div>
            <div className="mb-4">
              <Input.TextArea
                placeholder="Subject"
                rows={8}
                className="w-full p-3 rounded-lg "
              />
            </div>
            <div className="flex justify-center items-center my-7">
              <div className="border  border-white rounded-3xl p-1  w-8/12">
                <button
                  type="submit"
                  className="bg-white rounded-2xl px-3 border-4 text-[12px] lg:text-base text-black font-semibold border-white w-full"
                >
                  Submit Ticket
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
