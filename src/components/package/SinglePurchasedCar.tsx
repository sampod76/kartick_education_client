import { AllImage } from "@/assets/AllImge";
import { IPurchasedData } from "@/types/purchasedType";

import { EllipsisMiddle } from "@/utils/CutTextElliples";
import Link from "next/link";
import React from "react";
import { CiClock2 } from "react-icons/ci";

export default function SInglePurchased({
  packages,
}: {
  packages: IPurchasedData;
}) {
  return (
    <div
    // href={`/packages/milestone/${packages?._id}?category=${packages?.category?._id}`}
    >
      <div className="py-2">
        <div className="flex max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
          <div
            className="w-1/3 bg-cover"
            style={{
              backgroundImage: `url(${
                packages?.categories[0]?.category?.img ||
                AllImage?.notFoundImage
              })`,
            }}
          ></div>
          <div className="w-2/3 p-2">
            <h1 className="text-gray-900 font-bold text-2xl">
              {" "}
              <EllipsisMiddle suffixCount={3} maxLength={90}>
                {packages?.title}
              </EllipsisMiddle>
            </h1>
            <p className="mt-2 text-gray-600 text-sm">
              {" "}
              <EllipsisMiddle suffixCount={3} maxLength={160}>
                {packages?.membership?.title}
              </EllipsisMiddle>
            </p>
            <div className="flex item-center mt-2">
              <svg
                className="w-5 h-5 fill-current text-yellow-700"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
              </svg>
              <svg
                className="w-5 h-5 fill-current text-yellow-700"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
              </svg>
              <svg
                className="w-5 h-5 fill-current text-yellow-700"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
              </svg>
              <svg
                className="w-5 h-5 fill-current text-yellow-500"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
              </svg>
              <svg
                className="w-5 h-5 fill-current text-yellow-500"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
              </svg>
            </div>
            <div className="flex item-center justify-between mt-3">
              <h1 className="text-gray-700 font-bold text-xl">
                {packages?.purchase?.price} /{packages?.purchase?.label}
              </h1>
              <button className="px-3 py-2 bg-primary flex item-center  gap-2 text-white text-xs font-bold uppercase rounded">
                <CiClock2 className="text-white" />{" "}
                <span>{packages?.payment?.platform}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
