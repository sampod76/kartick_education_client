'use client';
import { useGlobalContext } from '@/components/ContextApi/GlobalContextApi';
import UserAvatarUI from '@/components/ui/NavUI/UserAvatarUI';
import { homeNavItems } from '@/constants/HomeNabItems';
import { Menu } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '../../Logo';
import SideBarHome from './SideBarHome';
const NavbarPublic = () => {
  const pathname = usePathname();
  const { userInfo, userInfoLoading } = useGlobalContext();
  const navItemsHome = homeNavItems(userInfo?.role ? userInfo.role : null);

  return (
    <div
      className={`mx-auto block w-full items-center justify-between rounded-b-[50px] bg-white px-[2rem] py-2 shadow backdrop-blur-xl md:flex lg:flex xl:flex 2xl:w-[81%]`}
    >
      <nav className="text-[#dedee0 py-[8px md:pt-[0.9em align-center flex justify-between gap-[5rem] text-black">
        <Logo />

        <Menu
          mode="horizontal"
          className="hidden items-center border border-red-500 md:flex"
          style={{
            fontWeight: '700',
            fontFamily: 'roboto',
            background: 'none',
            backdropFilter: 'blur(80px)',
            boxShadow: 'none',
            color: `black`,
          }}
          disabledOverflow
          items={navItemsHome}
        />

        <div className="flex md:hidden lg:hidden xl:hidden">
          <SideBarHome
            userInfo={userInfo}
            userInfoLoading={userInfoLoading}
          ></SideBarHome>
        </div>
      </nav>

      <div className="hidden items-center gap-2 md:flex lg:flex xl:flex">
        {/* <div className="hidden md:flex lg:flex xl:flex items-center ">
          <Link
            href="/subscription"
            className="cursor-pointer font-semibold overflow-hidden relative z-100 border bg-gray-200 group px-5 md:px-3 py-1 md:py-0 lg:py-1 xl:py-2   rounded-lg uppercase "
          >
            <span className="relative z-10 text-black group-hover:text-blue-600 text-lg md:text-sm lg:text-sm  xl:text-lg duration-500">
              Membership
            </span>
          </Link>
        </div> */}
        <div className="flex items-center justify-between gap-1 lg:mt-0">
          {userInfoLoading ? (
            <div className="h-[50px] w-[50px] animate-pulse rounded-full bg-white shadow-md"></div>
          ) : userInfo?.id ? (
            <UserAvatarUI />
          ) : (
            <div className="flex max-h-[2.7rem] items-center font-[700] lg:max-h-[3.3rem]">
              <Link
                href="/signup"
                className="z-100 group relative cursor-pointer overflow-hidden rounded-[36px] bg-white px-2 py-1 font-semibold uppercase md:px-3 md:py-0 lg:py-1 xl:py-2"
              >
                <span className="relative z-10 mx-3 text-lg font-semibold text-black duration-500 group-hover:text-blue-600 md:text-sm lg:text-sm xl:text-lg">
                  Sign Up
                </span>
              </Link>
              <Link
                href="/login"
                className="z-100 group relative cursor-pointer overflow-hidden rounded-[36px] bg-white px-2 py-1 font-semibold uppercase md:px-3 md:py-0 lg:py-1 xl:py-2"
              >
                <span className="relative z-10 mx-3 text-lg font-semibold text-black duration-500 group-hover:text-blue-600 md:text-sm lg:text-sm xl:text-lg">
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
