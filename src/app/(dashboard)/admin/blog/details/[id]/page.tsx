"use client";

import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";
import { useGetSingleBlogQuery } from "@/redux/api/blogApi";
import { Input } from "antd";
import dynamic from "next/dynamic";

import Image from "next/image";

const BlogDetalis = ({ params }: any) => {
  const { data: data, isLoading } = useGetSingleBlogQuery(params?.id, {
    skip: !Boolean(params?.id),
  });


  if (isLoading) {
    return <LoadingForDataFetch />;
  }
  return (
    <>
      <div style={{ marginTop: "2.5rem" }} className="container ">
        <h1
          style={{
            fontSize: "1.125rem",
            lineHeight: "1.75rem",
            textAlign: "center",
          }} /* className="text-center text-lg" */
        >
          {data?.title}
        </h1>
        <div
          style={{
            overflow: "hidden",
            borderRadius: "0.25rem",
            width: "100%",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          }} /* className="w-full rounded overflow-hidden shadow-lg" */
        >
          <div className="grid  grid-cols-1 xl:grid-cols-2">
            <div>
              <Image
                width={1800}
                height={1800}
                src={data?.image}
                alt="Transport Image"
                // className="w-full"
                style={{"width":"100%"}}
              />
            </div>
            <div>
              <Input.TextArea value={data?.content} rows={30}></Input.TextArea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// export default BlogDetalis;
export default dynamic(() => Promise.resolve(BlogDetalis), {
   ssr: false,
 });

