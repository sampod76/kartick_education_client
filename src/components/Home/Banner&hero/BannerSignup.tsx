import React from 'react'
import Image from "next/image";

export default function BannerSignUp() {
    return (
        <div className="-mt-[5px] ">
            <Image  alt="" src={"/banner/registrationBanner.png"} className="object-cover -z-10 w-[100vw] h-[40vh] lg:h-[55vh] 2xl:h-[45.75rem] -mt-[6rem]" width={1900} height={1900} />
        </div>
    )
}
