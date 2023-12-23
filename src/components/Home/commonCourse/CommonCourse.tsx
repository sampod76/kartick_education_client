
import React from "react";

import coursesData from "@/db/courses";
import SIngleCommonCourse from "./SIngleCommonCourse";


const CommonCourse = () => {
  return (
    <div className="mt-5  container mx-auto">
   

      <div className="">
        <div className="mt-[5rem] container mx-auto ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {coursesData?.map((item: any, index: number) => {
              return <SIngleCommonCourse course={item} key={index + 1} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonCourse;
