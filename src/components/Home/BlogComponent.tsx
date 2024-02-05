"use client";
import React, { useState } from "react";

import Image from "next/image";
import { Button, Input } from "antd";
import Link from "next/link";

import LoadingForDataFetch from "../Utlis/LoadingForDataFetch";
import { useGetAllBlogQuery } from "@/redux/api/blogApi";
import { NO_IMAGE } from "@/constants/filePatch";
import { CutText } from "@/utils/CutText";

const AllBlogs = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [adminId, setAdminId] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const { data = [], isLoading } = useGetAllBlogQuery({ ...query });
  //@ts-ignore
  const blogData = data?.data;
   //  // console.log("🚀 ~ file: BlogComponent.tsx:29 ~ AllBlogs ~ data:", blogData);
  if (isLoading) {
    return <LoadingForDataFetch />;
  }

  return (
    <div
     
      className="container mx-auto mt-2"
    >
      <div>
        <h1 className="text-lg text-center p-2 shadow-lg rounded-lg border">-----Blog----</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {blogData?.map((item: any, key: string) => (
            <div key={key} className="p-5 rounded-lg shadow-lg">
            

              <div className="w-full rounded overflow-hidden ">
                <div className="flex justify-between items-center">
                <h1 className="text-center text-lg">Title : {item?.title}</h1>
                  <div>
                    <Image
                      width={500}
                      height={500}
                      src={item?.image || NO_IMAGE}
                      alt="Transport Image"
                      className="w-[80px]"
                    />
                  </div>
                  
                  
                </div>
                <div>
                   <p>{item?.content && CutText(item?.content,300)}</p>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;
