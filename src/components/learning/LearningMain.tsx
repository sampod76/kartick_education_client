'use client';
import { ENUM_YN } from '@/constants/globalEnums';
import { useGetAllCourseQuery } from '@/redux/api/adminApi/courseApi';
import { EllipsisMiddle } from '@/utils/CutTextElliples';
import { useEffect, useState } from 'react';
import LoadingSkeleton from '../ui/Loading/LoadingSkeleton';

import { useGetAllCourse_labelQuery } from '@/redux/api/adminApi/courseLevelApi';
import { ICourseLevelData } from '@/types/courseLevelDataType';
import { ICourseData } from '@/types/courseType';
import { Button, Modal } from 'antd';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import Arrow from '../../assets/svg/Arrow.svg';
import BannerLearning from '../Home/Banner&hero/BannerLearning';
export default function LearningMain() {
  const router = useRouter();
  const [learningCategoryId, setLearningCategoryId] = useState<string | null>(
    null,
  );
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleOpen = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };
  const searchParams = useSearchParams();
  const encodedData = searchParams.get('data');
  // Check if encodedData is not null and not an empty string before decoding
  const decodedData =
    encodedData && encodedData.trim() !== ''
      ? decodeURIComponent(encodedData)
      : '';
  let queryData;
  try {
    if (decodedData) {
      queryData = JSON.parse(decodedData);
    }
  } catch (error) {
    // Handle the error, log it, or provide a default value for queryData
    console.error('Error parsing JSON:', error);
    queryData = {}; // Provide a default value if parsing fails
  }
  const [selectLabelData, setLabelData] = useState<any>({});
  const query: Record<string, any> = {};
  query['limit'] = 999999;
  query['sortOrder'] = 'asc';
  query['status'] = 'active';
  query['isDelete'] = ENUM_YN.NO;

  const categoryId = queryData?.categoryId;
  let labelQuery = { ...query };

  labelQuery['limit'] = 999999;
  labelQuery['sortOrder'] = 'asc';
  labelQuery['status'] = 'active';
  labelQuery['isDelete'] = ENUM_YN.NO;
  labelQuery['category'] =
    categoryId || learningCategoryId || '63621c9cc6e03d494145bea0';
  // console.log("🚀 ~ LearningMain ~ labelQuery:", labelQuery)

  // console.log(labelQuery);

  const {
    data: courseLevelData,
    isLoading: courseLevelLoading,
    error: categoryLevelError,
  } = useGetAllCourse_labelQuery({ ...labelQuery });
  // console.log("🚀 ~ LearningMain ~ courseLevelData:", courseLevelData);

  let courseQuery = { ...query };
  if (selectLabelData?._id) {
    courseQuery['label_id'] = selectLabelData?._id;
  } else {
    courseQuery['label_id'] = '63621c9cc6e03d494145bea0'; //only damping
  }
  // console.log(courseQuery)
  const {
    data: courseAllData,
    isLoading,
    error,
  } = useGetAllCourseQuery({ ...courseQuery }) as any;

  if (error || categoryLevelError) {
  }

  // ! for categoryModal //
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (categoryId: string) => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setLabelData(courseLevelData?.data[0] || '');
  }, [courseLevelData?.data]);

  if (courseLevelLoading || isLoading) {
    return <LoadingSkeleton />;
  }

  // console.log(learningCategoryId, 'learningCategoryId')
  // console.log(courseAllData?.data, "hyfghygf");

  return (
    <div
      className="bg-opacity relative"
      style={
        {
          // backgroundColor: "#EBFFE3",
          // opacity:0.05
        }
      }
    >
      {/* //! for bg opacity color */}
      {/* <div className={`absolute top-0 left-0 w-full h-full bg-[${color}] bg-opacity-20`}></div> */}

      <div className="-mt-[5.8rem] mb-4 lg:mb-6">
        <div className="min-h-[7rem] w-full bg-[#BEDDF9]"></div>
        <BannerLearning
          learningCategoryId={learningCategoryId}
          setLearningCategoryId={setLearningCategoryId}
        />
      </div>
      {/* <CourseStatistics courseId={learningCategoryId || courseFirstData?._id} /> */}

      {isLoading ? (
        <LoadingSkeleton number={40} />
      ) : (
        <div
          style={{
            marginTop: '1.8rem',
          }}
          className="container relative mx-auto mt-12 min-h-screen rounded-xl p-2 py-2 md:mt-6 md:py-3 lg:mt-5 lg:py-5 xl:mt-6 xl:py-6"
        >
          <h2
            style={{
              fontFamily: 'Latao',
            }}
            className="text-center text-2xl font-normal uppercase text-black sm:text-3xl md:text-4xl"
          >
            {selectLabelData?.categoryDetails?.title
              ? courseLevelData?.data[0]?.categoryDetails?.title
              : ''}
          </h2>

          <p className="my-3 text-center text-lg lg:text-xl">
            <EllipsisMiddle suffixCount={3} maxLength={120}>
              {selectLabelData?.categoryDetails?.short_description ||
                courseLevelData?.data[0]?.categoryDetails?.short_description}
            </EllipsisMiddle>
          </p>
          {/*//! label button */}

          <div className="mt-3 items-start md:mt-3 lg:mt-5 xl:mt-7">
            {/*//! label section */}
            <div className="w-full">
              <div className="relative mr-2 mt-3 flex w-full flex-col gap-3 justify-self-start">
                <hr />
                {courseLevelData?.data?.map(
                  (label: ICourseLevelData, index: number) => (
                    <div key={index}>
                      <div className="flex justify-between pr-2">
                        <button
                          onClick={() => {
                            toggleOpen(index), setLabelData(label);
                          }}
                          key={label?._id}
                          className={`relative px-3 py-2 text-xl font-bold text-[#1C3052]`}
                          style={
                            {
                              // background: color,
                            }
                          }
                        >
                          <div
                            className={`h-full] absolute left-0 top-0 w-full`}
                          ></div>
                          {label?.title}
                        </button>
                        <Image
                          style={{
                            transform: `${
                              openIndex === index
                                ? 'rotate(180deg)'
                                : 'rotate(0deg)'
                            }`,
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            toggleOpen(index), setLabelData(label);
                          }}
                          src={Arrow}
                          alt=""
                        />
                      </div>

                      {openIndex === index && (
                        <div className="mt-3 w-full md:mt-2 lg:mt-0 xl:mt-0">
                          <div className="">
                            <div className="relative grid grid-cols-1 gap-3 px-3 py-3 lg:grid-cols-4">
                              {/*//! for background opacity */}
                              <div
                                className={`absolute left-0 top-0 w-full bg-[#CCEDBC] bg-opacity-30`}
                              ></div>
                              {courseAllData?.data?.length > 0 ? (
                                courseAllData?.data?.map(
                                  (course: ICourseData, index: number) => (
                                    // console.log()

                                    <div
                                      key={course?._id}
                                      className="flex flex-col gap-5 rounded-lg border-2 p-2 text-center"
                                    >
                                      <h1 className="text-[22px]">
                                        {index + 1}. {course?.title}
                                      </h1>
                                      <h1 className="text-[#FB8500]">
                                        ${course?.price}
                                      </h1>
                                      <div className="justify-between gap-2 px-2 sm:flex">
                                        <h1
                                          className="w-full cursor-pointer rounded-md bg-[#5371FB] p-2 font-bold text-white hover:bg-[#4365fb]"
                                          onClick={() => {
                                            router.push(
                                              `/payment/checkout/${course._id}?category=${course?.category?._id}?categoryName=${course?.category?.title}?courseName=${course.title}`,
                                            );
                                          }}
                                        >
                                          Buy Now
                                        </h1>
                                        <h1
                                          className="mt-3 w-full cursor-pointer rounded-md bg-[#5371FB] p-2 font-semibold text-white hover:bg-[#4365fb] sm:mt-0"
                                          onClick={() => {
                                            router.push(
                                              `/course/milestone/${course._id}?category=${course?.category?._id}?categoryName=${course?.category?.title}?courseName=${course.title}`,
                                            );
                                          }}
                                        >
                                          Visit Now
                                        </h1>
                                      </div>
                                    </div>
                                    //     <Popconfirm
                                    //       title="Do you want to purchase?"
                                    //       // description="Are you sure to delete this task?"
                                    //       //   icon={<QuestionCircleOutlined style={{ color: 'red' }} />
                                    //       // }
                                    //       key={course?._id}
                                    //       onConfirm={() => {
                                    //         router.push(
                                    //           `/course/milestone/${course._id}?category=${course?.category?._id}?categoryName=${course?.category?.title}?courseName=${course.title}`
                                    //         );
                                    //       }}
                                    //       okText="View Course"
                                    //       onCancel={() => {
                                    //         router.push(
                                    //           `/payment/checkout/${course._id}?category=${course?.category?._id}?categoryName=${course?.category?.title}?courseName=${course.title}`
                                    //         );
                                    //       }}
                                    //       cancelText="BUY NOW"
                                    //     >
                                    //       <Button
                                    //         style={{
                                    //           border: "0px",
                                    //           boxShadow: "0px",
                                    //           fontSize: "1.125rem",
                                    //           textAlign: "start",
                                    //         }}
                                    //       >
                                    //         {index + 1}. {course?.title}
                                    //       </Button>
                                    //       {/* <Link
                                    //   href={`/course/milestone/${course._id}?category=${course?.category?._id}?categoryName=${course?.category?.title}?courseName=${course.title}`}
                                    //   className="text-gray-900 text-start flex justify-start gap-1 cursor-pointer"
                                    // >
                                    //   <p className="text-lg">
                                    //     {" "}
                                    //     {index + 1}. {course?.title}
                                    //   </p>

                                    // </Link> */}
                                    //     </Popconfirm>
                                  ),
                                )
                              ) : (
                                <div>
                                  <p className="flex justify-start gap-1 text-start text-gray-900">
                                    <p className="text-center text-lg">
                                      {' '}
                                      No data found
                                    </p>
                                    {/* <LockOutlined /> */}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      <hr />
                    </div>
                  ),
                )}
                <div className="mt-3 flex items-center justify-center gap-5">
                  {/* <button className="bg-white shadow-lg p-2 rounded-lg border-2 border-[#92E3A9] text-[#92E3A9] text-lg font-bold">BUY NOW</button> */}
                  {/* <Link
                    href={'/subscription'}
                    className="rounded-lg border-2 border-blue-500 bg-white p-2 text-lg font-bold text-blue-500 shadow-lg"
                  >
                    <p>Check Out Our MEMBERSHIP</p>
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* //! lebel modal */}

      <Modal
        title="Select Level"
        open={isModalOpen}
        style={{ top: 20 }}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <Button onClick={handleOk}>Ok </Button>
          </>
        )}
      >
        <div
          onClick={handleCancel}
          className="mt-3 flex w-full flex-col gap-3 justify-self-start"
        >
          {courseLevelData?.data?.map((label: ICourseLevelData) => (
            <button
              onClick={() => setLabelData(label?._id)}
              key={label?._id}
              className="rounded-r-lg px-3 py-2 text-xl font-bold text-[#1C3052]"
              style={{
                background: '#C3C399',
              }}
            >
              {label?.title}
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}
