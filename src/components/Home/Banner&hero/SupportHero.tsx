"use client";
import React from "react";
import supportImage from "@/assets/SideImage/supporthero.png";
import Image from "next/image";
import { useGetAllSkills_planQuery } from "@/redux/api/adminApi/features/skillsPlanApi";
import { AllImage } from "@/assets/AllImge";
import { AnimatePresenceWrapper } from "@/components/framer_motion/AnimatePresence";
import LoadingSkeleton from "@/components/ui/Loading/LoadingSkeleton";
import { ContainerOutlined } from "@ant-design/icons";

const SupportHero = () => {
  const query: Record<string, any> = {};
  query["limit"] = 1;
  query["status"] = "active";
  query["page"] = "home";
  const { data, isLoading, error } = useGetAllSkills_planQuery({ ...query });
  const skillData = data?.data[0];
  // console.log("🚀 ~ SupportHero ~ skillData:", skillData)
  if (isLoading) {
    return <LoadingSkeleton />;
  }
  return (
    <AnimatePresenceWrapper>
      <div className="w-full ">
        <div className="container mx-auto border-2 rounded-md p-4">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-5">
              <p className="w-fit text-sm md:text-lg font-semibold bg-[#fcdbb6] rounded-sm text-[#FB8500]">
                 WHAT WE OFFER? 
              </p>
              <h1 className="text-4xl font-bold leading-normal">
                LITERACY SUPPORT IN MATH & LANGUAGE ARTS
              </h1>
              <p className="leading-loose ">
                {`Student success is our focus. That's why we have developed a
                model, to shift our students from anxiety to mastery. We want
                you to utilize past knowledge, capitalize on your experience,
                and follow the best process for your own learning. When experts
                and learners are motivated to help one another in the pursuit of
                a shared product or goal, learning happens most efficiently as a
                byproduct of that interaction. Our highly proven strategies
                engage Dual Language Students and Families in Language Goal
                Development and Product Design.`}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-xl">What you can expect from us</h1>
              <ul className="flex flex-col gap-3 marker:text-[#2a63ff] marker:text-2xl">
                <li className="">Curriculum Packages at Affordable Rates</li>
                <li>Competency-based for Students K12 in Math & ELA</li>
                <li>
                  Social & Emotional Learning Curriculum for Home Schooling
                  Family
                </li>
                <li>Book Program K8</li>
                <li>Writing Support</li>
                <li>
                  IBLossom-cast: Podcasts & Activities for Curious Kids & Their
                  Grown-Ups
                </li>
                <li>Professional Development for 9-12 and Beyond</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AnimatePresenceWrapper>
    // <AnimatePresenceWrapper>
    //   <div className="container mx-auto   ">
    //     <div className="rounded shadow bg-[#FBF7ED] mx-3 block lg:flex justify-between text-start my-[5rem] gap-5 px-2 lg:px-7 py-7 lg:py-12">
    //       <div>
    //         <h2 className="text-[#31576A]   lg:text-[3.5vw] xl:text-4xl font-[800] uppercase">
    //           {skillData?.title}
    //         </h2>
    //         <ul className="text-[#023047E5] text-md lg:text-xl gap-y-3 font-[500] mt-7 list-none ">
    //           {skillData?.points?.map((data: any) => (
    //             <li
    //               key={data?._id || data?.title}
    //               className="flex items-center my-1 gap-2 "
    //             >
    //               {/* <span className="bg-secondary rounded-full inline-block w-3 h-3 mr-3"></span> */}
    //               <ContainerOutlined style={{
    //                 border: "2px solid #FFB504",
    //                 fontSize: "10px"
    //               }} />
    //               <span>
    //                 {data?.title}

    //               </span>
    //             </li>
    //           ))}
    //         </ul>
    //       </div>
    //       <div className="mt-5 lg:mt-0">
    //         {/* <h1 className="text-[#31576A] capitalize text-[5vw] md:text-[3vw] xl:text-3xl font-[500]">
    //           {skillData?.imgTitle}
    //         </h1> */}

    //         {skillData?.imgs?.length && skillData?.imgs[0] && <Image
    //           src={skillData?.imgs[0] || AllImage.notFoundImage}
    //           style={{ marginTop: "10px", }}
    //           height={340}
    //           width={570}
    //           alt="support"
    //           className="w-full md:w-[500px]"
    //         />}
    //       </div>
    //     </div>
    //   </div>
    // </AnimatePresenceWrapper>
  );
};

export default SupportHero;
