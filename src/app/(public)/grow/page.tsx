/* eslint-disable react/no-unescaped-entities */
'use client';
import MeetCard from '@/components/shared/MeetCard';
import SupportDonateHelpDesk from '@/components/widgets/SupportDonate';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Leadership() {
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
            src={'/banner/grow.png'}
            width={1900}
            height={750}
            alt=""
            className="h-full w-full overflow-auto lg:h-[75vh] lg:w-[100vw]"
          />
          <h1 className="absolute left-1/2 top-1/2 mx-auto w-fit -translate-x-1/2 -translate-y-1/2 transform whitespace-nowrap rounded-[35px] bg-white bg-opacity-50 px-5 py-3 text-xl text-black lg:px-20 lg:text-2xl">
            Grow
          </h1>
        </div>
        <div className="h-10 bg-primary"></div>
        <div className="mb-20 flex flex-col items-center justify-center space-y-5 px-5 py-7 text-center lg:space-y-12 lg:px-28">
          <h1
            data-aos="zoom-in"
            className="mt-2 text-3xl font-bold lg:mt-6 lg:text-4xl"
          >
            Grow with iBlossomLearn
          </h1>
          <p data-aos="zoom-in" className="bodyText lg:pb-6">
            At iBlossomLearn, we believe that growth goes beyond academics—it's
            about nurturing the whole child. Our program is designed to support
            your child's development in all areas, including intellectual,
            social, and emotional growth. Through our comprehensive curriculum,
            your child will build a strong foundation in core subjects while
            exploring their passions through a variety of electives and
            extracurricular activities. We encourage curiosity, creativity, and
            critical thinking, helping students to grow into well-rounded
            individuals.
          </p>

          <p data-aos="zoom-in" className="bodyText -mt-4 lg:pb-6">
            In addition to academic learning, our Social and Emotional Learning
            (SEL) curriculum plays a crucial role in fostering emotional
            resilience and social awareness. By participating in programs like
            iBlossom Cast and engaging in hands-on projects, students gain
            confidence, improve communication skills, and learn to work
            collaboratively with others. The support provided by The Learning
            Arc further ensures that every student receives personalized
            guidance and tutoring, allowing them to overcome challenges and
            thrive in their educational journey. At iBlossomLearn, your child's
            growth is our priority, and we're committed to helping them reach
            their full potential.
          </p>
          <Link
            href={'https://forms.gle/K3xoLk3cTUfohn9X8'}
            data-aos="zoom-out"
            className="mt-6 w-80 self-center rounded-3xl border-2 border-primary p-1"
          >
            <button className="w-full rounded-3xl bg-primary p-2 px-5 text-[12px] text-white lg:text-base">
              <p className="text-xl">Ready, Set, Go</p>
            </button>
          </Link>
        </div>
      </div>
      <SupportDonateHelpDesk />
    </div>
  );
}
