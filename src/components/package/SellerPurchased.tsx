"use client";
import React from "react";

import { IDecodedInfo, getUserInfo } from "@/services/auth.service";
import { IPurchasedData } from "@/types/package/purchasedType";
import SInglePurchased from "./SinglePurchasedCard";
import { ENUM_YN } from "@/constants/globalEnums";
import LoadingSkeleton from "../ui/Loading/LoadingSkeleton";
import { useGetAllPurchaseAcceptedPackageQuery } from "@/redux/api/public/purchaseAPi";
import { useGetAllPackageQuery } from "@/redux/api/userApi/packageAPi";

export default function SellerPurchased() {
  const userInfo = getUserInfo() as IDecodedInfo;
  const { data: purchasedData, isLoading } = useGetAllPurchaseAcceptedPackageQuery({
    status: "active",
    isDelete: ENUM_YN.NO,
    limit: 99999,
    user: userInfo?.id,
  });

  if (isLoading) {
    return <LoadingSkeleton number={10} />;
  }
  // console.log("🚀 ~ SellerPurchased ~ purchasedData:", purchasedData);
  return (
    <div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {purchasedData?.data?.map((item: IPurchasedData, index: number) => {
          return <SInglePurchased packages={item} key={index + 1} />
        })}
      </div>
    </div>
  );
}
