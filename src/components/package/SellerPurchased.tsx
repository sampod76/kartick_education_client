"use client";
import React from "react";
import { useGetPurchasePackageQuery } from "@/redux/api/public/paymentApi";
import { IDecodedInfo, getUserInfo } from "@/services/auth.service";
import { IPurchasedData } from "@/types/purchasedType";
import SInglePurchased from "./SinglePurchasedCard";
import { ENUM_YN } from "@/constants/globalEnums";
import LoadingSkeleton from "../ui/Loading/LoadingSkeleton";

export default function SellerPurchased() {
  const userInfo = getUserInfo() as IDecodedInfo;
  const { data: purchasedData, isLoading } = useGetPurchasePackageQuery({
    status: "active",
    isDelete: ENUM_YN.NO,
    limit: 99999,
    user: userInfo?.id,
  });

  if (isLoading) {
    return <LoadingSkeleton number={10} />;
  }
  console.log("🚀 ~ SellerPurchased ~ purchasedData:", purchasedData);
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {purchasedData?.data?.map((item: IPurchasedData, index: number) => {
          return <SInglePurchased packages={item} key={index + 1} />;
        })}
      </div>
    </div>
  );
}
