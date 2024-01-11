import React from "react";
import Link from "next/link";

export default function BannerModule({ className }: { className?: string }) {
  return (
    <div className="-mt-[6rem] ">
      <div
        className={className}
        style={{
          backgroundImage: `url('/banner/module_banner.png')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",

          // height: "36rem",
        }}
      ></div>
    </div>
  );
}
