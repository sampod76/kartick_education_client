/* eslint-disable react/no-unescaped-entities */
'use client';
import { message } from 'antd';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import SupportDonateHelpDesk from '../widgets/SupportDonate';

const DynamicInput = dynamic(() => import('antd/es/input'), { ssr: false });
export default function CareerOpportunitiesComponents() {
  return (
    <div className="">
      <div className="">
        <Image
          src={'/banner/careropp.png'}
          width={1900}
          height={750}
          alt=""
          className="h-full w-[100vw] lg:h-[70vh]"
        />
        <div className="h-10 bg-primary"></div>
        <div className="space-y-5 px-5 py-7 text-center lg:space-y-12 lg:px-40">
          <h1 className="text-2xl font-bold lg:mt-10 lg:text-4xl">
            Career Opportunities
          </h1>
          <p className="font-bold">
            At iBlossomLearn, we offer exciting career opportunities for those
            passionate about education. We value the expertise and dedication of
            our staff, which is why we provide a competitive salary based on
            experience. Whether you're an educator, curriculum developer, or
            student support specialist, joining our team means contributing to a
            dynamic and innovative learning environment. We are committed lo
            fostering professional growth and providing a supportive community
            where your talents can thrive. If you're ready to make a meaningful
            impact, join us and be part of a community that values excellence,
            creativity, and a commitment to lifelong learning.
          </p>
          <h3 className="lg:pb-6">
            Submit your CV with a cover to{' '}
            <span
              onClick={() => {
                navigator.clipboard.writeText(
                  'hello@iblossomlearn-academy.org',
                );
                message.success('Email copy your clipboard');
              }}
              className="cursor-pointer text-blue-400"
            >
              hello@iblossomlearn-academy.org
            </span>
             
          </h3>
        </div>
        <Image
          src={'/banner/careropp2.png'}
          width={1900}
          height={750}
          alt=""
          className="h-full w-[100vw] lg:h-[90vh]"
        />
      </div>
      <SupportDonateHelpDesk />
    </div>
  );
}
