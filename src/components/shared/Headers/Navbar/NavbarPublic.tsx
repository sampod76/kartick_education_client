"use client";
import { Button, Menu } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import Logo from "../../Logo";
import React, { useEffect, useState } from "react";
import SideBarHome from "./SideBarHome";
import { homeNavItems } from "@/constants/HomeNabItems";
import UserAvatarUI from "@/components/ui/NavUI/UserAvatarUI";
import Link from "next/link";
import { ShoppingCartOutlined } from "@ant-design/icons"
import { IDecodedInfo, getUserInfo } from "@/services/auth.service";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleCartModal } from "@/redux/features/cartSlice";

const NavbarPublic = () => {
  // const screens = useBreakpoint();
  // const userInfo = getUserInfo() as IDecodedInfo
  const [userInfoLoading, setUserInfoLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<Partial<IDecodedInfo>>({
    email: "",
    id: "",
    role: undefined,
  });

  useEffect(() => {
    // Fetch user info asynchronously on the client side
    const fetchUserInfo = async () => {
      const userInfo = (await getUserInfo()) as any;
      setUserInfo(userInfo);
    };
    fetchUserInfo();
    setUserInfoLoading(false);
  }, []);

  const dispatch = useAppDispatch()
  const { cartModal } = useAppSelector(state => state.cart)

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

  const navItemsHome = homeNavItems(userInfo?.role ? userInfo.role : null)
  // console.log(homeNavItems(userInfo?.role ? userInfo.role : null), 'iiiiiiii')
  return (
    <div className="w-full lg:w-[80%] mx-auto bg- rounded-b-[50px]  backdrop-blur  block lg:flex  items-center justify-between">
      <nav
        className=" text-black py-[3px] md:pt-[0.9em] px-[1em] 
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
            fontFamily: "fantasy",
            // backdropBlur:"blur(8px)"
            // display:`${screens.sm ? "flex":"none"}`
            background: "none",
            backdropFilter: "blur(8px)",
            boxShadow: "none",
            color:"white",
            fontWeight:"700"
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

      <div className="hidden lg:flex mr-2">
        <Link
          href="/subscription"
          className="cursor-pointer font-semibold overflow-hidden relative z-100 border border-[#5F8122] group px-8 py-3 bg-white rounded-[36px] "
        >
          <span className="relative z-10 text-[#5F8122] group-hover:text-white text-xl duration-500">
            Membership
          </span>
          <span className="absolute w-full h-full bg-[#5F8122] -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
          <span className="absolute w-full h-full bg-[#5F8122] -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
        </Link>
      </div>
    </div>
  );
};

export default NavbarPublic;
