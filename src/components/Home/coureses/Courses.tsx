import InternelError from '@/components/shared/Error/InternelError';
import LoadingSkeleton from '@/components/ui/Loading/LoadingSkeleton';
import NotFoundCourse from '@/components/ui/NotFound/NotFoundCourse';
import { ENUM_SORT_ORDER, ENUM_STATUS } from '@/constants/globalEnums';
import { useGetAllCourseQuery } from '@/redux/api/adminApi/courseApi';
import { Pagination, PaginationProps } from 'antd';
import { useEffect, useState } from 'react';
import SIngleCourse from './SIngleCourse';

interface ICourseItemType {
  status?: string;
  category?: string;
  categoryTitle?: string;
  [key: string]: string | undefined;
}

const Courses = ({
  query,
  width = 'container',
}: {
  query: ICourseItemType;
  width?: string;
}) => {
  const [current, setCurrent] = useState(1);
  const [pageCount, setPageCount] = useState(12);
  const [category, setCategory] = useState('');

  // Function to render courses for the current page

  // Fetch courses based on query parameters and pagination
  const { data, isLoading, isFetching, error } = useGetAllCourseQuery({
    status: ENUM_STATUS.ACTIVE,
    page: current,
    limit: pageCount,
    sortOrder: ENUM_SORT_ORDER.ASC,
    category,
    ...query,
  });
  const courseData = data?.data || [];
  // console.log('🚀 ~ courseData:', courseData);

  const totalCourses = courseData.length;

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

  useEffect(() => {
    if (query?.category) {
      setCategory(query?.category);
    } else {
      setCategory('');
    }
  }, [query?.category]);

  if (error) {
    return (
      <InternelError
        message={
          //@ts-ignore
          error.data || data?.data?.message
        }
      />
    );
  }

  return (
    <div className="relative">
      {isLoading || isFetching ? (
        <LoadingSkeleton />
      ) : totalCourses === 0 ? (
        <NotFoundCourse />
      ) : (
        <div
          className={`mt-3 ${
            width === 'container' ? 'container' : 'w-full'
          } mx-auto p-2`}
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {courseData.map((course) => (
              <SIngleCourse key={course._id} course={course} />
            ))}
          </div>
          <div
            className={`mb-2 mt-10 flex items-center justify-center rounded-md bg-gray-200 p-2`}
          >
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
