import Link from "next/link";
import React from "react";
import logoFullImage from "@/assets/Logo/logoFull.png"
import logoImage from "@/assets/Logo/logOnly.png"
import Image from "next/image";

const Logo = () => {
  return (
    <Link
      href="/"
      style={{
        textDecoration: "none",
        fontWeight: "700",
        color: "black",
        fontSize: "1.3rem",
        fontFamily: "sans-serif",
        // background:"white",
        // paddingBlock:"0.2rem",
        // borderRadius:"5px"
        background: "transparent"
      }}
    >
      <Image  src={logoFullImage} height={120} width={200} className="hidden md:flex lg:flex xl:flex w-[110px] 
         h-[36px] lg:h-[56px] 
       " alt="Logo" />
      <Image src={logoImage} height={120} width={200} className="flex md:hidden lg:hidden xl:hidden w-[50px] 
       md:w-[84px] lg:w-[90px]  xl:w-[80px]  h-[36px] lg:h-[70px] 
       " alt="Logo" />
    </Link>
  );
};

export default Logo;
