'use client';
import { SnippetsOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { CgPlayButtonO } from 'react-icons/cg';
import { FaUsers } from 'react-icons/fa';
import HomeCourseImage from '../../../assets/svg/HomeCourse1.svg';
import HomeCourseImage2 from '../../../assets/svg/HomeCourse2.svg';
import HomeCourseImage3 from '../../../assets/svg/HomeCourse3.svg';
import HomeCourseImage4 from '../../../assets/svg/HomeCourse4.jpg';
import HomeCourseImage5 from '../../../assets/svg/HomeCourse5.jpg';
import HomeCourseImage6 from '../../../assets/svg/HomeCourse6.jpg';
const { Meta, Grid } = Card;
// import { AllImage } from "@/assets/AllImge";

import { useAddCartMutation } from '@/redux/api/userApi/cartAPi';
import { ICourseData } from '@/types/courseType';
import { Error_model_hook, Success_model } from '@/utils/modalHook';
import { Typography } from 'antd';

import { useGlobalContext } from '@/components/ContextApi/GlobalContextApi';
import fileObjectToLink from '@/utils/fileObjectToLink';
import { useRouter } from 'next/navigation';
const { Text } = Typography;

const SIngleCourse = ({ course }: { course: any }) => {
  console.log('🚀 ~ SIngleCourse ~ course:', course);
  const { userInfo, userInfoLoading } = useGlobalContext();
  // console.log("🚀 ~ SIngleCourse ~ userInfo:", userInfo);
  const router = useRouter();

  const [addCart] = useAddCartMutation();
  const arr = [
    ' ',
    HomeCourseImage,
    HomeCourseImage2,
    HomeCourseImage3,
    HomeCourseImage4,
    HomeCourseImage5,
    HomeCourseImage6,
  ];

  let indexArray = Math.floor(Math.random() * 6 + 1);

  const addToCartHandler = async (CartCourse: ICourseData) => {
    // dispatch(addToCart(CartCourse))

    const cartData = {
      course: CartCourse?._id,
      user: userInfo?.id,
    };

    try {
      const res = await addCart(cartData).unwrap();
      // console.log(res);
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model(`${CartCourse?.title} added to Cart`);
      }
      // console.log(res);
    } catch (error: any) {
      Error_model_hook(error?.message);
      console.log(error);
    }
    // console.log(cartData, 'cartData')
  };

  return (
    <>
      <div className="mx-auto flex h-full w-full flex-col justify-between rounded-xl bg-[#f5eeeebd] py-2 shadow-xl md:w-full">
        <div className="flex cursor-pointer items-center justify-center">
          <Link
            href={`/course/milestone/${course?._id}?categoryName=${
              course?.category?.title
            }&courseName=${course?.title}&category=${
              course?.category?._id || course?.category
            }`}
            className=""
          >
            <Image
              alt=""
              width={1500}
              height={100}
              className="h-[220px] w-full rounded-md"
              src={fileObjectToLink((course?.image as any) || course?.img)}
            />
          </Link>
        </div>
        <div className="mt-3 flex h-1/2 flex-col justify-between">
          <div className="px-2 py-2">
            <div className="flex items-center justify-center">
              <Link
                href={`/course/milestone/${course?._id}?categoryName=${
                  course?.category?.title
                }&courseName=${course?.title}&category=${
                  course?.category?._id || course?.category
                }`}
                className=""
              >
                <h3 className="line-clamp-2 text-center text-[16px] text-black">
                  {course?.title}
                </h3>
                <p className="line-clamp-1 text-center text-[16px] text-black">
                  {course?.labelDetails?.title
                    ? `(${course?.labelDetails?.title})`
                    : ''}
                </p>
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between gap-2 px-2 py-1 text-xs text-gray-900 sm:text-sm">
              <span className="font-regular flex w-full flex-row items-center justify-center whitespace-nowrap rounded-md bg-primary p-2 py-1 text-white">
                <CgPlayButtonO className="mr-1 text-lg font-extrabold text-white" />{' '}
                {course?.totalModuleSize || 0} Modules
              </span>

              <span className="flex w-full items-center justify-center gap-1 whitespace-nowrap rounded-md bg-primary p-2 py-1 text-white">
                <SnippetsOutlined style={{ color: '#FFFFFF', font: 'bold' }} />
                {course?.totalLessonSize || 0} Lessons
              </span>
              <span className="flex w-full items-center justify-center gap-1 whitespace-nowrap rounded-md bg-primary p-2 py-1 text-white">
                <FaUsers /> {course?.totalEnrollStudentSize || 0} Students
              </span>
            </div>
            <div className="w-full px-4 pb-4">
              <div className="w-full rounded-3xl border-4 border-primary p-1">
                <Button
                  // href= {`/payment/checkout/${course?._id}?categoryId=${course?.category}`}
                  onClick={() => {
                    console.log('first');
                    router.push(
                      `/payment/checkout/${course?._id}?categoryId=${course?.category}`,
                    );
                  }}
                  type="default"
                  className="flex w-full cursor-pointer items-center justify-center !rounded-3xl bg-primary text-center text-lg font-bold text-white hover:text-primary"
                >
                  Enroll Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SIngleCourse;
