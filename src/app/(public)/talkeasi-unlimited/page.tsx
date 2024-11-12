'use client';
import SupportDonateHelpDesk from '@/components/widgets/SupportDonate';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function TalkeasiUnlimited() {
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
            src={'/banner/careropp3.png'}
            width={1900}
            height={750}
            alt=""
            className="h-full w-full overflow-auto lg:h-[50vh] lg:w-[100vw]"
          />
          <h1 className="absolute left-1/2 top-1/2 mx-auto w-fit -translate-x-1/2 -translate-y-1/2 transform whitespace-nowrap rounded-[35px] bg-white bg-opacity-50 px-5 py-3 text-xl text-black lg:px-10 lg:text-2xl">
            i-TalkEasi Unlimited
          </h1>
        </div>
        <div className="h-10 bg-primary"></div>
        <div className="mb-20 flex flex-col items-center justify-center space-y-5 px-5 py-7 text-center lg:space-y-12 lg:px-28">
          <h1
            data-aos="zoom-in"
            className="mt-2 text-3xl font-bold lg:mt-6 lg:text-4xl"
          >
            i-TalkEasi Unlimited
          </h1>
          <p data-aos="zoom-in" className="bodyText lg:pb-6">
            i-TalkEasi Unlimited is a dynamic program designed to enhance
            English fluency for non-native speakers through immersive and
            engaging conversations. The program offers a flexible approach,
            starting with open-ended discussions that build foundational
            language skills. As participants progress, they transition to more
            structured conversations, focusing on specific topics to test and
            reinforce their fluency. Led by native English speakers, i-TalkEasi
            Unlimited provides a supportive environment where students can
            practice and improve their speaking abilities, gaining confidence
            and proficiency in real-world communication.
          </p>
          <div className="mt-6 w-80 self-center rounded-3xl border-2 border-primary p-1">
            <Link href={'https://forms.gle/o9zrFTfqqXsR4V7C7'}>
              <button className="w-full rounded-3xl bg-primary p-2 px-5 text-[12px] text-white lg:text-base">
                <p className="text-xl">Ready, Set, Go</p>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <SupportDonateHelpDesk />
    </div>
  );
}
