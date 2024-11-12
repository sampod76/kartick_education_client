import { AllImage } from '@/assets/AllImge';
import { Col, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function WelcomeMissionStatement() {
  return (
    <div>
      <div className="container mx-auto bg-[#e2dede] font-semibold">
        <div className="p-5 lg:mb-10 lg:p-20">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-center text-5xl font-medium">
              Welcome to IBLossomLearn
            </h1>
            <h1 className="text-center text-3xl font-extrabold">
              Mission Statement
            </h1>
            <p className="max-w-[750px] text-lg">
              Our mission is to revolutionize homeschooling by providing a
              comprehensive and holistic curriculum tailored to the diverse
              needs of families.
            </p>
            <Link href={'/inclusion-approach'}>
              <div className="mt-6 w-96 self-center rounded-3xl border-2 border-primary p-1">
                <button className="w-full rounded-3xl bg-primary p-2 px-5 text-[12px] text-white lg:text-base">
                  <p>Read more</p>
                </button>
              </div>
            </Link>
          </div>
          <div>
            <h1 className="my-6 text-center text-3xl font-extrabold lg:my-20">
              Core Values
            </h1>
            <Row gutter={[100, 32]} className="p-2 lg:p-0">
              {/* <div className="gird grid-cols-1 lg:grid-cols-2 gap-7"> */}
              <Col md={24} lg={12}>
                <div data-aos="fade-right" className="space-y-3">
                  <Image
                    width={500}
                    height={500}
                    className="h-20 w-16"
                    src={AllImage.icons.wicon1}
                    alt=""
                  />
                  <h2 className="text-3xl font-semibold">
                    Fostering Academic Excellence{' '}
                  </h2>
                  <p className="">
                    By supporting skilled and dedicated teachers who maintain
                    high academic standards, motivate our students and
                    collaborate with our families
                  </p>
                </div>
              </Col>
              <Col md={24} lg={12}>
                <div data-aos="fade-left" className="space-y-3">
                  <Image
                    width={500}
                    height={500}
                    className="h-16 w-16"
                    src={AllImage.icons.wicon2}
                    alt=""
                  />
                  <h2 className="text-3xl font-semibold">
                    Developing Critical Thinkers{' '}
                  </h2>
                  <p className="">
                    By encouraging intellectual curiosity and rewarding
                    independent and creative problem solvers
                  </p>
                </div>
              </Col>
              <Col md={24} lg={12}>
                <div data-aos="fade-right" className="space-y-3">
                  <Image
                    width={500}
                    height={500}
                    className="h-16 w-16"
                    src={AllImage.icons.wicon3}
                    alt=""
                  />
                  <h2 className="text-3xl font-semibold">
                    Nurturing the Whole Child{' '}
                  </h2>
                  <p>
                    By creating engaged learners, encouraging honesty and
                    guiding social and emotional development
                  </p>
                </div>
              </Col>
              <Col md={24} lg={12}>
                <div data-aos="fade-left" className="space-y-3">
                  <Image
                    width={500}
                    height={500}
                    className="h-16 w-16"
                    src={AllImage.icons.wicon4}
                    alt=""
                  />
                  <h2 className="text-3xl font-semibold">
                    Building Partnership{' '}
                  </h2>
                  <p>
                    By welcoming our families, staff and members of the wider
                    community to participate in and celebrate the successes of
                    our students
                  </p>
                </div>
              </Col>
              <Col md={24} lg={12}>
                <div data-aos="fade-right" className="space-y-3">
                  <Image
                    width={500}
                    height={500}
                    className="h-16 w-16"
                    src={AllImage.icons.wicon5}
                    alt=""
                  />
                  <h2 className="text-3xl font-semibold">
                    Ensuring a Safe Online Environment
                  </h2>
                  <p>
                    By promoting mutual respect in our diverse community of
                    students, teachers and families
                  </p>
                </div>
              </Col>
              {/* </div> */}
            </Row>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-3 grid grid-cols-2 gap-4 px-10 text-center text-3xl md:mb-10 lg:w-[60%] lg:grid-cols-4 xl:gap-10 2xl:px-20">
        <Link href={'/enroll'}>
          <div
            data-aos="fade-right"
            className="flex h-[9rem] flex-col items-center justify-center rounded-2xl border bg-[#2a63ff]"
          >
            <Image
              src={AllImage.icons.wicon6}
              alt=""
              width={200}
              height={200}
              className="-ml-3 h-16 w-20"
            />
            <h4 className="mt-2 text-3xl font-medium text-white">Enroll</h4>
          </div>
        </Link>
        <Link href={'/teach'}>
          <div
            data-aos="zoom-in"
            className="flex h-[9rem] flex-col items-center justify-center rounded-2xl border bg-[#2a63ff]"
          >
            <Image
              src={AllImage.icons.wicon7}
              alt=""
              width={200}
              height={200}
              className="-ml-3 h-16 w-20"
            />
            <h4 className="mt-2 text-3xl font-medium text-white">Teach</h4>
          </div>
        </Link>
        <Link href={'/support'}>
          <div
            data-aos="zoom-in"
            className="flex h-[9rem] flex-col items-center justify-center rounded-2xl border bg-[#2a63ff]"
          >
            <Image
              src={AllImage.icons.wicon8}
              alt=""
              width={200}
              height={200}
              className="-ml-3 h-16 w-20"
            />
            <h4 className="mt-2 text-3xl font-medium text-white">Support</h4>
          </div>
        </Link>
        <Link href={'/grow'}>
          <div
            data-aos="fade-left"
            className="flex h-[9rem] flex-col items-center justify-center rounded-2xl border bg-[#2a63ff]"
          >
            <Image
              src={AllImage.icons.wicon9}
              alt=""
              width={200}
              height={200}
              className="h-16 w-20"
            />
            <h4 className="mt-2 text-3xl font-medium text-white">Grow</h4>
          </div>
        </Link>
      </div>
    </div>
  );
}
