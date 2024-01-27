"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";

import UserAvatarUI from "@/components/ui/NavUI/UserAvatarUI";
import { IDecodedInfo, getUserInfo } from "@/services/auth.service";
import SocialGroup from "../socialIcon/SocialGroup";

const TopBar = () => {
  const [userLoggedIn, setUserLoggedIn] = useState<Partial<IDecodedInfo>>({
    email: "",
    id: "",
    role: undefined,
  });

  useEffect(() => {
    // Fetch user info asynchronously on the client side
    const fetchUserInfo = async () => {
      const userInfo = (await getUserInfo()) as any;
      setUserLoggedIn(userInfo);
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="py-1 lg:py-2 bg-primary text-white px-2 lg:px-4 block lg:flex items-center justify-between gap-5">
      <section className="hidden lg:flex lg:flex-col">
        <h2 className="font-[800] text-md lg:text-[17px]">
          ATTEND ORIENTATION! IBL SCHOOL STORE!{" "}
        </h2>
        <div className="font-[700] flex gap-2 text-[15px]">
          <h4 className=" "> 1866 303121 231</h4>
          <h4 className="text-base font-normal">
            info.iblossomelearn@gmail.com
          </h4>
        </div>
      </section>
      <section className="flex justify-between gap-3 lg:mt-0 ">
        <SocialGroup />
        {userLoggedIn?.email ? (
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
      </section>
    </div>
  );
};

export default TopBar;
// export default dynamic(() => Promise.resolve(TopBar), {
//   ssr: false,
// });
