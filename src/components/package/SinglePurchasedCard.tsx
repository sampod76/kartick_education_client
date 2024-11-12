'use client';
import { AllImage } from '@/assets/AllImge';
import {
  IPurchasedCategory,
  IPurchasedData,
} from '@/types/package/purchasedType';

import { EllipsisMiddle } from '@/utils/CutTextElliples';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { CiClock2 } from 'react-icons/ci';
import dayjs from 'dayjs';
import { Button } from 'antd';
import ModalComponent from '../Modal/ModalComponents';
import AddStudentComponent from '../student/addStudentByAuthor/addStudentComponent';
import { getUserInfo } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import PackageToStudent from './PackageToStudent';

export default function SInglePurchased({
  packages,
}: {
  packages: IPurchasedData;
}) {
  const router = useRouter();
  const userInfo = getUserInfo() as any;

  const navigatePackage = (getPackage: any[]) => {
    //@ts-ignore
    const data = getPackage || []; // Example nested array of objects
    const stringifiedData = JSON.stringify(data);
    const encodedData = encodeURIComponent(stringifiedData);
    const href = `/${userInfo?.role}/package_category_and_course?data=${encodedData}`;
    router.push(href);
  };

  return (
    <div className="relative min-h-full w-full cursor-pointer overflow-hidden rounded-md bg-blue-200 shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] lg:min-h-[30rem] lg:max-w-xl">
      <div onClick={() => navigatePackage(packages?.categories)}>
        <span
          className={`absolute -left-4 top-0 ml-3 rounded-md bg-white px-2 py-1 text-[16px] font-semibold capitalize`}
        >
          {packages?.purchase?.label}
        </span>

        {/* //! top title section  */}
        <div
          className={`h-28 ${
            new Date(packages?.expiry_date) < new Date()
              ? 'bg-red-600'
              : 'bg-green-700'
          } p-4 text-center`}
        >
          <h3 className="mb-1 text-xl font-semibold uppercase text-white">
            {packages?.title}
            <span className="text-sm capitalize">
              {new Date(packages?.expiry_date) < new Date() && ' (expired)'}
            </span>
          </h3>
          <p className="font-mono text-base text-slate-200">
            {packages?.user?.email}
          </p>
        </div>
        {/* //! round price  */}
        <div
          className={`mx-auto -mt-8 h-24 w-24 rounded-full shadow-xl ${
            new Date(packages?.expiry_date) < new Date()
              ? 'bg-red-600'
              : 'bg-green-700'
          } flex flex-col items-center justify-center border-4 border-white text-white transition-all duration-500 hover:brightness-125`}
        >
          <h3 className="text-2xl font-semibold">${packages?.total_price}</h3>
        </div>
        {/* //! container or Category section */}
        <div className="mt-4 px-6 py-5">
          <ul className="space-y-4">
            {/* //! for bundle type */}
            {packages?.type &&
              packages?.categories?.map((categoryData: IPurchasedCategory) => {
                const category = categoryData?.category;
                // console.log(category);
                return (
                  <li
                    className="flex items-center text-sm text-gray-500"
                    key={category?._id}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      className="mr-4 rounded-full bg-green-500 fill-white p-[3px]"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                        data-original="#000000"
                      />
                    </svg>
                    <span className="text-[16px]"> {category?.title}</span>
                    {/* <span>{category?.title}</span> */}
                    <span className="ml-2 text-[12px] text-slate-600">
                      {categoryData?.label}
                    </span>
                  </li>
                );
              })}
          </ul>
        </div>
        {/* //! Footer section  */}
        <div className="min-h-max w-full rounded bg-gray-200 px-3 py-3">
          <h4 className="mb-3 text-center text-lg uppercase">
            {' '}
            {packages?.membership?.title}
          </h4>
          <h2 className="flex justify-between text-sm capitalize">
            <span>Total Purchased: {packages?.total_purchase_student}</span>
            <span>
              Remaining Student:{' '}
              {packages?.total_purchase_student - packages?.students?.length}
            </span>
          </h2>
          <h4 className="my-2 flex justify-between">
            <span>Paid by {packages?.payment?.platform}</span>
            <span>
              {' '}
              {packages?.paymentStatus === 'approved' ? (
                <span className="rounded-sm bg-green-700 p-1 text-sm text-white">
                  Approved
                </span>
              ) : packages?.paymentStatus === 'pending' ? (
                <span className="rounded-sm bg-red-600 p-1 text-sm text-white">
                  Pending
                </span>
              ) : (
                <span className="rounded-sm bg-red-600 p-1 text-sm text-white">
                  Rejected
                </span>
              )}
            </span>{' '}
          </h4>
          <p className="mb-2 text-sm text-slate-900">
            Transaction: {packages?.payment?.transactionId}
          </p>
          <h2 className={`text-base`}>
            Expire date:{' '}
            <span
              className={`text-sm ${
                new Date(packages?.expiry_date) < new Date()
                  ? 'text-red-700'
                  : 'text-stone-700'
              } `}
            >
              {packages?.expiry_date &&
                dayjs(packages?.expiry_date).format('MMMM D, YYYY')}{' '}
              {new Date(packages?.expiry_date) < new Date() && ' (expired)'}
            </span>
          </h2>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 flex items-center justify-end">
        <ModalComponent buttonText="View Student List">
          <PackageToStudent packageId={packages?._id} />
        </ModalComponent>
      </div>
    </div>
  );
}
