"use client";
import React, { useState, useEffect } from "react";
// import bannerBG from "@/assets/banner/bannerBG.png";
import bannerBG from "@/assets/banner/v2Banner.png";
import treeBoy from "@/assets/banner/treeBoy.png";
import Image from "next/image";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useDebounced } from "@/redux/hooks";
import {
  addBannerSearchValue,
  clearBannerSearchValue,
} from "@/redux/features/bannerCourseSlice";
import { AnimatePresenceWrapper } from "@/components/framer_motion/AnimatePresence";
const BannerSection = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [resetValue, setResetValue] = useState<boolean>(false);
  const { searchValue } = useAppSelector((state) => state.bannerSearch);
  const dispatch = useAppDispatch();
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 10,
  });
  // let searchData = ''
  // useEffect(() => {
  //     if (!!debouncedSearchTerm) {
  //       dispatch(addBannerSearchValue(debouncedSearchTerm));
  //     }
  //   }, [debouncedSearchTerm, dispatch,searchTerm]);

  //  if (!!debouncedSearchTerm) {
  //       dispatch(addBannerSearchValue(debouncedSearchTerm));
  //     }

  // console.log('searchTerm', searchTerm, 'resetValue', resetValue, 'searchValue', searchValue)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const text: string = e.target.value
    setSearchTerm(e.target.value);
    dispatch(addBannerSearchValue(searchTerm));
    if (!resetValue) {
      setSearchTerm("");
    }
    if (e.target.value?.length < 1) {
      dispatch(clearBannerSearchValue(null));
    }

    setResetValue(true);
  };

  const handleReset = () => {
    setSearchTerm("");
    dispatch(clearBannerSearchValue(null));
    setResetValue(false);
  };

  return (
    <Image alt="" src={"/banner/v2Banner.png"} className="object-cover -z-10 w-[100vw] h-[50vh] lg:h-[80vh] 2xl:h-[45.75rem] -mt-[3.5rem]" width={1900} height={1900} />
    // <div
    //   className="-mt-[3.5rem] min-h-[50rem] w-full relative flex flex-col justify-end re"
    //   style={{
    //     backgroundImage: `url('/banner/v2Banner.png')`,
    //     backgroundRepeat: "no-repeat",
    //     backgroundSize: "cover", // or "contain"
    //   }}
    // >

    //   {/* <AnimatePresenceWrapper>
    //     <div className="w-full lg:w-[60%] px-5 md:py-[5rem] xl:py-[6rem]">
    //       <div className=" text-black  uppercase space-y-3 ">
    //         <h1
    //           className=" text-[24px] whitespace-nowrap md:text-[48px] lg:text-[50px]  leading-[1] xl:text-[64px]
    //           font-[700] lg:font-[800]"
    //         >
    //           Feel bored or anxious
    //         </h1>
    //         <h1
    //           className="text-[24px] whitespace-nowrap  lg:text-[50px] leading-[1] xl:text-[64px]
    //           font-[700] lg:font-[800]"
    //         >
    //           About{" "}
    //           <span className="text-secondary whitespace-nowrap">
    //             Math or English ?
    //           </span>
    //         </h1>
    //       </div>
    //       <p className="mt-[1rem]  md:whitespace-nowrap text-[20px] lg:text-[2rem] xl:text-[2rem] leading-[1.3]">
    //         Overcome challenges with
    //         <span className="text-secondary  text-[20px] lg:text-[2rem] xl:text-[2rem] mx-1 leading-[1.5]">
    //           iBlossomLearn
    //         </span>
    //         classes.
    //       </p>
    //       <p className="text-[20px] lg:text-[2rem] xl:text-[2rem] leading-[1.3] lg:whitespace-nowrap">
    //         Your adventure in learning awaits!
    //       </p>
    //       <div className="mt-2 md:mt-[1.5rem] h-[3.8rem] flex">
    //         <input
    //           type="text"
    //           value={searchTerm}
    //           onChange={(e) => handleChange(e)}
    //           placeholder="Search here"
    //           className="border-2 outline-none text-lg lg:text-xl text-[#949494 text-slate-800  border-primary rounded-l-[8px] w-full md:max-w-md p-2 bg-[#ADADFA40] h-[2.8rem] lg:h-[3.8rem]"
    //         />
    //         <h3 className="bg-primary p-[16px] rounded-r-[8px] max-w-[3.7rem] h-[2.8rem] lg:h-[3.8rem]">
    //           <SearchOutlined
    //             style={{
    //               minHeight: "24px",
    //               width: "24px",
    //               color: "white",
    //               fontWeight: "700",
    //             }}
    //           />
    //         </h3>

    //         {resetValue && searchValue?.length > 0 && (
    //           <button
    //             onClick={handleReset}
    //             className="bg-white p-[16px] rounded-r-[8px] max-w-[3.7rem] h-[2.8rem] lg:h-[3.8rem]"
    //           >
    //             <ReloadOutlined
    //               style={{
    //                 minHeight: "24px",
    //                 width: "24px",
    //                 color: "black",
    //                 fontWeight: "700",
    //               }}
    //             />
    //           </button>
    //         )}
    //       </div>
    //       <div className="mt-2 md:mt-[2rem] lg:mt-[3rem] flex  gap-3 text-[1.2rem] text-white font-[700] uppercase ">
    //         <Link
    //           className=" w-fit text-xs md:text-sm lg:text-lg bg-primary  p-3 rounded-[8px]"
    //           href="/learning"
    //         >
    //           Get started new
    //         </Link>
    //         <Link
    //           className="w-fit text-xs md:text-sm lg:text-lg  bg-secondary  p-3 flex justify-center items-center rounded-[8px]"
    //           href="/subscription"
    //         >
    //           Join now
    //         </Link>
    //       </div>
    //     </div>
    //   </AnimatePresenceWrapper> */}

    //   {/* <div className="w-full lg:w-[40%]  hidden lg:flex justify-end lg:-mt-[2rem] ">
    //     <Image
    //       className="w-[80%] lg:w-[60%]  h-full  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300  py-2"
    //       src={treeBoy}
    //       height={602}
    //       width={510}
    //       alt="treeboy"
    //     />
    //   </div> */}

    // </div>

  );
};

export default BannerSection;
