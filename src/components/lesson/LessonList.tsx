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

export default function LessonList({ moduleId }: { moduleId: string }) {
  console.log(moduleId, "moduleId from LessonList");
  const { token } = theme.useToken();

  const { data: lessonData } = useGetAllLessonQuery({
    status: "active",
    module: moduleId,
  });
  // console.log(
  //   "🚀 ~ file: LessonList.tsx:45 ~ LessonList ~ lessonData:",
  //   lessonData
  // );

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  const collapseLessonData = lessonData?.data?.map(
    (lesson: any, index: number) => {
      console.log("🚀 ~ file: LessonList.tsx:58 ", lesson);
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
            <button className="text-[14px] flex justify-between w-full mt-3">
              <h2>
                Quiz {index + 1} : <span>smart quiz </span>
              </h2>
              <LockOutlined style={{ fontSize: "18px" }} />
            </button>
          </div>
        ),
        children: (
          <div>
            <p>{lesson?.details?.slice(0, 220)}</p>
          </div>
        ),
        // style: panelStyle,
      };
    }
  );

  // <RightCircleOutlined />

  return (
    <div
      className="w-full  lg:w-[60vw] mx-auto"
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
        style={{ background: token.colorBgContainer }}
        items={collapseLessonData}
      />
    </div>
  );
}
