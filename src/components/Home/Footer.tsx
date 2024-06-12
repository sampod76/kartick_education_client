"use client";
import React from "react";
import LinkGroup from "./LinkGroup";
import NavLink from "./NavLink";
import Image from "next/image";
import { AllImage } from "@/assets/AllImge";
import Logo from "../shared/Logo";
import Link from "next/link";
import { Form, message } from "antd";

const Footer = () => {
  const footerNavs = [
    {
      label: "Company",
      items: [
        {
          href: "/",
          name: "Partners",
        },
        {
          href: "/",
          name: "Blog",
        },
        {
          href: "/",
          name: "Team",
        },
        {
          href: "/",
          name: "Careers",
        },
      ],
    },
    {
      label: "Resources",
      items: [
        {
          href: "/contact",
          name: "Contact",
        },
        {
          href: "/",
          name: "Support",
        },
        {
          href: "/",
          name: "Docs",
        },
        {
          href: "/",
          name: "Pricing",
        },
      ],
    },
    {
      label: "About",
      items: [
        {
          href: "/",
          name: "Terms",
        },
        {
          href: "/",
          name: "License",
        },
        {
          href: "/",
          name: "Privacy",
        },
        {
          href: "/",
          name: "About US",
        },
      ],
    },
  ];

  const [form] = Form.useForm();

  const OnSubmit = (values: any) => {
    message.success("successfully subscribe");
    form.resetFields();
  };

  return (
    <div className="w-full bg-[#95c3ff3e] p-4">
      <div className="w-[90%] mx-auto">
        <div className="grid md:grid-cols-5 sm:grid-col-2 gap-10">
          <div className="col-span-2">
            <Logo/>
            <p className="py-6 text-lg px-4">
              iBLossomLearn facilitates individualized instruction. By providing
              a comprehensive K–12 curriculum, personalized support, and
              up-to-date analytics, iBLossomLearn effectively responds to the
              exclusive demands of every learner.
            </p>
          </div>
          {footerNavs.map((item, idx) => (
              <ul className="space-y-4 list-none" key={idx}>
                <h4 className="text-gray-800  font-bold">{item.label}</h4>
                {item.items.map((el, idx) => (
                  <li key={idx}>
                    <Link
                      href={el.href}
                      className="hover:underline hover:text-indigo-600"
                    >
                      {el.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
        </div>
        <div>
          <div className="py-4">
            <h2 className="text-lg font-bold">Newsletter</h2>
            <Form onFinish={OnSubmit} form={form}>
               <div className="max-w-sm flex items-center border rounded-md p-1">
             <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2.5 outline-none"
                />
                <button className="p-2.5 rounded-md text-white bg-[#2a63ff] outline-none shadow-md focus:shadow-none sm:px-5">
                  Subscribe
                </button>
              </div>
            </Form>
          </div>
          <div className="flex justify-between">
            <div>© Ibossomlearn All Rights Reserved</div>
            <div className="flex gap-5">
              <div>Follow Us</div>
              <div>twitter logo</div>
              <div>logo</div>
              <div>logo</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
