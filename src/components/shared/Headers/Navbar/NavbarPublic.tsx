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
    <div className="w-full lg:w-[80%] mx-auto bg-transparent rounded-b-[50px]  backdrop-blur  block lg:flex  items-center justify-between border-b border-slate-500 px-[2em]">
      <nav
        className=" text-black py-[8px] md:pt-[0.9em]  
    flex align-center justify-between gap-[5rem] "
      >
        <Logo />
        {/* {userInfo?.role &&
          <button onClick={() => dispatch(toggleCartModal(true))}>Your Cart <ShoppingCartOutlined /> </button>
        } */}
        <Menu
          mode="horizontal"
          className="hidden lg:flex"
          style={{
            // color:"#5371FF"
            fontWeight: "700",
            fontSize: "15px",
            fontFamily: "roboto",
            // backdropBlur:"blur(8px)"
            // display:`${screens.sm ? "flex":"none"}`
            background: "none",
            backdropFilter: "blur(80px)",
            boxShadow: "none",
            color: `${pathname === '/' ? "white" : "black"}`,
            // fontWeight:"700"
          }}
          disabledOverflow
          items={navItemsHome}
        // items={() => userInfo?.role ? userInfo.role : null)}
        // items={() => homeNavItems(userInfo?.role ? userInfo.role : null)}
        />

        <div
          className="flex lg:hidden"
        // style={{
        //   display: `${screens.sm ? "none" : "flex"}`,
        // }}
        >
          <SideBarHome userInfo={userInfo}></SideBarHome>
        </div>
      </nav>
      <div className=" hidden lg:flex  justify-start items-center gap-2">
        <div className="hidden lg:flex ">
          <Link
            href="/subscription"
            className="cursor-pointer font-semibold overflow-hidden relative z-100 border border-[#5F8122] group px-5 py-2 bg-white rounded-[36px] uppercase "
          >
            <span className="relative z-10 text-[#5F8122] group-hover:text-white text-lg duration-500">
              Membership
            </span>
            <span className="absolute w-full h-full bg-[#5F8122] -left- top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
            <span className="absolute w-full h-full bg-[#5F8122] -right- top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
          </Link>
        </div>
        <div className="flex justify-between gap-1 lg:mt-0 ">
          {userInfoLoading ? (
            <div className="bg-white w-[50px] h-[50px] rounded-full shadow-md animate-pulse"></div>
          ) : userInfo?.email ? (
            <UserAvatarUI />
          ) : (
            <div
              className="flex  font-[700]  max-h-[2.7rem] lg:max-h-[3.3rem]
         "
            >

              <Link
                href="/login"
                className="cursor-pointer font-semibold overflow-hidden relative z-100 border border-[#5F8122] group px-5 py-2 bg-white rounded-[36px] uppercase "
              >
                <span className="relative z-10 text-[#5F8122] group-hover:text-white text-lg duration-500">
                  Login
                </span>
                <span className="absolute w-full h-full bg-[#5F8122] -left- top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
                <span className="absolute w-full h-full bg-[#5F8122] -right- top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarPublic;
