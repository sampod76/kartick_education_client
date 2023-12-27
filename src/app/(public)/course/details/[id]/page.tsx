"use client";
import AuthorCourseDetails from "@/components/Course/CourseDetails/AuthorCourseDetails";
import CourseDetailsTab from "@/components/Course/CourseDetails/CourseDetailsTab";
import CourseDetailsTop from "@/components/Course/CourseDetails/CourseDetailsTop";
import CourseStatistics from "@/components/Course/CourseStatistics";
import BannerCourses from "@/components/Home/Heros/BannerCourses";
import SupportHero from "@/components/Home/Heros/SupportHero";
import { useGetSingleCourseQuery } from "@/redux/api/adminApi/courseApi";
import React from "react";

const courseData = {
  _id: "6585eb94a392ae8a8f1d2756",
  title: "Level-2",
  snid: "00010",
  img: "https://i.ibb.co/H2Z6jB3/bg-dooner.jpg",
  details: "asdfasdf",
  author: "657e0613cf50ca51e691ce92",
  category: "6581442b272bb4dbd09765aa",
  price: 200,
  duration: "2 month",
  level: "5",
  price_type: "free",
  status: "active",
  demo_video: {
    video: "vimeo",
    platform: "http://localhost:3000/admin/course/create",
  },
  showing_number: 20,
  favorite: "no",
  tags: ["course", "tech", "english", "update"],
  createdAt: "2023-12-22T20:03:32.355Z",
  updatedAt: "2023-12-22T20:03:32.355Z",
  __v: 0,
};


const CourseDetailsPublicPage = ({ params }: any) => {
  // console.log(params, "params");
  const id = params?.id;
  const { data: CourseData, isLoading } = useGetSingleCourseQuery(params?.id, {
    skip: !Boolean(params?.id),
  });
  console.log(CourseData, "courseData");
  return (
    <div className="container mx-auto">
      {/* <h2>The Web Developer Boot Camp</h2> */}
      <BannerCourses />
      <CourseStatistics />
      <CourseDetailsTop />
      <AuthorCourseDetails authorData={CourseData?.author} />
      <CourseDetailsTab courseId={id} />
      <SupportHero />
    </div>
  );
};

export default CourseDetailsPublicPage;