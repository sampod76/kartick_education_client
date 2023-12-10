"use client";

import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";
import { useGetSingleBlogQuery } from "@/redux/api/blogApi";
import { Input } from "antd";

import Image from "next/image";

const BlogDetalis = ({ params }: any) => {
  const { data: data, isLoading } = useGetSingleBlogQuery(params?.id, {
    skip: !Boolean(params?.id),
  });
  console.log(data);

  if (isLoading) {
    return <LoadingForDataFetch />;
  }
  return (
    <>
      <div className="container mx-auto mt-10">
        <h1 className="text-center text-lg">{data?.title}</h1>
        <div className="w-full rounded overflow-hidden shadow-lg">
          <section className="grid  grid-cols-1 xl:grid-cols-2">
            <div>
              <Image
                width={1800}
                height={1800}
                src={data?.image}
                alt="Transport Image"
                className="w-full"
              />
            </div>
            <div>
              <Input.TextArea value={data?.content} rows={30}></Input.TextArea>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default BlogDetalis;
