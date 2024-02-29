import React from 'react'
import Image from "next/image";

export default function BannerMemberShip() {
    return (
        <div className="-mt-[5px] ">
            <Image  alt="" src={"/banner/membarshipBanner.png"} className="object-cover -z-10 w-[100vw] h-[38vh] lg:h-[40vh] 2xl:h-[40.75rem] -mt-[6rem]" width={1900} height={1900} />
        </div>
    )
}
