import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function BannerModule({ className }: { className?: string }) {
  return (
    <div className="-mt-[6rem] ">
      <Image alt="" src={"/banner/v2CourseBanner.png"} className="object-cover -z-10 w-[100vw] h-[50vh] lg:h-[70vh] 2xl:h-[45.75rem] -mt-[6rem]" width={1900} height={1900} />
      {/* <div
        className={className}
        style={{
          backgroundImage: `url('/banner/v2CourseBanner.png')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",

          // height: "36rem",
        }}
      ></div> */}
    </div>
  );
}
