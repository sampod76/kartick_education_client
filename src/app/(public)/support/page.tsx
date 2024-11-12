/* eslint-disable react/no-unescaped-entities */
'use client';
import SupportDonateHelpDesk from '@/components/widgets/SupportDonate';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function BoardOfTrustees() {
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
            src={'/banner/support.png'}
            width={1900}
            height={750}
            alt=""
            className="h-full w-full overflow-auto lg:h-[60vh] lg:w-[100vw]"
          />
          <h1 className="absolute left-1/2 top-1/2 mx-auto w-fit -translate-x-1/2 -translate-y-1/2 transform whitespace-nowrap rounded-[35px] bg-white bg-opacity-60 px-5 py-3 text-xl text-black lg:px-20 lg:text-2xl">
            Support
          </h1>
        </div>
        <div className="h-10 bg-primary"></div>
        <div className="mb-20 flex flex-col items-center justify-center space-y-5 px-5 py-7 text-center lg:space-y-12 lg:px-28">
          <h1
            data-aos="zoom-in"
            className="mt-2 text-3xl font-bold lg:mt-6 lg:text-5xl"
          >
            Support with iBlossomLearn
          </h1>
          <p data-aos="zoom-in" className="bodyText lg:pb-6">
            At iBlossomLearn, we understand that homeschooling can be both
            rewarding and challenging, which is why we're dedicated to offering
            comprehensive support tailored to your family's needs. Our "Support"
            page is your go-to resource for expert advice, practical tools, and
            a strong community to help guide you through your child’s
            educational journey. With the addition of The Learning Arc, our free
            tutoring platform, your child receives personalized academic support
            from experienced educators. Combined with our resources, this
            ensures that every learner is on the path to success. Together,
            we'll help your child thrive.
          </p>
        </div>
        <div>
          <div className="space-y-2 bg-black px-5 py-4 text-white lg:px-20 lg:py-10">
            <div className="mx-auto mt-4 space-y-1 px-5 text-lg lg:max-w-[1200px] lg:px-0">
              <h1 className="text-center text-2xl lg:text-4xl">
                These are some areas of support to our homeschooling families:
              </h1>
              <p data-aos="zoom-out">
                <strong>Technical Support:</strong> Guidance on navigating
                iBlossomLearn’s platforms, troubleshooting common issues, and
                ensuring smooth access to online resources.
              </p>
              <p data-aos="zoom-in">
                <strong>Academic Support:</strong> Access to tutoring services,
                study guides, and tips for parents on how to support their
                child’s learning at home.
              </p>
              <p data-aos="zoom-out">
                <strong>Counseling Services:</strong>Emotional and social
                support through counseling, helping students and families manage
                stress, anxiety, and the challenges of homeschooling.
              </p>
              <p data-aos="zoom-in">
                <strong>Parent Workshops:</strong> Regular workshops on topics
                like time management, creating effective learning environments,
                and balancing homeschooling with family life.
              </p>
              <p data-aos="zoom-out">
                <strong>Community Outreach Officer:</strong> Connects the school
                with the broader community and fosters relationships with
                external stakeholders.
              </p>
              <p data-aos="zoom-in">
                <strong>Community Forums: </strong>A space where parents and
                educators can connect, share experiences, ask questions, and
                support one another.
              </p>
            </div>
            <div
              style={{ marginTop: '2rem', marginBottom: '2rem' }}
              className="my-5 flex items-center justify-center lg:my-20"
            >
              <Link
                href={
                  'https://docs.google.com/document/d/1wmSZS2a_7naQZb2KyQfGbtE7yU75sZzwlj2OOdJrXco/edit?pli=1&disco=AAABWP-y2ro'
                }
                data-aos="zoom-out"
                className="mt-6 w-80 self-center rounded-3xl border-2 border-primary p-1"
              >
                <button className="w-full rounded-3xl bg-primary p-2 px-5 text-[12px] text-white lg:text-base">
                  <p className="text-xl">Ready, Set, Go</p>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <SupportDonateHelpDesk />
    </div>
  );
}
