import Link from "next/link";
import React from "react";
// import logoImage  from "@/assets/Logo/Rectangle 1.png"
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
      <Image src={logoImage} height={120} width={200} className="w-[70px] lg:w-[84px] h-[3rem]  " alt="Logo" />

    </Link>
  );
};

export default Logo;
