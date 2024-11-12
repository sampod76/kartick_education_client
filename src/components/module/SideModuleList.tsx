'use client';

import ModuleIcon from '@/assets/svg/moduleIcon';
import { ENUM_YN } from '@/constants/globalEnums';
import { useGetSingleMilestoneQuery } from '@/redux/api/adminApi/milestoneApi';
import { useGetAllModuleQuery } from '@/redux/api/adminApi/moduleApi';
import { ContainerOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useState } from 'react';
import LoadingSkeleton from '../ui/Loading/LoadingSkeleton';

const SideModuleList = ({
  milestoneId,
  moduleId,
}: {
  milestoneId: string;
  moduleId: string;
}) => {
  // console.log(milestoneId);
  const query: Record<string, any> = {};
  query['limit'] = 999999;
  query['sortOrder'] = 'asc';
  query['status'] = 'active';
  query['isDelete'] = ENUM_YN.NO;

  const { data: milestoneData, isLoading } =
    useGetSingleMilestoneQuery(milestoneId);

  const { data, isLoading: moduleLoading } = useGetAllModuleQuery({
    milestone: milestoneId,
    // lesson: "yes",
    ...query,
  });

  // console.log(data,"milestoneId");
  const modulesData = data?.data;
  // console.log("🚀 ~ modulesData:", modulesData)
  const [activeTabKey, setActiveTabKey] = useState('1');

  if (isLoading || moduleLoading) {
    return <LoadingSkeleton />;
  }

  const handleTabClick = (key: any) => {
    setActiveTabKey(key);
    // console.log(key);
  };

  return (
    <div
      style={{
        marginTop: '1.35rem',
      }}
      className="h-full border-r-slate-500 lg:border-r-2"
    >
      <div
        className="relative flex min-h-[3rem] items-center bg-[#88b7bb] bg-cover bg-no-repeat"
        style={
          {
            // backgroundImage: `url(/banner/registrationBanner.png)`,
            // borderImageSource: 'linear-gradient(black, transparent)', // Black border with transparency
            // borderImageSlice: 1,
            // borderImageRepeat: 'stretch',
            // borderImageWidth: 4,  // Adjust the width as needed
            // borderStyle: 'solid', // Specify the border style
            // boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.5)', // Add an inset box shadow for the bottom
          }
        }
      >
        <h2 className="leading-1 flex items-center gap-2 px-3 text-start font-['Inter'] text-[20px] font-semibold text-gray-800">
          <ContainerOutlined /> <span>{milestoneData?.title}</span>
        </h2>
      </div>

      {/* <Divider
        style={{
          color: "red",
          fontSize: "5px",
          background: "red",
        }}
      /> */}
      {/* <Tabs
        defaultActiveKey="1"
        tabPosition="left"
        centered
        onChange={handleTabClick}
        items={tabsItems}
      /> */}
      <div className="max-w-[8 mx-auto mt-2 flex flex-col gap-1 md:gap-2">
        {modulesData?.map((module: any, index: number) => {
          return (
            <Link
              key={index}
              href={`/lesson/module/${module?._id}?module=${module?.title}`}
              className={`lg:text-text-lg leading-2 flex rounded px-1 py-1 text-start text-base md:px-3 ${
                module?._id === moduleId
                  ? 'bg-white from-neutral-950 text-gray-800'
                  : 'font-normal text-gray-800'
              } `}
            >
              {/* <span className={`rounded-full   w-2 h-2 inline-flex items-center justify-center mr-2 ${module?._id === moduleId ? "bg-[#479FEC]" : "bg-black"
                }`}></span> */}
              <span className="mr-1 mt-1">{<ModuleIcon />}</span>
              {module?.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideModuleList;
