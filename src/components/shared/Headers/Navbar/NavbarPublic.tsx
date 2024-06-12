"use client";
import { Button, Menu } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import Logo from "../../Logo";
import React, { useEffect, useMemo, useState } from "react";
import SideBarHome from "./SideBarHome";
import { homeNavItems } from "@/constants/HomeNabItems";
import UserAvatarUI from "@/components/ui/NavUI/UserAvatarUI";
import Link from "next/link";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { IDecodedInfo, getUserInfo } from "@/services/auth.service";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleCartModal } from "@/redux/features/cartSlice";
import { usePathname } from 'next/navigation'
const NavbarPublic = () => {
  // const screens = useBreakpoint();
  // const userInfo = getUserInfo() as IDecodedInfo
  const pathname = usePathname()
  console.log("🚀 ~ NavbarPublic ~ pathname:", pathname)
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

  const dispatch = useAppDispatch();
  const { cartModal } = useAppSelector((state) => state.cart);

  // if (userInfo?.id) {
  //   homeNavItems?.push({
  //     label: (
  //       <Link className="text-base font-thin font-serif capitalize" href="/">
  //         Analytic
  //       </Link>
  //     ),
  //     key: "Analytic",
  //   },)

  // }

  // console.log(homeNavItems, 'homeNavItems')

  const navItemsHome = homeNavItems(userInfo?.role ? userInfo.role : null);
  // console.log(homeNavItems(userInfo?.role ? userInfo.role : null), 'iiiiiiii')
  return (




    <div className={`w-full bg-white lg:w-[84%] mx-auto rounded-b-[50px]  backdrop-blur-xl  block md:flex lg:flex xl:flex items-center justify-between py-2 border-slate-500 px-[2em] `}>
      <nav
        className="text-[#dedee0 text-black py-[8px md:pt-[0.9em  
    flex align-center justify-between gap-[5rem]"
      >
        <Logo />
        {/* {userInfo?.role &&
          <button onClick={() => dispatch(toggleCartModal(true))}>Your Cart <ShoppingCartOutlined /> </button>
        } */}
        <Menu
          mode="horizontal"
          className="hidden md:flex lg:flex xl:flex items-center"
          style={{
            // color:"#5371FF"
            fontWeight: "700",
            // fontSize: "15px",
            fontFamily: "roboto",
            // backdropBlur:"blur(8px)"
            // display:`${screens.sm ? "flex":"none"}`
            // background: `${pathname === '/contact' || pathname === '/analytics' ? "#C2C4CB" : "none"}  `,
            background: "none",
            backdropFilter: "blur(80px)",
            boxShadow: "none",
            color: `black`,
            // fontWeight:"700"
          }}
          disabledOverflow
          items={navItemsHome}
        // items={() => userInfo?.role ? userInfo.role : null)}
        // items={() => homeNavItems(userInfo?.role ? userInfo.role : null)}
        />

        <div
          className="flex  md:hidden lg:hidden xl:hidden "
        // style={{
        //   display: `${screens.sm ? "none" : "flex"}`,
        // }}
        >
          <SideBarHome userInfo={userInfo} userInfoLoading={userInfoLoading}></SideBarHome>
        </div>
      </nav>

      <div className="hidden md:flex lg:flex xl:flex gap-2 items-center ">
        <div className="hidden md:flex lg:flex xl:flex items-center ">
          <Link
            href="/subscription"
            className="cursor-pointer font-semibold overflow-hidden relative z-100 border bg-gray-200 group px-5 md:px-3 py-1 md:py-0 lg:py-1 xl:py-2   rounded-lg uppercase "
          >
            <span className="relative z-10 text-black group-hover:text-blue-600 text-lg md:text-sm lg:text-sm  xl:text-lg duration-500">
              Membership
            </span>
            
          </Link>
        </div>
        <div className="flex justify-between items-center gap-1 lg:mt-0 ">
          {userInfoLoading ? (
            <div className="bg-white w-[50px] h-[50px] rounded-full shadow-md animate-pulse"></div>
          ) : userInfo?.id ? (
            <UserAvatarUI />
          ) : (
            <div
              className="flex  font-[700]  max-h-[2.7rem] lg:max-h-[3.3rem]
         "
            >
              <Link
                href="/login"
                className="cursor-pointer font-semibold overflow-hidden relative z-100 group px-5 md:px-3 py-1 md:py-0 lg:py-1 xl:py-2  bg-white rounded-[36px] uppercase "
              >
                <span className="relative z-10 text-black font-semibold group-hover:text-blue-600 text-lg md:text-sm lg:text-sm  xl:text-lg duration-500 mx-3">
                  Login 

                </span>
                
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarPublic;
