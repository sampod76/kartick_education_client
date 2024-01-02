import {
  CaretRightOutlined,
  RightCircleOutlined,
  EyeOutlined,
  LockOutlined,
} from "@ant-design/icons";
import type { CSSProperties } from "react";
import React from "react";
import type { CollapseProps } from "antd";
import { Collapse, theme } from "antd";
import { useGetAllLessonQuery } from "@/redux/api/adminApi/lessoneApi";
import Link from "next/link";
import { useGetAllQuizQuery } from "@/redux/api/adminApi/quizApi";
import { CutText } from "@/utils/CutText";
import VimeoPlayer from "@/utils/vimoPlayer";
import { ENUM_VIDEO_PLATFORM } from "@/constants/globalEnums";

export default function LessonList({ moduleId }: { moduleId: string }) {
  console.log(moduleId, "moduleId from LessonList");

  //! for Course options selection
  const lesson_query: Record<string, any> = {};
  lesson_query["limit"] = 999999;
  lesson_query["sortBy"] = "lesson_number";
  lesson_query["sortOrder"] = "asc";
  lesson_query["status"] = "active";

  const { data: lessonData, isLoading } = useGetAllLessonQuery({
    module: moduleId,
    ...lesson_query,
  });

  console.log(
    "🚀 ~ file: LessonList.tsx:22 ~ LessonList ~ lessonData:",
    lessonData
  );

  const quiz_query: Record<string, any> = {};
  //! for Course options selection
  quiz_query["limit"] = 999999;

  const { data: QuizData } = useGetAllQuizQuery({
    status: "active",
    module: moduleId,
    ...quiz_query,
  });
  console.log(
    "🚀 ~ file: LessonList.tsx:45 ~ LessonList ~ QuizData:",
    QuizData
  );

  const collapseLessonData = lessonData?.data?.map(
    (lesson: any, index: number) => {
      const lessonQuizData: any = QuizData?.data?.find(
        (item: any) => item?.lesson === lesson?._id
      );
      console.log(lesson);
      console.log("🚀 lessonQuizData", lessonQuizData);
      return {
        key: lesson?._id,
        label: (
          <div className="text-[18px]  px-1 font-semibold   py-2 shadow-1 ">
            <button className="flex justify-between w-full">
              <h2>
                <span>Lesson {index + 1}: </span> {lesson?.title}
              </h2>
              <EyeOutlined style={{ fontSize: "18px" }} />
            </button>
           
            <Link
              href={`/lesson/quiz/${lessonQuizData?._id}`}
              className="text-[14px] flex justify-between w-full mt-3"
            >
              <h2>
                Quiz {index + 1} : <span>{lessonQuizData?.title} </span>
              </h2>
              <LockOutlined style={{ fontSize: "18px" }} />
            </Link>
          </div>
        ),
        children: (
          <div>
            <p className="text-center">
            <div className="flex justify-center items-center my-2">
              {lesson?.videos?.length && lesson?.videos[0]?.platform === ENUM_VIDEO_PLATFORM.VIMEO && (
                <VimeoPlayer link={lesson?.videos[0]?.link} />
              )}
            </div>
              {lesson?.details && CutText(lesson?.details, 200)}
            </p>
          </div>
        ),
        // style: panelStyle,
      };
    }
  );

  // <RightCircleOutlined />

  return (
    <div
      className="w-full  lg:w-[60vw] mx-auto "
      style={{
        padding: "10px 5vw",
      }}
    >
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <RightCircleOutlined
            style={{
              fontSize: "24px",
              padding: "8px",
              fontWeight: 600,
              marginTop: "24px",
            }}
            rotate={isActive ? 90 : 0}
          />
        )}
        // style={{ background: token.colorBgContainer }}
        items={collapseLessonData}
      />
    </div>
  );
}
