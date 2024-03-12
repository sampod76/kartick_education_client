import React from 'react'
import Image from "next/image";

export default function BannerAbout() {
    return (
        <div className="-mt-[5px] ">
            <Image alt="" src={"/banner/aboutBanner.png"} className="-z-10 w-[100vw] h-[45vh] lg:h-[100vh]  -mt-[6rem]"
                width={3200}
                height={2500} />
        </div>
    )
}
