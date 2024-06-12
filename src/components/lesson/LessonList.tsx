"use client";
import {
  CaretRightOutlined,
  RightCircleOutlined,
  EyeOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import type { CSSProperties } from "react";
import React, { useState } from "react";
import type { CollapseProps } from "antd";
import { Collapse, theme } from "antd";
import { useGetAllLessonQuery } from "@/redux/api/adminApi/lessoneApi";
import TextToSpeech from "@/utils/TextToSpeech";
import Link from "next/link";
import { useGetAllQuizQuery } from "@/redux/api/adminApi/quizApi";
import { CutText } from "@/utils/CutText";
import VimeoPlayer from "@/utils/vimoPlayer";
import { ENUM_VIDEO_PLATFORM, ENUM_YN } from "@/constants/globalEnums";
import LoadingSkeleton from "../ui/Loading/LoadingSkeleton";
import { EllipsisMiddle } from "@/utils/CutTextElliples";
import YoutubePlayer from "react-player/youtube";

import { getUserInfo } from "@/services/auth.service";
import ModalComponent from "../Modal/ModalComponents";
import LoginPage from "../Login/LoginPage";
import { usePathname } from "next/navigation";
import { useGetAllPackageAndCourseQuery } from "@/redux/api/sellerApi/addPackageAndCourse";
import { useGetCheckPurchasesCourseQuery } from "@/redux/api/public/purchaseCourseApi";
import { useGetAllPurchaseAcceptedPackageQuery } from "@/redux/api/public/purchaseAPi";
import { USER_ROLE } from "@/constants/role";
import parse from "html-react-parser";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { urlChecker } from "@/utils/urlChecker";
import QuizIcon from "@/assets/svg/quizIcon";
import { useCheckPurchaseCategoryQuery } from "@/redux/api/adminApi/categoryApi";
export default function LessonList({
  moduleId,
  moduleData,
}: {
  moduleId: string;
  moduleData: any;
}) {
  // console.log(moduleId, "moduleId from LessonList");

  const screens = useBreakpoint();
  const userInfo = getUserInfo() as any;

  const [currentCollapse, setCurrentCollapse] = useState<string[]>([]);
  ////! for purchased data of a user
  const categoryId = moduleData?.category ||  moduleData?.milestone?.course?.category?._id;
  const courseId = moduleData?.course || moduleData?.milestone?.course?._id
  // console.log("🚀 ~ categoryId:", moduleData)

  let IsExistCategoryOrCourse: any = false;
 
  //! for Course options selection
  const lesson_query: Record<string, any> = {};
  lesson_query["limit"] = 999999;
  lesson_query["sortBy"] = "lesson_number";
  lesson_query["sortOrder"] = "asc";
  lesson_query["status"] = "active";
  lesson_query["isDelete"] = ENUM_YN.NO;
  const { data: lessonData, isLoading } = useGetAllLessonQuery({
    module: moduleId,
    ...lesson_query,
  });

  const {data:checkPurchase,isLoading:CheckPurchaseLoading}=useCheckPurchaseCategoryQuery(`${categoryId}?course=${courseId}`)
  // console.log("🚀 ~ checkPurchase:", checkPurchase)
  if(checkPurchase){
    IsExistCategoryOrCourse=checkPurchase
  }


  const quiz_query: Record<string, any> = {};
  //! for Course options selection
  quiz_query["limit"] = 999999;
  quiz_query["isDelete"] = ENUM_YN.NO;
  const { data: QuizData, isLoading: quizLoading } = useGetAllQuizQuery({
    status: "active",
    isDelete: ENUM_YN.NO,
    module: moduleId,
    ...quiz_query,
  });

  if (
    isLoading ||
    quizLoading  ||CheckPurchaseLoading  
  ) {
    return <LoadingSkeleton />;
  }

  // console.log('QuizData', QuizData)
  const playerVideoFunc = (lesson: any, index?: number) => {
    if (IsExistCategoryOrCourse
      // || index === 0//! for first open video
    ) {
      if (lesson?.videos?.length && lesson?.videos[0]?.link) {
        const result = urlChecker(lesson?.videos[0]?.link);
        if (result.platform === ENUM_VIDEO_PLATFORM.VIMEO) {
          return (
            <VimeoPlayer
              width={!screens.sm ? 350 : 750}
              height={!screens.sm ? 350 : 600}
              // link={result.data as string}
              link={lesson?.videos[0]?.link}
            />
          );
        } else if (result.platform === ENUM_VIDEO_PLATFORM.YOUTUBE) {
          return (
            <YoutubePlayer url={result.data ? (result.data as string) : ""} />
          );
        } else {
          return <div>Not add video yet.</div>;
        }
      }
    } else {
      return (
        <div className="text-base lg:text-lg text-start text-red-500 font-medium">
          This contents is private. First purchase this course.
          {/* <ModalComponent buttonText="login">
            <LoginPage redirectLink={pathname} />
          </ModalComponent> */}

        </div>
      );
    }
  };



  //! collapse data ////
  const collapseLessonData = lessonData?.data?.map(
    (lesson: any, index: number) => {
      const lessonQuizData: any = QuizData?.data?.filter(
        (item: any) => item?.lesson?._id === lesson?._id
      );

      const isLessonCollapsed = currentCollapse.includes(lesson?._id);

      ///! isExist have
      if (IsExistCategoryOrCourse) {
        return {
          key: lesson?._id,
          label: (
            <div className="text-[18px]   md:px-1 font-semibold   py-2 shadow-1 ">
              <button className="flex justify-between w-full">
                <h2 className="text-sm md:text-lg font-normal text-start ">
                  <span>Lesson {index + 1}: </span> {lesson?.title}
                </h2>
                {isLessonCollapsed ? (
                  <EyeInvisibleOutlined style={{ fontSize: "18px" }} />
                ) : (
                  <EyeOutlined style={{ fontSize: "18px" }} />
                )}
              </button>
            </div>
          ),
          children: (
            <div>
              <div className="">
                <div className="flex justify-center items-center my-1">
                  {playerVideoFunc(lesson)}
                </div>
                {/* {lesson?.details && CutText(lesson?.details, 200)} */}
                <EllipsisMiddle suffixCount={3} maxLength={300}>
                  {IsExistCategoryOrCourse && lesson?.short_description}
                </EllipsisMiddle>
                {lesson?.details && parse(lesson?.details)}
              </div>

              {IsExistCategoryOrCourse &&
                lessonQuizData &&
                lessonQuizData?.map((quiz: any) => {
                  // console.log(quiz)
                  return (
                    <Link
                      key={quiz?._id}
                      href={`/lesson/quiz/${quiz?._id}?lesson=${lesson?.title}&quiz=${quiz?.title}`}
                      className="text-[14px] flex justify-between  mx-auto mt-3 text-[#479FEC]"
                    >
                      <h2 className="text-base font-normal flex justify-start gap-1">
                     <span className="mt-1"><QuizIcon/></span>   Quiz : {quiz?.title}
                      </h2>
                      
                      {/* <LockOutlined style={{ fontSize: "18px" }} /> */}
                    </Link>
                    
                  );
                })}
            </div>
          ),
          // style: panelStyle,
        };
      } else {
        ///! IsExistCategoryOrCourse do not have
        return {
          key: lesson?._id,
          label: (
            <div className="text-[18px]   md:px-1 font-semibold   py-2 shadow-1 ">
              <button className="flex justify-between w-full">
                <h2 className="text-base text-start font-normal">
                  <span>Lesson {index + 1}: </span> {lesson?.title}
                </h2>
                {isLessonCollapsed ? (
                  <EyeInvisibleOutlined style={{ fontSize: "18px" }} />
                ) : (
                  <EyeOutlined style={{ fontSize: "18px" }} />
                )}
              </button>
            </div>
          ),
          children: (
            <div>
              <div className="">
                <div className="flex justify-center items-center my-2">
                  {playerVideoFunc(lesson, index)}
                </div>
                {/* {lesson?.details && CutText(lesson?.details, 200)} */}
                <EllipsisMiddle suffixCount={3} maxLength={300}>
                  {IsExistCategoryOrCourse && lesson?.short_description}
                </EllipsisMiddle>
                {lesson?.details && parse(lesson?.details)}
              </div>
              {IsExistCategoryOrCourse &&
                lessonQuizData &&
                lessonQuizData?.map((quiz: any) => {
                  // console.log(quiz)
                  return (
                    <Link
                      key={quiz?._id}
                      href={`/lesson/quiz/${quiz?._id}?lesson=${lesson?.title}&quiz=${quiz?.title}`}
                      className="text-[14px] flex justify-between w-[86%] mx-auto mt-3 text-[#479FEC]"
                    >
                      <h2 className="text-base font-normal">
                        Quiz {index + 1} : <span>{quiz?.title} </span>
                      </h2>
                      <LockOutlined style={{ fontSize: "18px" }} />
                    </Link>
                  );
                })}
            </div>
          ),
          // style: panelStyle,
        };
      }
    }
  );

  const handleChange = (key: any) => {
    // console.log(key, 'key')

    setCurrentCollapse(key);
  };

  // <RightCircleOutlined />

  return (
    <div
      className="w-full  lg:w-[60vw] mx-auto px-0 lg:px-2 "
      style={
        {
          // padding: "10px 5vw",
        }
      }
    >
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <RightCircleOutlined
            style={{
              fontSize: "24px",

              fontWeight: 600,
              marginTop: "24px",
            }}
            rotate={isActive ? 90 : 0}
          />
        )}
        onChange={handleChange}
        // collapsible={'disabled'}
        accordion={false}
        // style={{ background: token.colorBgContainer }}
        items={collapseLessonData}
      />
    </div>
  );
}
