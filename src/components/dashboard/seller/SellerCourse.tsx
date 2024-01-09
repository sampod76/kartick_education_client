import React from 'react';
import { useGetAllCourseQuery } from "@/redux/api/adminApi/courseApi";
import { Error_model_hook } from "@/utils/modalHook";
import NotFoundCourse from "@/components/ui/NotFound/NotFoundCourse";
import LoadingSkeleton from "@/components/ui/Loading/LoadingSkeleton";

export default function SellerCourse() {
    const { data, isLoading, error } = useGetAllCourseQuery({ });
    const courseData = data?.data || [];
    if (
      error ||
      //@ts-ignore
      data?.data?.success === false
    ) {
      const errorType: any = error;
      Error_model_hook(
        errorType?.message ||
          //@ts-ignore
          data?.data?.message
      );
      console.log(error, data?.data);
    }
    return (
      <>
        {isLoading ? (
          <LoadingSkeleton />
        ) : courseData?.length === 0 ? (
          <NotFoundCourse />
        ) : (
          <div className="mt-3 container mx-auto ">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {courseData?.map((item: any, index: number) => {
                return <div key={index + 1}>

                    
                </div>
              })}
            </div>
          </div>
        )}
      </>
    );
}
