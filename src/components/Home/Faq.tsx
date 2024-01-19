"use client";

import React from "react";
import LoadingForDataFetch from "../Utlis/LoadingForDataFetch";
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { useGetAllFaqQuery } from "@/redux/api/faqApi";
const FaqList = () => {
  const { data = [], isLoading } = useGetAllFaqQuery({});
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
//@ts-ignore
const items: CollapseProps['items'] = data?.data?.map((item:any,key:string)=>({
  key: `${key}`,
  label: item.title,
  children: <p>{item?.content}</p>,
}));
   //  // console.log("🚀 ~ file: Faq.tsx:7 ~ FaqList ~ data:", data);
  if (isLoading) {
    return <LoadingForDataFetch />;
  }
  return <div className="container mx-auto">
    <h1 className="shadow-xl text-lg text-center my-4 p-3 border">---Faq--</h1>
    <Collapse items={items} defaultActiveKey={['1']}  />
  </div>;
};

export default FaqList;
