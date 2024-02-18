"use client";
import React, { useEffect, useRef, useState } from "react";
import "./testimonial.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Image } from "antd";
import { CutText } from "@/utils/CutText";

export default function TestimonialMain() {
  const testimonials = [
    {
      details:
        "Opportunity here is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took type scrambled it to make a type specimen book. It has survived not only five centuries,",
      name: "John Doe",
      image: "https://i.ibb.co/J5GHxyX/Ellipse-31.png",
      role: "student",
    },
    {
      details:
        "Best dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took type scrambled it to make a type specimen book. It has survived not only five centuries,",
      name: "Sompad Nath",
      image: "https://i.ibb.co/KqdRK2M/Ellipse-34.png",

      role: "student",
    },
    {
      details:
        "Online dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took type scrambled it to make a type specimen book. It has survived not only five centuries,",
      name: "Joe Smith",
      image: "https://i.ibb.co/VxhHWhd/professional-Side.png",
      role: "student",
    },
    {
      details:
        "Classroom Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took type scrambled it to make a type specimen book. It has survived not only five centuries,",
      name: "Mr. Lorem",
      image: "https://i.ibb.co/JC6DGp4/Ellipse-36.png",
      role: "student",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    // speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "24px",
    className: "center",
    customPaging: (i: any) => {
      const isActive = i === 1; // Check if the current item is centered

      const dotStyle = {
        width: "16px",
        height: "16px",
        borderRadius: "8px",
        backgroundColor: isActive ? "#FB8500" : "rgba(251, 133, 0, 0.5)", // Set opacity for non-active items
        margin: "36px 10px",
        border: "1px white solid",
      };

      return <div style={dotStyle}></div>;
    },
    responsive: [
      {
        breakpoint: 868, // Medium devices and above
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640, // Medium devices and above
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    autoplay: true,
    speed: 800,
    autoplaySpeed: 5000,
    cssEase: "linear",
  };

  return (
    <div className="bg-white my-16 py-[7rem] px-2">
      <div className="container mx-auto ">
        <h2 className="text-2xl  lg:text-3xl text-center text-[#282938] font-[600] mb-[5rem]">
          Explore how <span className="text-secondary">iBlossomLearn </span>{" "}
          supports students and be inspired <br /> by their success stories.
        </h2>
        <Slider {...settings}>
          {testimonials.map((testimonial: any, index) => (
            <div key={testimonial._id || index} className="text-center">
              {/* <img
              className="mx-auto mt-4 rounded-full h-[9rem] w-[9rem]"
              src={testimonial.image}
              alt={`name ${index + 1}`}
            /> */}

              <div className="border-[2px] border-slate-200 h-[14rem] w-[14rem] p-1 mx-auto rounded-full">
                <Image
                  style={{
                    marginInline: "auto",
                    width: "14rem",
                    height: "14rem",
                    borderRadius: "100%",
                  }}
                  // className="mx-auto mt-4 rounded-full h-[9rem] w-[9rem]"
                  src={testimonial.image}
                  alt={`name ${index + 1}`}
                />
              </div>

              <blockquote className="mx-auto mt-3 px-2">
                <p className="text-base lg:text-[16px] text-[#1E1E1E] font-[550] px-2 capitalize">
                  {CutText(testimonial?.details, 154)}
                </p>
                <h2 className="font-bold text-xl lg:text-2xl mt-5">
                  {testimonial?.name} <span className="">| </span>
                  <span className="text-[#1E1E1E] text-[18px]">
                    {testimonial?.role}
                  </span>
                </h2>
                {/* <small>{testimonial.name}</small> */}
              </blockquote>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

// import React from 'react'

// export default function TestimonialMain() {
//   return (
//     <div>TestimonialMain</div>
//   )
// }
