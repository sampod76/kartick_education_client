'use client';
import { AllImage } from '@/assets/AllImge';
import { useGetSingleCourseQuery } from '@/redux/api/adminApi/courseApi';
import Image from 'next/image';
import { useGlobalContext } from '../ContextApi/GlobalContextApi';
import GlobalLoading from '../Loader/GlobalLoading';
import StripeCheckoutByCourse from '../payment/methord/StripeCheckoutByCourse';
import UserAvatarUI from '../ui/NavUI/UserAvatarUI';

export default function Checkout({ courseId }: { courseId?: string }) {
  // const userInfo = getUserInfo() as any;
  const { userInfo, userInfoLoading } = useGlobalContext();

  const { data, isLoading } = useGetSingleCourseQuery(courseId, {
    skip: !Boolean(courseId),
  });

  if (userInfoLoading || isLoading) {
    return <GlobalLoading />;
  }
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      {/* User Info */}
      <div className="container mx-auto mb-6 flex items-center gap-3 text-lg">
        <UserAvatarUI />
        <h5 className="text-xl text-gray-700">
          Logged in as {userInfo?.email}
        </h5>
      </div>

      {/* Order Summary */}
      <div className="container mx-auto">
        <h1 className="mb-4 text-2xl font-semibold text-gray-800">
          Your Order
        </h1>
        <div className="overflow-hidden rounded-lg bg-white shadow-lg">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-5">Item</th>
                <th className="p-5">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td className="flex items-center gap-4 p-5">
                  <Image
                    src={data?.img || AllImage.notFoundImage}
                    width={500}
                    height={500}
                    alt="course border-none"
                  />
                  <h2 className="whitespace-nowrap text-xl">{data?.title}</h2>
                </td>
                <td className="p-5 text-xl font-bold text-purple-600">
                  ${data?.price}
                </td>
              </tr>
              <tr className="border-t bg-gray-100">
                <td className="p-5">Total</td>
                <td className="p-5 text-xl font-bold text-purple-700">
                  ${data?.price}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Additional Notes and Payment */}
        <div className="mt-8 rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-3 text-lg font-semibold">Additional Note</h2>
          <textarea
            className="h-24 w-full rounded-md border border-gray-300 p-3 outline-none focus:ring focus:ring-purple-300"
            placeholder="Add any additional notes here..."
          ></textarea>

          <div className="mt-8">
            {/* <PaypalCheckoutByCourse courseData={data} /> */}
            <StripeCheckoutByCourse courseData={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
