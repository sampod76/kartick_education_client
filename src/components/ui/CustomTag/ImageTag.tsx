import Image from "next/image";
import React from "react";
import NoImgeFoundImage from "../../../assets/noImge.jpg";

export default function ImageTag({
  src,
  width,
  height,
  alt,
  style,
  url,
}: {
  src?: string;
  width?: number;
  height?: number;
  alt?: string;
  style?: string;
  url?: string;
}) {
  return (
    <>
      {src ? (
        <Image
          //sampod
          src={`${src}`}
          //   src={`https://freepickapi/images/${src}`}
          width={width || 200}
          height={height || 200}
          alt={`${alt || "Images"}`}
          className={`${style}`}
        />
      ) : url ? (
        <Image
          src={`${url}`}
          width={width || 200}
          height={height || 200}
          alt={`${alt || "Images"}`}
          className={`${style}`}
        />
      ) : (
        <Image
          src={NoImgeFoundImage}
          width={width || 200}
          height={height || 200}
          alt={`${alt || "Images"}`}
          className={`${style}`}
        />
      )}
    </>
  );
}
