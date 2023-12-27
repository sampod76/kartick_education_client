import { CaretRightOutlined } from "@ant-design/icons";
import type { CSSProperties } from "react";
import React from "react";
import type { CollapseProps } from "antd";
import { Collapse, theme } from "antd";
import { useGetAllLessonQuery } from "@/redux/api/adminApi/lessoneApi";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (
  panelStyle
) => [
  {
    key: "1",
    label: "Lesson 1",
    children: <p>{text}</p>,
    // style: panelStyle,
  },
  {
    key: "2",
    label: "Lesson 2",
    children: <p>{text}</p>,
    // style: panelStyle,
  },
  {
    key: "3",
    label: "Lesson 3",
    children: <p>{text}</p>,
    // style: panelStyle,
  },
];

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

  const collapseLessonData = lessonData?.data?.map((lesson: any) => {
    console.log("🚀 ~ file: LessonList.tsx:58 ", lesson);
    return {
      key: lesson?._id,
      label: <h4>{lesson?.title}</h4>,
      children: <p>{lesson?.details}</p>,
      // style: panelStyle,
    };
  });

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
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{ background: token.colorBgContainer }}
        items={collapseLessonData}
      />
    </div>
  );
}
