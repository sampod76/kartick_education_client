import React from 'react'
import Image from "next/image";

export default function BannerAbout() {
    return (
        <div className="-mt-[5px] ">
            <Image alt="" src={"/banner/aboutBanner.png"} className="-z-10 w-[100vw] h-[55vh] lg:h-[80vh] 2xl:h-[45.75rem] -mt-[6rem]"
                width={1900}
                height={1900} />
        </div>
    )
}
