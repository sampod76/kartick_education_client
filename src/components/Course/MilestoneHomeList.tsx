'use client';
// import dynamic from "next/dynamic";

import { ENUM_YN } from '@/constants/globalEnums';
import { useGetSingleCourseQuery } from '@/redux/api/adminApi/courseApi';
import { useGetAllMilestoneQuery } from '@/redux/api/adminApi/milestoneApi';
import { IMilestoneData } from '@/types/miestoneType';
import { Divider } from 'antd';
import parse from 'html-react-parser';
import { FaBook } from 'react-icons/fa';
import SingleMilestone from '../milestone/SingleMilestone';
import ModalComponent from '../Modal/ModalComponents';
import AnyFileViewer from '../ui/AnyFileViewer';
import LoadingSkeleton from '../ui/Loading/LoadingSkeleton';
const MilestoneHomeList = ({ courseId }: { courseId: string }) => {
  // const userInfo = getUserInfo() as any;
  // const { generateBgColor } = useAppSelector((state) => state.bannerSearch);
  const {
    data: courseData = {},
    isLoading: courseLoading,
    error,
  } = useGetSingleCourseQuery(courseId);
  // console.log('🚀 ~ MilestoneHomeList ~ courseDataM:', courseData);

  const query: Record<string, any> = {};
  query['limit'] = 999999;
  query['sortOrder'] = 'asc';
  query['status'] = 'active';
  query['isDelete'] = ENUM_YN.NO;
  const {
    data,
    isLoading,
    error: milestoneError,
  } = useGetAllMilestoneQuery({
    course: courseId,
    module: 'yes',
    ...query,
  });

  const milestoneData = data?.data || [];

  if (error || milestoneError) {
    console.log(error, milestoneError);
  }
  // console.log(courseData);
  return (
    <>
      {isLoading || courseLoading ? (
        <LoadingSkeleton number={20} />
      ) : (
        <div
          style={{
            marginTop: '1.5rem',
          }}
          className="container relative mx-auto"
        >
          <div className="flex-col items-center justify-center gap-2">
            <h1 className="text-center text-lg uppercase text-black lg:text-2xl">
              {courseData?.title}{' '}
            </h1>
            {courseData?.syllabus && (
              <div>
                <ModalComponent
                  button={
                    <div className="flex items-center justify-center">
                      <p className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 text-base text-blue-400">
                        <FaBook /> (See Syllabus)
                      </p>
                    </div>
                  }
                >
                  <AnyFileViewer files={courseData?.syllabus} />
                </ModalComponent>
              </div>
            )}
          </div>
          <div className="my-3 line-clamp-3 text-center text-base lg:text-xl">
            {courseData?.details
              ? parse(courseData?.details)
              : courseData?.short_description}
          </div>
          <Divider
            style={{
              color: 'red',
              fontSize: '5px',
              background: 'red',
            }}
          />
          <div className="">
            {milestoneData.length ? (
              <div className="mx-auto w-full gap-3 py-3">
                {milestoneData?.map(
                  (milestone: IMilestoneData, index: number) => {
                    return (
                      <SingleMilestone
                        key={index}
                        milestoneData={milestone}
                        index={index}
                      />
                    );
                  },
                )}
              </div>
            ) : (
              <div>
                <p className="min-h-10 text-center text-lg font-bold">
                  No Module found for this course.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MilestoneHomeList;
// export default dynamic(() => Promise.resolve(MilestoneList), {
//    ssr: false,
//  });
