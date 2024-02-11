"use client";

import React, { useEffect, useMemo, useState } from "react";

import Link from "next/link";

import UserAvatarUI from "@/components/ui/NavUI/UserAvatarUI";
import { IDecodedInfo, getUserInfo } from "@/services/auth.service";
import SocialGroup from "../socialIcon/SocialGroup";

const TopBar = () => {
  const [userInfoLoading, setUserInfoLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<Partial<IDecodedInfo>>({
    email: "",
    id: "",
    role: undefined,
  });

  const memoizedFetchUserInfo = useMemo(
    () => async () => {
      const userInfo = await getUserInfo();
      setUserInfo(userInfo);
      setUserInfoLoading(false);
    },
    []
  ); // Empty dependency array means this function will be memoized once

  useEffect(() => {
    // Call the memoized function to fetch user info asynchronously
    memoizedFetchUserInfo();
  }, [memoizedFetchUserInfo]);

  return (
    <div className="py-1 lg:py-2 bg-primary text-white px-2 lg:px-4 block lg:flex items-center justify-between gap-5 ">
      <div className="hidden lg:flex lg:flex-col">
        <h2 className="font-[800] text-md lg:text-[17px] ml-1">
          ATTEND ORIENTATION! IBL SCHOOL STORE!{" "}
        </h2>
        <div className="font-[700] flex gap-2 text-[15px]">
          <h4 className=" "> 1866 303121 231</h4>
          <h4 className="text-base font-normal">
            info.iblossomelearn@gmail.com
          </h4>
        </div>
      </div>
      <div className="flex justify-between gap-3 lg:mt-0 ">
        <SocialGroup />
        {userInfoLoading ? (
          <div className="bg-white w-[50px] h-[50px] rounded-full shadow-md animate-pulse"></div>
        ) : userInfo?.email ? (
          <UserAvatarUI />
        ) : (
          <div
            className="flex gap-3 font-[700]  max-h-[2.7rem] lg:max-h-[3.3rem]
         "
          >
            <Link
              className="py-2 lg:py-3 px-2 w-[5rem] lg:w-[6rem]  lg:px-3  rounded-tl-[20px] rounded-br-[20px] bg-secondary border-2 border-white text-center"
              href="/signup"
            >
              Register
            </Link>
            <Link
              className="py-2 lg:py-3 px-3 w-[5rem] lg:w-[6rem]  lg:px-3 rounded-tl-[20px] rounded-br-[20px] bg-white text-secondary border-2 border-secondary ms-1 text-center"
              href="/login"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
// export default dynamic(() => Promise.resolve(TopBar), {
//   ssr: false,
// });
