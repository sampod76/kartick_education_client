'use client';
import BannerSection from '@/components/Home/Banner&hero/BannerSection';
import Footer from '@/components/Home/Footer';

import HomeHeader from '@/components/shared/Headers/HomeHeader';
import HomeLectureSection from '@/components/widgets/HomeLectureSection';
import HomeLinkSection from '@/components/widgets/HomeLinkSection';
import Link from 'next/link';
import { useState } from 'react';

import HoverBook from '@/components/allStyleCss/hoverBook';
import SupportDonateHelpDesk from '@/components/widgets/SupportDonate';
import WelcomeMissionStatement from '@/components/widgets/WelcomeMissionStatement';

// import DonateAndSupportBenner from "@/components/widgets/DonateAndSupportBenner";

const HomePage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleMouseEnter = (cardName: any) => {
    setHoveredCard(cardName);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const banndres = [
    {
      title:
        'We believe that a rigorous academic program combined with a supportive social and emotional curriculum leads to scholars’ success. We believe that this should not only happen in Brick N Mortar settings but also in homes with the support of family members. The iBLossomLearn curriculum reflects the best practices that are associated with such ideals for our scholars, while embracing their diverse backgrounds at every level.',
      image:
        'https://iblossomlearn.s3.us-east-2.amazonaws.com/dashboard/instanction.png',
    },

    {
      title:
        'At iBLossomLearn, we are committed to supporting our homeschoolers and their families. Our Family Engagement Coordinator, Mr. Gilles Konan Kouadio, is here to offer support to parents and caregivers. Along with our Social and Emotional Learning specialist, Ms. Meah Hill, families are supported on issues of mental and social health and/or others as we all work to remove any distractors that could potentially hinder the successful progress of our scholars. Homeschooling already has some challenges; let’s help you transform those challenges into triumphs.',
      image:
        'https://iblossomlearn.s3.us-east-2.amazonaws.com/dashboard/resource.png',
    },
    {
      title:
        'Our team is made up of some incredible people. We are composed of a number of passionate individuals who are dedicated to their work and helping your scholars strive and become successful lifelong learners.',
      image:
        'https://iblossomlearn.s3.us-east-2.amazonaws.com/dashboard/leadership.png',
    },
  ];
  return (
    <div className="shadow-2xl shadow-purple-400">
      <HomeHeader />
      <div className="-mt-[6rem]">
        <BannerSection />
        <div className="container mx-auto h-10 bg-primary"></div>
        <HomeLinkSection />
      </div>
      <div className=" ">
        <WelcomeMissionStatement />
      </div>
      <div className="container mx-auto">
        <div className="my-16 grid h-fit grid-cols-1 gap-12 px-20 *:h-64 lg:hidden lg:grid-cols-3">
          <div
            style={{
              backgroundImage: "url('/banner/s4.jpeg')",
            }}
            className="opacity-120 flex transform items-center justify-center rounded-xl bg-black bg-cover bg-center transition-all duration-500 ease-in-out hover:scale-105"
            onMouseEnter={() => handleMouseEnter('instruction')}
            onMouseLeave={handleMouseLeave}
            data-aos="fade-right"
          >
            <div className="text-center">
              <h5
                className={`absolute inset-0 flex items-center justify-center text-[30px] font-bold transition-opacity duration-500 ease-in-out ${
                  hoveredCard === 'instruction' ? 'opacity-0' : 'opacity-100'
                }`}
              >
                Instruction
              </h5>
              <p
                className={`relative z-10 p-2 text-sm font-bold text-black transition-opacity duration-500 ease-in-out 2xl:text-base ${
                  hoveredCard === 'instruction' ? 'opacity-100' : 'opacity-0'
                }`}
              >
                We believe that a rigorous academic program combined with a
                supportive social and emotional curriculum leads to scholars’
                success. We believe that this should not only happen in Brick N
                Mortar settings but also in homes with the support of family
                members. The iBLossomLearn curriculum reflects the best
                practices that are associated with such ideals for our scholars,
                while embracing their diverse backgrounds at every level.
              </p>
            </div>
          </div>

          <div
            style={{
              backgroundImage: "url('/banner/s2.jpeg')",
            }}
            className="opacity-120 flex transform items-center justify-center rounded-xl bg-black bg-cover bg-center transition-all duration-500 ease-in-out hover:scale-105"
            onMouseEnter={() => handleMouseEnter('resources')}
            onMouseLeave={handleMouseLeave}
          >
            <div data-aos="zoom-in" className="text-center">
              <h5
                className={`absolute inset-0 flex items-center justify-center text-[30px] font-bold transition-opacity duration-500 ease-in-out ${
                  hoveredCard === 'resources' ? 'opacity-0' : 'opacity-100'
                }`}
              >
                Resources
              </h5>
              <p
                className={`relative z-10 p-2 text-sm font-bold text-black transition-opacity duration-500 ease-in-out 2xl:text-base ${
                  hoveredCard === 'resources' ? 'opacity-100' : 'opacity-0'
                }`}
              >
                At iBLossomLearn, we are committed to supporting our
                homeschoolers and their families. Our Family Engagement
                Coordinator, Mr. Gilles Konan Kouadio, is here to offer support
                to parents and caregivers. Along with our Social and Emotional
                Learning specialist, Ms. Meah Hill, families are supported on
                issues of mental and social health and/or others as we all work
                to remove any distractors that could potentially hinder the
                successful progress of our scholars. Homeschooling already has
                some challenges; let’s help you transform those challenges into
                triumphs.
              </p>
            </div>
          </div>

          <div
            style={{
              backgroundImage: "url('/banner/s3.jpeg')",
            }}
            className="opacity-120 flex transform items-center justify-center rounded-xl bg-black bg-cover bg-center transition-all duration-500 ease-in-out hover:scale-105"
            onMouseEnter={() => handleMouseEnter('leadership')}
            onMouseLeave={handleMouseLeave}
            data-aos="fade-left"
          >
            <div className="text-center">
              <h5
                className={`absolute inset-0 flex items-center justify-center text-[30px] font-bold transition-opacity duration-500 ease-in-out ${
                  hoveredCard === 'leadership' ? 'opacity-0' : 'opacity-100'
                }`}
              >
                Leadership
              </h5>
              <p
                className={`relative z-10 p-2 text-sm font-bold text-black transition-opacity duration-500 ease-in-out 2xl:text-base ${
                  hoveredCard === 'leadership' ? 'opacity-100' : 'opacity-0'
                }`}
              >
                Our team is made up of some incredible people. We are composed
                of a number of passionate individuals who are dedicated to their
                work and helping your scholars strive and become successful
                lifelong learners.
              </p>
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <div className="my-16 grid h-fit grid-cols-1 gap-12 px-20 lg:h-80 lg:grid-cols-3">
            {banndres.map((data, i) => {
              return <HoverBook image={data.image} text={data.title} key={i} />;
            })}
          </div>
        </div>
        <div
          className="relative bg-gray-200 bg-cover bg-center bg-no-repeat p-8"
          style={{
            backgroundImage: "url('/banner/Support1.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-5"></div>
          <div className="relative flex flex-col py-12 text-center text-white">
            <h1 data-aos="zoom-in" className="text-4xl font-bold">
              We Need Your Support!
            </h1>
            <h2 data-aos="zoom-in" className="mt-4 text-3xl font-semibold">
              Support Our Scholars—Donate Today
            </h2>
            <p
              data-aos="zoom-in"
              data-aos-duration="1000"
              className="mx-auto mt-6 max-w-7xl text-lg"
            >
              Support iBlossomLearns Mission: Every donation helps us provide
              unparalleled learning opportunities that are crucial for our
              scholars success. Your contribution ensures that all students,
              regardless of their background, can access a transformation
              education that empowers them to excel academically and grow
              personally. Help us build a brighter future by supporting a
              diverse and inclusive educational environment where every child
              can thrive. Donate today to make a lasting impact!
            </p>
            <div
              data-aos="flip-left"
              className="mt-6 w-96 self-center rounded-3xl border-2 border-primary p-1"
            >
              <button className="lg text-sm:2xl:text-base w-full rounded-3xl bg-primary p-2 px-5 text-[12px] text-white">
                <Link href={'/donation'}>Donate</Link>
              </button>
            </div>
          </div>
        </div>
        <SupportDonateHelpDesk />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
