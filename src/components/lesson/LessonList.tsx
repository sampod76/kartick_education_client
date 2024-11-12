'use client';
import { ENUM_YN } from '@/constants/globalEnums';
import { useGetAllLessonQuery } from '@/redux/api/adminApi/lessoneApi';
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  RightCircleOutlined,
} from '@ant-design/icons';
import { Button, Collapse, Empty } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import LoadingSkeleton from '../ui/Loading/LoadingSkeleton';

import QuizIcon from '@/assets/svg/quizIcon';
import { useGetCoursePermissionQuery } from '@/redux/api/adminApi/courseApi';
import parse from 'html-react-parser';
import { useGlobalContext } from '../ContextApi/GlobalContextApi';
import ModalComponent from '../Modal/ModalComponents';
import LessonContainShow from './LessonContainShow';

export default function LessonList({
  moduleId,
  moduleData,
}: {
  moduleId: string;
  moduleData: any;
}) {
  const { userInfo } = useGlobalContext();
  const [currentCollapse, setCurrentCollapse] = useState<string[]>([]);
  //! for purchased data of a user
  const categoryId =
    moduleData?.category || moduleData?.milestone?.course?.category?._id;
  const courseId = moduleData?.course || moduleData?.milestone?.course?._id;

  let IsExistPremonitionCourse: any = false;

  //! for Course options selection
  const lesson_query: Record<string, any> = {};
  lesson_query['limit'] = 999999;
  lesson_query['sortBy'] = 'lesson_number';
  lesson_query['sortOrder'] = 'asc';
  lesson_query['status'] = 'active';
  lesson_query['needProperty'] = 'assignment,quizzes';
  lesson_query['isDelete'] = ENUM_YN.NO;

  const { data: lessonData, isLoading } = useGetAllLessonQuery({
    module: moduleId,
    ...lesson_query,
  });
  console.log(lessonData, 'lessonData');
  const { data: checkPurchase, isLoading: CheckPurchaseLoading } =
    useGetCoursePermissionQuery({ course: courseId });
  // console.log("🚀 ~ checkPurchase:", checkPurchase);
  if (checkPurchase?.data) {
    IsExistPremonitionCourse = !!checkPurchase?.data;
  }
  // const quiz_query: Record<string, any> = {};
  // //! for Course options selection
  // quiz_query['limit'] = 999999;
  // quiz_query['isDelete'] = ENUM_YN.NO;
  // const { data: QuizData, isLoading: quizLoading } = useGetAllQuizQuery({
  //   status: 'active',
  //   isDelete: ENUM_YN.NO,
  //   module: moduleId,
  //   ...quiz_query,
  // });

  if (isLoading || CheckPurchaseLoading) {
    return <LoadingSkeleton />;
  }

  const playerVideoFunc = (lesson: any, index?: number) => {
    if (
      IsExistPremonitionCourse ||
      lesson?.lesson_number == (0 || 1)
      // || index === 0//! for first open video
    ) {
      return (
        // <ModalInComponent
        //   button={
        //     <div className="flex items-center justify-center">
        //       <Button type="primary">Click To Open</Button>
        //     </div>
        //   }
        // >
        //   <LessonContainShow lesson={lesson} />
        // </ModalInComponent>
        <ModalComponent
          button={
            <div className="flex items-center justify-center">
              <Button type="primary">Click To Open</Button>
            </div>
          }
          width={1200}
          maskClosable={false}
        >
          <LessonContainShow lesson={lesson} />
        </ModalComponent>
      );
    } else {
      return (
        <div className="text-start text-base font-medium text-red-500 lg:text-lg">
          This contents is private. Please purchase this course.
        </div>
      );
    }
  };

  //! collapse data ////
  const collapseLessonData = lessonData?.data?.map(
    (lesson: any, index: number) => {
      const isLessonCollapsed = currentCollapse.includes(lesson?._id);

      ///! isExist have
      if (IsExistPremonitionCourse) {
        return {
          key: lesson?._id,
          label: (
            <div className="shadow-1 py-2 text-[18px] font-semibold md:px-1">
              <button className="flex w-full justify-between">
                <h2 className="text-start text-sm font-normal md:text-lg">
                  <span>Lesson {index + 1}: </span> {lesson?.title}
                </h2>
                {isLessonCollapsed ? (
                  <EyeInvisibleOutlined style={{ fontSize: '18px' }} />
                ) : (
                  <EyeOutlined style={{ fontSize: '18px' }} />
                )}
              </button>
            </div>
          ),
          children: (
            <div>
              <div className="">
                <div className="relative my-1 flex items-center justify-center">
                  {playerVideoFunc(lesson)}
                </div>
                {/* {lesson?.details && CutText(lesson?.details, 200)} */}
                {/* <EllipsisMiddle suffixCount={3} maxLength={300}>
                  {IsExistCategoryOrCourse && lesson?.short_description}
                </EllipsisMiddle>
                {lesson?.details && parse(lesson?.details)} */}
              </div>

              {IsExistPremonitionCourse &&
                lesson?.quizzes &&
                lesson?.quizzes?.map((quiz: any) => {
                  //// console.log(quiz)
                  return (
                    <Link
                      key={quiz?._id}
                      href={`/lesson/quiz/${quiz?._id}?lesson=${lesson?.title}&quiz=${quiz?.title}`}
                      className="mx-auto mt-3 flex justify-between text-[14px] text-[#479FEC]"
                    >
                      <h2 className="flex justify-start gap-1 text-base font-normal">
                        <span className="mt-1">
                          <QuizIcon />
                        </span>{' '}
                        Quiz : {quiz?.title}
                      </h2>

                      {/* <LockOutlined style={{ fontSize: "18px" }} /> */}
                    </Link>
                  );
                })}
              {IsExistPremonitionCourse &&
                lesson?.assignmentDetails &&
                lesson?.assignmentDetails?.map((assignment: any) => {
                  return (
                    <Link
                      key={assignment?._id}
                      href={`/lesson/assignment/${assignment?._id}?lesson=${lesson?.title}&assignment=${assignment?.title}`}
                      className="mx-auto mt-3 flex w-[86%] justify-between rounded-md border p-3 text-[14px] text-[#2b2dc7]"
                    >
                      <h2 className="text-base font-normal">
                        Assignment {index + 1} :{' '}
                        <span>{assignment?.title} </span>
                      </h2>
                      {/* <LockOutlined style={{ fontSize: "18px" }} /> */}
                    </Link>
                  );
                })}
            </div>
          ),
          // style: panelStyle,
        };
      } else {
        ///! IsExistCategoryOrCourse do not have
        return {
          key: lesson?._id,
          label: (
            <div className="shadow-1 py-2 text-[18px] font-semibold md:px-1">
              <button className="flex w-full justify-between">
                <h2 className="text-start text-base font-normal">
                  <span>Lesson {index + 1}: </span> {lesson?.title}
                </h2>
                {isLessonCollapsed ? (
                  <EyeInvisibleOutlined style={{ fontSize: '18px' }} />
                ) : (
                  <EyeOutlined style={{ fontSize: '18px' }} />
                )}
              </button>
            </div>
          ),
          children: (
            <div>
              <div className="">
                <div className="my-2 flex items-center justify-center">
                  {playerVideoFunc(lesson)}
                </div>

                <div className="line-clamp-3">
                  {IsExistPremonitionCourse && lesson?.short_description}
                </div>
                {lesson?.details && parse(lesson?.details)}
              </div>
              {/* {IsExistPremonitionCourse &&
                lessonQuizData &&
                lessonQuizData?.map((quiz: any) => {
                  return (
                    <Link
                      key={quiz?._id}
                      href={`/lesson/quiz/${quiz?._id}?lesson=${lesson?.title}&quiz=${quiz?.title}`}
                      className="mx-auto mt-3 flex w-[86%] justify-between text-[14px] text-[#479FEC]"
                    >
                      <h2 className="text-base font-normal">
                        Quiz {index + 1} : <span>{quiz?.title} </span>
                      </h2>
                      <LockOutlined style={{ fontSize: '18px' }} />
                    </Link>
                  );
                })} */}
            </div>
          ),
        };
      }
    },
  );

  const handleChange = (key: any) => {
    setCurrentCollapse(key);
  };

  return (
    <div className="mx-auto w-full px-0 lg:w-[60vw] lg:px-2">
      {collapseLessonData?.length ? (
        <Collapse
          bordered={false}
          defaultActiveKey={['1']}
          expandIcon={({ isActive }) => (
            <RightCircleOutlined
              style={{
                fontSize: '24px',

                fontWeight: 600,
                marginTop: '24px',
              }}
              rotate={isActive ? 90 : 0}
            />
          )}
          onChange={handleChange}
          // collapsible={'disabled'}
          accordion={false}
          // style={{ background: token.colorBgContainer }}
          //@ts-ignore
          items={collapseLessonData}
        />
      ) : (
        <Empty />
      )}
    </div>
  );
}
