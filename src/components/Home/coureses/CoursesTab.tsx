'use client';
import TopBarLoading from '@/components/ui/Loading/TopBarLoading';
import { ENUM_SORT_ORDER, ENUM_STATUS, ENUM_YN } from '@/constants/globalEnums';
import { useGetAllCategoryQuery } from '@/redux/api/adminApi/categoryApi';
import { Error_model_hook } from '@/utils/modalHook';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import Courses from './Courses';

interface Category {
  _id: string;
  title: string;
}

const CoursesTab: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTabKey = searchParams.get('category') || 'all';
  // const [activeTabKey, setActiveTabKey] = useState<string>('all');

  const handleTabClick = (key: string) => {
    // setActiveTabKey(key);
    router.replace(`?category=${key}`);
  };

  const query: Record<string, any> = {
    status: ENUM_STATUS.ACTIVE,
    limit: 99999,
    sortOrder: ENUM_SORT_ORDER.ASC,
    sortBy: 'serial_number',
    isDelete: ENUM_YN.NO,
  };

  const { data, isLoading, error }: any = useGetAllCategoryQuery(query);
  // console.log("🚀 ~ data:", data);
  const categoryData: Category[] = data?.data || [];

  useEffect(() => {
    if (error || (data && data.data?.success === false)) {
      const errorType: any = error;
      Error_model_hook(errorType?.message || data?.data?.message);
    }
  }, [error, data]);

  return (
    <div
      style={{
        backgroundImage:
          'url(https://img.freepik.com/free-vector/back-school-essentials_1308-174766.jpg?t=st=1731186122~exp=1731189722~hmac=38c8584247843e9bc6f6ef1a208b85e84897da1731e4390b78989bfa1102e6fa&w=1380)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
      className="min-h-screen py-[30px]"
    >
      {/* <div className="relative">
        <Image
          src={'/banner/enroll.png'}
          width={1900}
          height={750}
          alt=""
          className="h-full w-full overflow-auto lg:h-[70vh] lg:w-[100vw]"
        />
        <h1 className="absolute left-1/2 top-1/2 mx-auto w-fit -translate-x-1/2 -translate-y-1/2 transform whitespace-nowrap rounded-[35px] bg-white bg-opacity-50 px-5 py-3 text-xl text-black lg:px-10 lg:text-2xl">
          ENROLL
        </h1>
      </div> */}
      {/* <div className="h-10 bg-primary"></div> */}
      <h2 className="my-6 text-center text-2xl font-bold leading-normal lg:text-4xl">
        Enroll Now To Access Iblossom Courses
      </h2>
      <div className="scrollbar-thin mx-auto mb-4 flex justify-start gap-2 space-x-2 overflow-x-auto border-b-4 sm:container">
        <div
          className={`cursor-pointer whitespace-nowrap rounded-t-lg p-2 transition duration-300 ${
            activeTabKey === 'all'
              ? 'bg-black text-white'
              : 'bg-gray-300 font-bold text-black'
          }`}
          onClick={() => handleTabClick('all')}
        >
          All
        </div>
        {categoryData.map((category) => (
          <div
            key={category._id}
            className={`cursor-pointer whitespace-nowrap rounded-t-lg p-2 transition duration-300 ${
              activeTabKey === category._id
                ? 'bg-black text-white'
                : 'bg-[#c9c8c8bd] font-bold text-black'
            }`}
            onClick={() => handleTabClick(category._id)}
          >
            {category.title}
          </div>
        ))}
      </div>
      <div
        className={`transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {isLoading ? (
          <TopBarLoading />
        ) : (
          <Courses
            query={{
              status: 'active',
              ...(activeTabKey !== 'all' && { category: activeTabKey }),
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CoursesTab;
