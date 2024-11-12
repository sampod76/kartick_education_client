import BannerMemberShip from "@/components/Home/Banner&hero/BannerMemberShip";
import Membership from "@/components/subscription/MemberShip";
import Subscription from "@/components/subscription/Subscription";
import React from "react";

export default function SubscriptionPage() {
  return (
    <div>
      {/* <div className="-mt-[2rem] mb-4 lg:mb-6 ">
        <div className="w-full min-h-[3.3rem] bg-[#BEDDF9]"></div>
        <BannerMemberShip />
      </div> */}
       {/* <Subscription />  */}
      {/* new changes here*/}
       <Membership /> 
    </div>
  );
}
