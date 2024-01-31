"use client";
import React from "react";

import { IDecodedInfo, getUserInfo } from "@/services/auth.service";
import { IPurchasedData } from "@/types/package/purchasedType";
import SInglePurchased from "./SinglePurchasedCard";
import { useGetAllPurchaseAcceptedPackageQuery } from "@/redux/api/public/purchaseAPi";

export default function UserPurchased() {
  const userInfo = getUserInfo() as IDecodedInfo;
  const { data: purchasedData } = useGetAllPurchaseAcceptedPackageQuery({
    status: "active",
    limit: 99999,
    user: userInfo?.id,
  });
  return (
    <div>
      <div className="grid grid-cols-1 gap-2">
        {purchasedData?.data?.map((item: IPurchasedData, index: number) => {
          return <SInglePurchased packages={item} key={index + 1} />;
        })}
      </div>
    </div>
  );
}
