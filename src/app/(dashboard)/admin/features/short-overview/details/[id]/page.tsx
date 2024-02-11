"use client";
import { AnimatePresenceWrapper } from '@/components/framer_motion/AnimatePresence';
import { useGetSingleShortOverViewQuery } from '@/redux/api/adminApi/features/overview';
import { IShort_overviewData } from '@/types/features/shortOverviewType';
import { EllipsisMiddle } from '@/utils/CutTextElliples';
import Link from 'next/link';
import React from 'react'

export default function ShortOverViewDetailsPage({ params }: { params: { id: string } }) {

    const { data = {}, isLoading: defaultLoading } =
        useGetSingleShortOverViewQuery(params?.id, {
            skip: !Boolean(params?.id),
        });
    const shortOverviewData: IShort_overviewData = data
    return (
        <div>  <AnimatePresenceWrapper>
            <div className=" container mx-auto  ">
                <div className="bg-[#A2B0F321] mt-5 py-3 md:py-10 lg:py-[100px] flex flex-col mx-2">
                    <h1 className="text-xl md:text-2xl lg:text-3xl text-start  xl:text-center text-[#282938] font-[600]">
                        {shortOverviewData?.title}
                    </h1>

                    <div className="my-[6rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-7 w-full lg:max-w-[90%] mx-auto">
                        {shortOverviewData?.cards?.map((item: any, index: any) => {
                            return (
                                <AnimatePresenceWrapper key={index} delay={0.24 + (index / 100)}>
                                    <div
                                        className="w-full lg:max-w-[406px] max-h-[316px] bg-[#FFFFFF] rounded-tl-[30px] rounded-br-[30px] text-start p-5 flex flex-col gap-3"
                                        key={index + 1}
                                    >
                                        <p className="h-12 w-12 rounded-tl-[30px] rounded-tr-[5px] rounded-br-[30px] rounded-bl-[5px] font-bold text-[20px] bg-primary p-3 text-white hover:text-primary hover:bg-slate-100">
                                            {item?.countNumber}
                                        </p>
                                        <h2 className="font-[500] text-xl  lg:text-2xl text-[#282938] text-nowrap">
                                            {item?.title}
                                        </h2>
                                        <p className="text-[#1f1f2b] font[400] text-[16px]">

                                            <EllipsisMiddle
                                                suffixCount={3}
                                                maxLength={180}
                                            >
                                                {item?.short_description}
                                            </EllipsisMiddle>
                                        </p>
                                    </div>
                                </AnimatePresenceWrapper>
                            );
                        })}
                    </div>

                    <Link
                        href="/subscription"
                        className="text-primary uppercase p-2 w-[164px] h-[44px] text-center mx-auto font-bold border-primary border-2 rounded-[10px] text-[18px] hover:bg-primary hover:text-white"
                    >
                        Join Now
                    </Link>
                </div>
            </div>
        </AnimatePresenceWrapper></div>
    )
}
