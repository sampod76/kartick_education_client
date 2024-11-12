/* eslint-disable react/no-unescaped-entities */
'use client';
import SupportDonateHelpDesk from '@/components/widgets/SupportDonate';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function SupplementalActivities() {
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
            src={'/banner/Supplemental-activities.png'}
            width={1900}
            height={750}
            alt=""
            className="h-full w-full overflow-auto lg:h-[75vh] lg:w-[100vw]"
          />
          <h1 className="absolute left-1/2 top-1/2 mx-auto w-fit -translate-x-1/2 -translate-y-1/2 transform whitespace-nowrap rounded-[35px] bg-white bg-opacity-50 px-5 py-3 text-xl text-black lg:px-10 lg:text-2xl">
            Supplemental Activities
          </h1>
        </div>
        <div className="h-10 bg-primary"></div>
        <div className="mb-20 flex flex-col items-center justify-center space-y-5 px-5 py-7 text-center lg:space-y-12 lg:px-28">
          <h1
            data-aos="zoom-in"
            className="mt-2 text-3xl font-bold lg:mt-6 lg:text-4xl"
          >
            Supplemental Activities
          </h1>
          <p data-aos="zoom-in" className="bodyText lg:pb-6">
            At iBlossomLearn, we enrich every student’s educational experience
            through a diverse range of supplemental activities that extend
            beyond the traditional classroom. These activities are designed to
            engage learners at all levels, offering hands-on learning, creative
            projects, and interactive challenges that foster critical thinking
            and creativity. Additionally, through our non-profit initiative, The
            Learning Arc, students have access to free tutoring and academic
            support, ensuring that every learner has the resources they need to
            thrive. Whether it's virtual science experiments, art projects,
            coding workshops, or participation in iBlossom Cast, our
            supplemental activities provide students with opportunities to
            explore their interests, build new skills, and deepen their
            understanding of the world around them.
          </p>
        </div>
        <div className="mb-20 items-center justify-center space-y-5 bg-black p-5 py-14 text-start text-white lg:space-y-16">
          <div className="px- container mx-auto lg:px-7">
            <div className="my-8 space-y-3">
              <div className="text-2xl font-bold">
                Overview of Supplemental Activities
              </div>
              <div className="text-xl font-semibold">
                Supplemental Activities
              </div>
            </div>

            <div className="space-y-5 text-lg 2xl:text-xl">
              <div className="space-y-3">
                <h2 className="text-xl font-bold">
                  1. Virtual Science Experiments
                </h2>
                <p className="text-sm">
                  <span className="font-semibold">Time per Session:</span> 60
                  minutes
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Outcome:</span> Students
                  engage in hands-on science activities that deepen their
                  understanding of scientific concepts and foster curiosity
                  about the natural world.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold">2. Art Projects</h2>
                <p className="text-sm">
                  <span className="font-semibold">Time per Session:</span> 45
                  minutes
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Outcome:</span> Encourages
                  creativity and self-expression as students explore various
                  artistic techniques and mediums.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold">3. Coding Workshops</h2>
                <p className="text-sm">
                  <span className="font-semibold">Time per Session:</span> 60
                  minutes
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Outcome:</span> Introduces
                  students to the basics of coding and programming, building
                  foundational skills in technology and problem-solving.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold">
                  4. iBlossom Cast Participation
                </h2>
                <p className="text-sm">
                  <span className="font-semibold">Time per Session:</span> 30-45
                  minutes
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Outcome:</span> Enhances
                  communication skills and confidence as students create and
                  share audio stories, fostering creativity and storytelling
                  abilities.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold">5. Interactive Challenges</h2>
                <p className="text-sm">
                  <span className="font-semibold">Time per Session:</span> 30
                  minutes
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Outcome:</span> Promotes
                  critical thinking and teamwork through problem-solving
                  activities and group challenges.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-20 flex flex-col items-center justify-center space-y-5 p-5 py-14 text-center lg:space-y-12">
          <div className="px- container mx-auto lg:px-7 space-y-5">
            <h1>The Learning Arc: Core Subject Tutoring</h1>
            <p>
              In addition to these activities, The Learning Arc offers free
              tutoring for all core subjects in K-12, available to all students,
              whether or not they are enrolled in iBlossomLearn. This non-profit
              initiative ensures that every learner has access to the academic
              support they need, reinforcing our commitment to providing
              comprehensive educational resources to the entire community.
              Whether you need help with math, science, reading, or any other
              core subject, The Learning Arc is here to support you and your
              child on their educational journey.
            </p>
          </div>
          <Link href={'/signup'}>
            <div
              data-aos="zoom-out"
              className="mt-6 w-80 self-center rounded-3xl border-2 border-primary p-1"
            >
              <button className="w-full rounded-3xl bg-primary p-2 px-5 text-[12px] text-white lg:text-base">
                <p className="text-xl">Register Now!</p>
              </button>
            </div>
          </Link>
        </div>
      </div>
      <SupportDonateHelpDesk />
    </div>
  );
}

/* const banner = {
  bannerImagePath: "/banner/Supplemental-activities.png",
  bannerText: " Supplemental Activities",
  className: "lg:h-[75vh]",
};
const bodyText = {
  text: "At iBlossomLearn, we enrich every student’s educational experience through a diverse range of supplemental activities that extend beyond the traditional classroom. These activities are designed to engage learners at all levels, offering hands-on learning, creative projects, and interactive challenges that foster critical thinking and creativity. Additionally, through our non-profit initiative, The Learning Arc, students have access to free tutoring and academic support, ensuring that every learner has the resources they need to thrive. Whether it's virtual science experiments, art projects, coding workshops, or participation in iBlossom Cast, our supplemental activities provide students with opportunities to explore their interests, build new skills, and deepen their understanding of the world around them.",
};
 */
