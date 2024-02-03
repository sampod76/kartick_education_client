"use client";
import React, { useState, useEffect } from "react";
import bannerBG from "@/assets/banner/bannerBG.png";
import treeBoy from "@/assets/banner/treeBoy.png";
import Image from "next/image";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useDebounced } from "@/redux/hooks";
import { addBannerSearchValue, clearBannerSearchValue } from "@/redux/features/bannerCourseSlice";
const BannerSection = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [resetValue, setResetValue] = useState<boolean>(false)
  const { searchValue } = useAppSelector(state => state.bannerSearch)
  const dispatch = useAppDispatch()
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
      setSearchTerm('');
    }
    if (e.target.value?.length < 1) {
      dispatch(clearBannerSearchValue(null));
    }

    setResetValue(true);
  };

  const handleReset = () => {
    setSearchTerm('');
    dispatch(clearBannerSearchValue(null));
    setResetValue(false);
  };

  return (
    <div
      className="block  lg:flex justify-between place-items-end bg-blue-20 min-h-[35rem] lg:min-h-[45rem] text-left pt-[1rem]  "
      style={{
        backgroundImage: `url('/banner/bannerBG.png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <section className="w-full lg:w-[60%] px-5 py-[3rem]">
        <div className=" text-black  uppercase space-y-3 ">
          <h1 className=" text-[24px]  lg:text-[50px] leading-[1] xl:text-[64px]
              font-[700] lg:font-[800]">
            Feel bored or anxious
          </h1>
          <h1 className="text-[24px]  lg:text-[50px] leading-[1] xl:text-[64px]
              font-[700] lg:font-[800]">
            About{" "}
            <span className="text-secondary whitespace-nowrap">
              Math or English ?
            </span>
          </h1>
        </div>
        <p className="mt-[2rem] text-[24px] lg:text-[48px] xl:text-[56px] leading-[1.3]">
          Overcome challenges with
          <span className="text-secondary  text-[24px] lg:text-[48px] xl:text-[56px] mx-1 leading-[1.5]">

            iBlossomLearn
          </span>
          classes. Your adventure in learning awaits!
        </p>
        <div className="mt-2 md:mt-[3rem] max-h-[3.8rem] flex">
          <input
            type="text"
            value={searchTerm}

            onChange={(e) => handleChange(e)}
            placeholder="Search here"
            className="border-2 outline-none text-xl text-[#949494 text-slate-800 px-3 border-primary rounded-l-[8px] w-full lg:w-[512px] p-2 bg-[#ADADFA40] h-[3.8rem]"
          />
          <h3 className="bg-primary p-[16px] rounded-r-[8px] max-w-[3.7rem] h-[3.8rem]">
            <SearchOutlined
              style={{
                minHeight: "24px",
                width: "24px",
                color: "white",
                fontWeight: "700",
              }}
            />
          </h3>

          {resetValue && searchValue?.length > 0 && (
            <button onClick={handleReset} className="bg-white p-[16px] rounded-r-[8px] max-w-[3.7rem] h-[3.8rem]">
              <ReloadOutlined
                style={{
                  minHeight: "24px",
                  width: "24px",
                  color: "black",
                  fontWeight: "700",
                }}
              />
            </button>
          )}
        </div>

        <div className="mt-2 md:mt-[3rem] lg:mt-[5rem] flex flex-col lg:flex-row xl:flex-row gap-3 text-[1.2rem] text-white font-[700] uppercase">
          <Link
            className="w-full lg:w-[13rem] xl:w-[13rem] bg-primary  p-3 rounded-[8px]"
            href="/learning"
          >
            Get started new
          </Link>
          <Link
            className="w-fit mx-3 bg-secondary  px-5 flex justify-center items-center rounded-[8px]"
            href="/subscription"
          >
            Join now 
          </Link>
        </div>
      </section>
      <section className="w-full lg:w-[40%] mt-0 hidden lg:flex justify-end lg:-mt-[2rem] ">
        <Image
          className="w-[80%] lg:w-[60%] h-full lg:h-[38rem]   py-2"
          src={treeBoy}
          height={602}
          width={510}
          alt="treeboy"
        />
      </section>
    </div>
  );
};

export default BannerSection;
