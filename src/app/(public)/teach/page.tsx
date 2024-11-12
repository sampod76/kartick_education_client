/* eslint-disable react/no-unescaped-entities */
'use client';
import Image from 'next/image';
import React from 'react';
import dynamic from 'next/dynamic';
import SupportDonateHelpDesk from '@/components/widgets/SupportDonate';
import Link from 'next/link';

const DynamicInput = dynamic(() => import('antd/es/input'), { ssr: false });
export default function CareerOpportunitiesComponents() {
  return (
    <div className="">
      <div className="">
        <div className="relative">
          <Image
            src={'/banner/teach.png'}
            width={1900}
            height={750}
            alt=""
            className="h-full w-full overflow-auto lg:h-[50vh] lg:w-[100vw]"
          />
          <div>
            <h1
              //   data-aos="zoom-out"
              className="absolute left-1/2 top-1/2 mx-auto w-fit -translate-x-1/2 -translate-y-1/2 transform whitespace-nowrap rounded-[35px] bg-white bg-opacity-50 px-5 py-3 text-center text-xl text-black lg:px-16 lg:text-2xl"
            >
              Teach
            </h1>
          </div>
        </div>
        <div className="h-10 bg-primary"></div>
        <div className="mb-20 flex flex-col items-center justify-center space-y-5 px-5 py-7 text-center lg:px-28">
          <h1 data-aos="zoom-in" className="bodyHeaderText mt-2 lg:mt-6">
            Teach with iBlossomLearn
          </h1>
          <p data-aos="zoom-in" className="bodyText lg:pb-6">
            At iBlossomLearn, we understand that your child's education is a top
            priority, and we're committed to supporting your family every step
            of the way. Our "Teach" page is designed with parents and educators
            in mind, offering a treasure trove of resources to help you deliver
            the best possible education for your child. We provide access to
            carefully curated teaching materials, lesson plans, and
            instructional guides that make learning engaging and comprehensive.
            Beyond resources, we believe in empowering our educators with
            ongoing professional development opportunities. Through workshops,
            webinars, and training programs, we ensure that those guiding your
            child's education are equipped with the latest strategies and tools.
          </p>
          <p data-aos="zoom-out" className="bodyText lg:pb-6">
            At iBlossomLearn, teaching is more than just instruction—it's about
            building a community of passionate educators and parents who share
            the same commitment to nurturing every student's potential. We
            invite you to join our supportive community, where ideas are
            exchanged, challenges are met with solutions, and successes are
            celebrated. Together, let's create an educational journey that truly
            supports your child’s growth, academically and personally.
          </p>

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
      <SupportDonateHelpDesk />
    </div>
  );
}
