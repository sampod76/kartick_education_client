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
import LoadingSkeleton from "../ui/Loading/LoadingSkeleton";
import { EllipsisMiddle } from "@/utils/CutTextElliples";
import vimeoUrlChack from "@/utils/vimeoUrlChecker";
import { useGetPurchasePackageQuery } from "@/redux/api/public/paymentApi";
import { getUserInfo } from "@/services/auth.service";

export default function LessonList({ moduleId ,moduleData}: { moduleId: string,moduleData:any }) {
  // console.log(moduleId, "moduleId from LessonList");

const userInfo = getUserInfo() as any
  ////! for purchased data of a user
const categoryId = moduleData?.milestone?.course?.category?._id
// console.log(categoryId,'categoryId')

const {data:purchasedData} = useGetPurchasePackageQuery({status:"active",limit:99999,user:userInfo?.id,category:categoryId})

console.log(purchasedData,'purchasedDatapurchasedDatapurchasedData')

const IsExistCategory = purchasedData?.data?.some((item:any) => item.categories.some((category:any) => category.category._id === categoryId));
    
      // console.log(IsExistCategory,'IsExistCategoryIsExistCategoryIsExistCategory purchased the category')
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
  // console.log("🚀 ~ LessonList ~ lessonData:", lessonData);

  // console.log(
  //   "🚀 ~ file: LessonList.tsx:22 ~ LessonList ~ lessonData:",
  //   lessonData
  // );

  const quiz_query: Record<string, any> = {};
  //! for Course options selection
  quiz_query["limit"] = 999999;

  const { data: QuizData } = useGetAllQuizQuery({
    status: "active",
    module: moduleId,
    ...quiz_query,
  });

  if (isLoading) {
    return <LoadingSkeleton />;
  }
  const playerVideoFunc = (lesson: any) => {
    if (IsExistCategory&&lesson?.videos?.length && lesson?.videos[0]?.link) {
      const check = vimeoUrlChack(lesson?.videos[0]?.link);
      if (IsExistCategory&&check) {
        return <VimeoPlayer link={lesson?.videos[0]?.link} />;
      } else {
        return <div>Not  add video yet.</div>;
      }
    } else {
      return <div>Not  add video yet.</div>;
    }
  };

  // console.log(lessonData,'lessonDatalessonData')

  const collapseLessonData = lessonData?.data?.map(
    (lesson: any, index: number) => {
  const lessonQuizData: any = QuizData?.data?.filter(
        (item: any) => item?.lesson?._id === lesson?._id
      );
      // console.log(lesson,"lessonlesson")
      // const isPurchasedCategory = purchasedData?.data?.find((category:any)=>categoryId=== )

      // console.log(lesson);
      // console.log("🚀 lessonQuizData", lessonQuizData);
      
      return {
        key: lesson?._id,
        label: (
          <div className="text-[18px]  md:px-1 font-semibold   py-2 shadow-1 ">
            <button className="flex justify-between w-full">
              <h2 className="text-base font-normal">
                <span>Lesson {index + 1}: </span> {lesson?.title}
              </h2>
              <EyeOutlined style={{ fontSize: "18px" }} />
            </button>

            {IsExistCategory && lessonQuizData &&
              lessonQuizData?.map((quiz: any) => {
                // console.log(quiz)
                return (
                  <Link
                    key={quiz?._id}
                    href={`/lesson/quiz/${quiz?._id}`}
                    className="text-[14px] flex justify-between w-full mt-3"
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
        children: (
          <div>
            <p className="text-center">
              <div className="flex justify-center items-center my-2">
                {playerVideoFunc(lesson)}
              </div>
              {/* {lesson?.details && CutText(lesson?.details, 200)} */}
              <EllipsisMiddle suffixCount={3} maxLength={300}>
                {IsExistCategory&&lesson?.short_description}
              </EllipsisMiddle>
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

              fontWeight: 600,
              marginTop: "24px",
            }}
            rotate={isActive ? 90 : 0}
          />
        )}
        // collapsible={'disabled'}
       accordion={false}
        // style={{ background: token.colorBgContainer }}
        items={collapseLessonData}
      />
    </div>
  );
}
