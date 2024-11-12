/* eslint-disable react/no-unescaped-entities */
'use client';
import Image from 'next/image';
import React from 'react';
import dynamic from 'next/dynamic';
import SupportDonateHelpDesk from '@/components/widgets/SupportDonate';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { getBaseUrl } from '@/helpers/config/envConfig';
import Link from 'next/link';
const DynamicInput = dynamic(() => import('antd/es/input'), { ssr: false });
export default function CareerOpportunitiesComponents() {
  return (
    <div className="">
      <div className="">
        <div className="relative">
          <Image
            src={'/CastHero.png'}
            width={1900}
            height={750}
            alt=""
            className="h-full w-full overflow-auto lg:h-[65vh] lg:w-[100vw]"
          />
          <div>
            <h1
              //   data-aos="zoom-out"
              className="absolute left-1/2 top-1/2 mx-auto w-fit -translate-x-1/2 -translate-y-1/2 transform whitespace-nowrap rounded-[35px] bg-white bg-opacity-50 px-5 py-3 text-center text-xl text-black lg:px-16 lg:text-2xl"
            >
              IBLossom Cast
            </h1>
          </div>
        </div>
        <div className="h-10 bg-primary"></div>
        <div className="mb-20 flex flex-col items-center justify-center space-y-5 px-5 py-7 text-center lg:space-y-8 lg:px-28 lg:text-xl">
          <h1 data-aos="zoom-in" className="bodyHeaderText mt-2 lg:mt-6">
            IBLossom Cast
          </h1>
          <p data-aos="zoom-in" className="bodyText lg:pb-2">
            IBlossom Cast is an innovative platform at iBlossomLearn designed to
            enhance students' creative expression and communication skills.
            Through iBlossom Cast, students can create and share their own
            podcasts, allowing them to explore storytelling, build confidence,
            and engage with diverse topics in a unique format. This platform
            also provides an opportunity for students to listen to educational
            content on the go, making learning more flexible and accessible.
            iBlossom Cast fosters a sense of community as students collaborate
            on projects, developing teamwork and enhancing their digital
            literacy skills.
          </p>
          <div data-aos="zoom-out" className="bodyText lg:pb-2">
            Download the Free Audio Tool:
            <br />
            <Link
              href={'http://audacityteam.org/download'}
              className="cursor-pointer text-center text-[16px] text-blue-500"
            >
              (Download audacity)
            </Link>
            <div className="mx-auto mt-2 flex max-w-[400px] justify-center">
              {/* <audio crossOrigin="anonymous" controls>
                <source
                  src={
                    getBaseUrl() + '/paly-audio/' + 'audio-5456646456454.mp3'
                  }
                  type="audio/ogg"
                />
              </audio> */}
              <AudioPlayer
                autoPlay={false}
                // src={getBaseUrl() + '/paly-audio/' + 'audio-5456646456454.mp3'}
                src={
                  'https://iblossomlearn.s3.us-east-2.amazonaws.com/audios/audio-5456646456454.mp3'
                }
                // onPlay={e => console.log("onPlay")}
                crossOrigin="anonymous"
                preload="auto"
                // onLoadedMetaData={}
                // other props here
              />
            </div>
            <br />{' '}
            <span className="">
              Audacity. Follow the link below. For creating podcasts, a great
              free audio tool is Audacity. It's an open-source audio recording
              and editing software that is perfect for beginners and experienced
              users alike. You can download it for free from audacityteam.org.
              Audacity offers a range of features that make it easy to record,
              edit, and produce high-quality audio for podcasts.
            </span>
          </div>
          <p data-aos="zoom-in" className="bodyText lg:pb-2">
            Students at iBlossomLearn can easily access this free podcasting
            tool, Audacity, by visiting audacityteam.org. From there, they can
            download the software directly to their computers. Once installed,
            students can use Audacity to record, edit, and produce their
            podcasts as part of their iBlossom Cast projects. This tool,
            combined with the guidance provided through iBlossomLearn, empowers
            students to create high-quality audio content and develop their
            storytelling and communication skills.
          </p>
          <Link
            href={
              'https://docs.google.com/forms/d/e/1FAIpQLScPZDeLe5XJPpVQMWf6fcET6Y_FhzC97JKbRc_UwOq6-wGfFg/viewform'
            }
          >
            <div
              data-aos="zoom-out"
              className="mt-6 w-80 self-center rounded-3xl border-2 border-primary p-1"
            >
              <button className="w-full rounded-3xl bg-primary p-2 px-5 text-[12px] text-white lg:text-base">
                <p className="text-xl">Ready, Set, Create</p>
              </button>
            </div>
          </Link>
        </div>
      </div>
      <SupportDonateHelpDesk />
    </div>
  );
}
