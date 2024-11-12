/* eslint-disable react/no-unescaped-entities */
import SupportDonateHelpDesk from '@/components/widgets/SupportDonate';
import Image from 'next/image';
import Link from 'next/link';

const page = () => {
  return (
    <div className="">
      <div className="">
        <div className="relative">
          <Image
            src={'/banner/homeschooling-families.jpg'}
            width={1900}
            height={750}
            alt=""
            className="w-full overflow-x-hidden lg:w-[100vw] xl:h-[80vh]"
          />
          <div>
            <h1
              //   data-aos="zoom-out"
              className="absolute left-1/2 top-1/2 mx-auto w-fit -translate-x-1/2 -translate-y-1/2 transform whitespace-nowrap rounded-[35px] bg-white bg-opacity-50 px-5 py-3 text-center text-xl text-black lg:right-1/2 lg:px-16 lg:text-2xl"
            >
              SEL for Homeschooling Families
            </h1>
          </div>
        </div>
        <div className="h-10 bg-primary"></div>
        <div className="mb-20 flex flex-col items-center justify-center space-y-5 px-5 py-7 text-center lg:space-y-12 lg:px-28">
          <h1
            // data-aos="zoom-in"
            className="mt-2 text-3xl font-bold lg:mt-6 lg:text-4xl"
          >
            SEL for Homeschooling Families
          </h1>
          <p data-aos="zoom-in" className="bodyText lg:pb-6">
            iBlossomLearn's Social and Emotional Learning (SEL) program is
            specifically designed to support homeschooling families by fostering
            the holistic development of each child. The program emphasizes the
            importance of emotional intelligence, resilience, and interpersonal
            skills alongside academic learning. Through guided activities,
            reflection, and practical strategies, SEL helps students navigate
            the challenges of both their educational journey and personal
            growth. This approach ensures that students not only excel
            academically but also develop the emotional and social skills
            necessary for lifelong success.
          </p>
          <div className="flex w-full items-center justify-between xl:w-[90%]">
            {/* <Link href={'/ibhomeschool'}> */}
            <div
              data-aos="zoom-out"
              className="mt-6 w-80 self-center rounded-3xl border-2 border-primary p-1"
            >
              <Link href={'/course/milestone/65e1ff205c4cfe1fc4114cc8'}>
                <h6 className="w-full rounded-3xl bg-primary p-2 px-5 text-[12px] text-white lg:text-base">
                  <p className="text-xl">Elementary Levels</p>
                </h6>
              </Link>
            </div>
            {/* </Link> */}
            {/* <Link href={'/ibhomeschool'}> */}
            <div
              data-aos="zoom-out"
              className="mt-6 w-80 self-center rounded-3xl border-2 border-primary p-1"
            >
              <Link href={'/course/milestone/65e203815c4cfe1fc4114cdf'}>
                <button className="w-full rounded-3xl bg-primary p-2 px-5 text-[12px] text-white lg:text-base">
                  <p className="text-xl">Middle Levels</p>
                </button>
              </Link>
            </div>
            {/* </Link> */}
            {/* <Link href={'/ibhomeschool'}> */}
            <div
              data-aos="zoom-out"
              className="mt-6 w-80 self-center rounded-3xl border-2 border-primary p-1"
            >
              <Link href={'/course/milestone/65e207d95c4cfe1fc4114ce4'}>
                <button className="w-full rounded-3xl bg-primary p-2 px-5 text-[12px] text-white lg:text-base">
                  <p className="text-xl">High School Levels</p>
                </button>
              </Link>
            </div>
            {/* </Link> */}
          </div>
        </div>
      </div>
      <SupportDonateHelpDesk />
    </div>
  );
};

export default page;
