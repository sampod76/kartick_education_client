import CustomeHero from '@/components/widgets/CustomeHero';
import SupportDonateHelpDesk from '@/components/widgets/SupportDonate';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <div className="">
      <div className="">
        <div className="relative">
          <Image
            src={'/flexBanner.jpeg'}
            width={1900}
            height={750}
            alt=""
            className="mx-auto h-full w-full overflow-auto lg:h-[75vh] lg:w-[100vw]"
          />
          <div>
            <h1
              //   data-aos="zoom-out"
              className="absolute left-1/2 top-1/2 mx-auto w-fit -translate-x-1/2 -translate-y-1/2 transform whitespace-nowrap rounded-[35px] bg-white bg-opacity-50 px-5 py-3 text-center text-xl text-black lg:px-14 lg:text-2xl"
            >
              Flex Accredited K12
            </h1>
          </div>
        </div>
        <div className="h-10 bg-primary"></div>
        <div className="mb-20 space-y-5 px-5 py-7 text-center lg:px-40">
          <h1
            //data-aos="zoom-in"
            className="bodyHeaderText mt-2 lg:mt-6"
          >
            Flex Accredited K12
          </h1>
          <p data-aos="zoom-in" className="bodyText lg:pb-6">
            {
              'Flex Education is an excellent approach to homeschool independently. It offers a flexible, personalized learning experience that allows students to progress at their own pace while receiving comprehensive support tailored to their individual needs.'
            }
            {
              'At iBlossomLearn, we provide K-12 learners with an accredited core curriculum ensuring all educational bases are covered. Our self-paced classes allow your child to progress at their own speed, whether fast or slow. In addition to our affordable core program, we offer various electives and language courses as add-ons at a low cost. Students earn their high school diploma upon completion, which serves as proof of their eligibility to attend college or pursue another area of study.'
            }
            {
              "We partner with parents to support the unique homeschooling journey, whether it's traditional homeschooling, roadschooling, worldschooling, unschooling, eclectic homeschooling, classical homeschooling, Montessori homeschooling, or homeschooling with unit studies. iBlossomLearn Flex  ensures a personalized and flexible educational experience for your child."
            }
          </p>
          <div className="mb-3 flex items-center justify-center">
            <Link
              href={'https://forms.gle/o9zrFTfqqXsR4V7C7'}
              className="w-fit rounded-3xl border-2 border-primary p-1 text-lg text-white"
            >
              <button className="rounded-3xl bg-primary p-1 px-12">
                iBLossomLearn Flex K12
              </button>
            </Link>
          </div>

          <p data-aos="zoom-in" className="bodyText mt-3 lg:pb-6">
            {
              'Perfect for Traveling Students Stay on top of your young learner’s core classes, electives, and state testing while traveling anywhere in the USA or around the world. All you need is access to our curriculum.'
            }
            {
              'Ideal for Unschoolers iBlossomLearn provides engaging courses that keep your child ready to learn more, while allowing their educational passion to shine. Our electives cater to your child’s unique learning path.'
            }
          </p>
        </div>
        <div className="-mt-16 flex flex-col items-center">
          <div className="w-full bg-black text-white">
            <div className="container mx-auto py-6 lg:py-12">
              <div className="flex flex-wrap items-center justify-around gap-3">
                <div className="w-fit rounded-3xl border-2 border-primary p-1 text-lg text-white">
                  <button className="rounded-3xl bg-primary p-1 px-12">
                    <Link href={'/word-wonders'}>iblossom Word wonders</Link>
                  </button>
                </div>
                <div className="w-fit rounded-3xl border-2 border-primary p-1 text-lg text-white">
                  <button className="rounded-3xl bg-primary p-1 px-12">
                    <Link href={'/comprehensive'}>iblossom Comprehensive</Link>
                  </button>
                </div>
                <div className="w-fit rounded-3xl border-2 border-primary p-1 text-lg text-white">
                  <button className="rounded-3xl bg-primary p-1 px-12">
                    <Link href={'/essential-pathways'}>
                      iblossom Essential Pathways
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SupportDonateHelpDesk />
    </div>
  );
};

export default page;

/* 
<div>
      <CustomeHero title={"Flex Accredited K12"} image={"/flexBanner.jpeg"} />
      <div className="sm:container mx-auto py-[30px] p-2 font-semibold font-serif">
        <p className="leading-8 text-center">
          {
            "Flex Education is an excellent approach to homeschool independently. It offers a flexible, personalized learning experience that allows students to progress at their own pace while receiving comprehensive support tailored to their individual needs."
          }
          {
            "At iBlossomLearn, we provide K-12 learners with an accredited core curriculum ensuring all educational bases are covered. Our self-paced classes allow your child to progress at their own speed, whether fast or slow. In addition to our affordable core program, we offer various electives and language courses as add-ons at a low cost. Students earn their high school diploma upon completion, which serves as proof of their eligibility to attend college or pursue another area of study."
          }
          {
            "We partner with parents to support the unique homeschooling journey, whether it's traditional homeschooling, roadschooling, worldschooling, unschooling, eclectic homeschooling, classical homeschooling, Montessori homeschooling, or homeschooling with unit studies. iBlossomLearn Flex  ensures a personalized and flexible educational experience for your child."
          }
        </p>
      </div>
      <div className="flex flex-col items-center">
        <div className="p-1 text-lg  text-white border-2 border-primary w-fit rounded-3xl">
          <button className="bg-primary p-1 px-12 rounded-3xl">
            iBLossomLearn Flex K12
          </button>
        </div>
        <div className="sm:container mx-auto py-[30px] p-2 font-semibold font-serif">
          <p className="leading-8 text-center">
            {
              "Perfect for Traveling Students Stay on top of your young learner’s core classes, electives, and state testing while traveling anywhere in the USA or around the world. All you need is access to our curriculum."
            }
            {
              "Ideal for Unschoolers iBlossomLearn provides engaging courses that keep your child ready to learn more, while allowing their educational passion to shine. Our electives cater to your child’s unique learning path."
            }
          </p>
        </div>
        <div className="bg-black w-full text-white ">
          <div className="py-6 lg:py-12 container mx-auto">
            <div className="flex flex-wrap justify-around items-center gap-3">
              <div className="p-1 text-lg  text-white border-2 border-primary w-fit rounded-3xl">
                <button className="bg-primary p-1 px-12 rounded-3xl">
                  <Link href={"/word-wonders"}>iblossom Word wonders</Link>
                </button>
              </div>
              <div className="p-1 text-lg  text-white border-2 border-primary w-fit rounded-3xl">
                <button className="bg-primary p-1 px-12 rounded-3xl">
                  <Link href={"/comprehensive"}>iblossom Comprehensive</Link>
                </button>
              </div>
              <div className="p-1 text-lg  text-white border-2 border-primary w-fit rounded-3xl">
                <button className="bg-primary p-1 px-12 rounded-3xl">
                  <Link href={"/essential-pathways"}>
                    iblossom Essential Pathways
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

*/
