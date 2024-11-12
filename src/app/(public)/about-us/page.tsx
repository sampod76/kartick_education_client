/* eslint-disable react/no-unescaped-entities */
import CustomeHero from '@/components/widgets/CustomeHero';
import SupportDonateHelpDesk from '@/components/widgets/SupportDonate';
import Image from 'next/image';

import Link from 'next/link';
import React from 'react';

const AboutUspage = () => {
  return (
    <div className="">
      <div className="">
        <div className="relative">
          <Image
            src={'/banner/about-us.png'}
            width={1900}
            height={750}
            alt=""
            className="h-full w-full overflow-auto bg-cover bg-no-repeat lg:h-[75vh] lg:w-[100vw]"
          />
          <div>
            <h1
              //   data-aos="zoom-out"
              className="absolute left-1/2 top-1/2 mx-auto w-fit -translate-x-1/2 -translate-y-1/2 transform whitespace-nowrap rounded-[35px] bg-white bg-opacity-50 px-5 py-3 text-center text-xl text-black lg:right-1/2 lg:px-16 lg:text-2xl"
            >
              About Us
            </h1>
          </div>
        </div>
        <div className="h-10 bg-primary"></div>
        <div className="mb-20 flex flex-col items-center justify-center space-y-5 px-5 py-7 text-center lg:space-y-12 lg:px-28">
          <h1
            data-aos="zoom-in"
            className="mt-2 text-3xl font-bold lg:mt-6 lg:text-4xl"
          >
            About Us
          </h1>
          <p data-aos="zoom-in" className="bodyText lg:pb-6">
            The story of iBlossomLearn began during the pandemic, when
            educational gaps widen and traditional learning methods were
            challenged. Recognizing the need for a flexible and supportive
            learning environment, Sabah Kunle, with 17 years of classroom
            experience and expertise in curriculum development, founded
            iBlossomLearn. necessary for lifelong success.
          </p>
        </div>
        <div
          // data-aos="zoom-out"
          className="bg-black p-5 py-10 text-start text-white lg:py-24"
        >
          <ul className="list-outside list-disc space-y-5 px-5 text-lg lg:px-28 2xl:text-xl">
            <h1 data-aos="zoom-in">
              Her vision was to create a platform that catered to the diverse
              needs of homeschooling families through six key components:
            </h1>
            <li data-aos="zoom-out" className="">
              <strong>iBlossomLearn Private School:</strong>A top-tier
              institution offering a holistic K-12 curriculum tailored to each
              student's needs.
            </li>
            <li data-aos="zoom-in">
              <strong>Flex Accredited K12:</strong> Through strategic
              partnerships, Sabah made it possible for iBlossomLearn to offer an
              accredited K-12 program. This allows students to earn recognized
              diplomas while learning at their own pace.
            </li>
            <li data-aos="zoom-out">
              <strong>iBlossomLearn Language Institute:</strong> Offering over
              20 languages, this institute immerses students in both language
              and culture, guided by expert professors.
            </li>
            <li data-aos="zoom-in">
              <strong>iBlossom Cast:</strong> A unique platform where students
              access reading materials through podcasts and create their own
              audio stories, fostering creativity and enhancing communication
              skills.
            </li>
            <li data-aos="zoom-out">
              <strong>SEL for Homeschooling Families:</strong>A Social and
              Emotional Learning (SEL) curriculum designed specifically to
              support homeschooling families, helping students develop essential
              life skills alongside academic achievements.
            </li>
            <li data-aos="zoom-in">
              <strong>i-TalkEasi Unlimited:</strong>A program that enhances
              English fluency through structured and open-ended conversations
              with native speakers, building confidence and communication
              skills. This platform is especially beneficial to Adult English
              Language Learners
            </li>
          </ul>
        </div>
        <div data-aos="zoom-out" className="my-10 px-5 lg:my-16 lg:px-28">
          <p className="bodyText text-center">
            With these innovative programs, iBlossomLearn provides a nurturing,
            adaptable learning environment that addresses the academic, social,
            and emotional needs of students, preparing them to thrive in an
            ever-changing world.
          </p>
        </div>
      </div>
      <SupportDonateHelpDesk />
    </div>
  );
};

export default AboutUspage;
