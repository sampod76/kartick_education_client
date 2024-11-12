/* eslint-disable react/no-unescaped-entities */
'use client';
import SupportDonateHelpDesk from '@/components/widgets/SupportDonate';
import Image from 'next/image';
import Link from 'next/link';

export default function Enroll() {
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
            src={'/languageInstitute.jpeg'}
            width={1900}
            height={750}
            alt=""
            className="h-full w-full overflow-auto lg:h-[50vh] lg:w-[100vw]"
          />
          <h1 className="absolute left-1/2 top-1/2 mx-auto w-fit -translate-x-1/2 -translate-y-1/2 transform whitespace-nowrap rounded-[35px] bg-white bg-opacity-50 px-5 py-3 text-xl text-black lg:px-10 lg:text-2xl">
            iBLossomLearn Language Institute
          </h1>
        </div>
        <div className="h-10 bg-primary"></div>
        <div className="mb-20 flex flex-col items-center justify-center space-y-5 px-5 py-7 text-center lg:space-y-12 lg:px-28">
          <h1 data-aos="zoom-in" className="bodyHeaderText mt-2 lg:mt-6">
            iBLossomLearn Language Institute
          </h1>
          <p data-aos="zoom-in" className="bodyText lg:pb-6">
            Welcome to the iBlossomLearn Language Institute, where we open doors
            to global communication and cultural understanding. Our institute
            offers a diverse range of language courses designed to meet the
            needs of students at all levels, from beginners to advanced
            speakers. Whether you're looking to master a new language for
            travel, business, or personal enrichment, our comprehensive programs
            provide the tools and support you need to succeed. At iBlossomLearn
            Language Institute, we believe in immersive and interactive learning
            experiences. Our certified instructors bring a wealth of knowledge
            and cultural insights, ensuring that language acquisition is both
            effective and engaging. Through a combination of live virtual
            classes, interactive exercises, and multimedia resources, students
            are able to develop their speaking, listening, reading, and writing
            skills in a supportive and dynamic environment. Our programs are
            designed with flexibility in mind, allowing students to learn at
            their own pace and fit their studies into their busy schedules. From
            children to adults, our courses cater to all age groups, making
            language learning a family-friendly endeavor. Join us at
            iBlossomLearn Language Institute and embark on a journey to
            linguistic fluency and cultural appreciation.
          </p>
          <div className="mt-6 w-80 self-center rounded-3xl border-2 border-primary p-1">
            <Link
              href={
                'https://docs.google.com/forms/d/e/1FAIpQLSfQ3WxDWBcjxd19HfVQ8R4lOIi1_zK9WBguK7l3S95epsg45g/viewform'
              }
              target="_blank"
            >
              <button className="w-full rounded-3xl bg-primary p-2 px-5 text-[12px] text-white lg:text-base">
                <p className="text-xl">Ready, Set, Go</p>
              </button>
            </Link>
          </div>
          <p data-aos="zoom-in" className="bodyText lg:pb-6">
            With over 20 different languages currently available—and new
            languages being added by demand—our program provides an
            ever-expanding opportunity for linguistic and cultural immersion.
            Our courses are taught by university professors who bring their
            expertise and passion for teaching to every lesson, ensuring
            students gain not only language proficiency but also a deep
            understanding of the culture associated with each language. This
            immersive approach helps students build both communication skills
            and cultural appreciation, preparing them for global interactions.
          </p>
          {/* <div className="mt-3 lg:mt-10 space-y-4">
            <h1 className="text-xl lg:text-3xl">
              A form will be created for students to choose the language course
              they want
            </h1>
            <h1 className="text-xl lg:text-2xl text-red-500">
              ((form will be here when create))
            </h1>
          </div> */}
        </div>
      </div>
      <SupportDonateHelpDesk />
    </div>
  );
}
