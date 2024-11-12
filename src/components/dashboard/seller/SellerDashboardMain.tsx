'use client';
import { useGlobalContext } from '@/components/ContextApi/GlobalContextApi';
import CustomImageTag from '@/components/ui/CustomTag/CustomImageTag';
import LoadingSkeleton from '@/components/ui/Loading/LoadingSkeleton';
import { useGetAllTeacherAccessCourseyQuery } from '@/redux/api/adminApi/teacherAccessCourseApi';
import { Pagination, PaginationProps } from 'antd';
import Image from 'next/image';
import { useState } from 'react';
type CourseCardProps = {
  courseDetails: {
    title: string;
    img: string;
    categoryDetails: {
      title: string;
    };
  };
};
export default function SellerDashboardMain() {
  const [current, setCurrent] = useState(1);
  const [pageCount, setPageCount] = useState(4);
  const { userInfo, userInfoLoading } = useGlobalContext();
  const query: Record<string, any> = {};
  query['limit'] = pageCount;
  query['page'] = current;
  const { data, isLoading } = useGetAllTeacherAccessCourseyQuery({
    authUserId: userInfo?.id,
  });
  if (userInfoLoading || isLoading) {
    return <LoadingSkeleton />;
  }
  const teacherAccessCourses = data?.data || [];
  const meta = data?.meta || [];

  const CourseCard: React.FC<CourseCardProps> = ({ courseDetails }) => {
    return (
      <div className="m-4 h-fit max-w-sm overflow-hidden rounded-2xl bg-white p-4 shadow-lg">
        <CustomImageTag
          className="h-48 w-full rounded-t-lg object-cover"
          src={courseDetails.img}
          alt={''}
          width={500}
          height={500}
        />
        <div className="p-4 text-center">
          <h2 className="mb-2 text-xl font-bold">{courseDetails?.title}</h2>
          <p className="text-base text-gray-700">
            <span className="font-semibold">
              {courseDetails?.categoryDetails?.title}
            </span>
          </p>
        </div>
        <div className="mt-4 flex justify-center">
          <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700">
            View Course
          </button>
        </div>
      </div>
    );
  };
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    current,
    pageSize,
  ) => {
    setCurrent(current);
    setPageCount(pageSize);
  };

  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page);
  };
  return (
    <>
      <div>
        {teacherAccessCourses.length ? (
          <div className="mx-auto grid w-full grid-cols-1 gap-2 p-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {teacherAccessCourses.map((course) => (
              <CourseCard
                key={course._id}
                courseDetails={course?.courseDetails}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p className="my-2 text-center text-xl">No courses found</p>
            <Image
              src={
                'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXF3MTlpOXI3MTBxNjN0NGJ1MThqeDVwYWNobTI3ZnB0eGl2a3JsbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUPGGDNsLvqsBOhuU0/giphy.gif'
              }
              width={900}
              height={900}
              alt=""
              className="h-[85vh] w-full rounded-3xl"
            />
          </div>
        )}
        {teacherAccessCourses.length ? (
          <div className="flex items-end justify-end bg-slate-200 p-1 text-2xl">
            <Pagination
              showSizeChanger
              current={current}
              onChange={onChange}
              showQuickJumper
              onShowSizeChange={onShowSizeChange}
              defaultCurrent={1}
              total={data?.meta?.total}
              pageSizeOptions={[10, 20, 50]}
            />
          </div>
        ) : null}
      </div>
    </>
  );
}
