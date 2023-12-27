"use client";
import parse from "html-react-parser";

import React, { useState } from "react";
import MathTextEditor from "@/components/Utlis/textEditor";
import { Input } from "antd";
import dynamic from "next/dynamic";
const TextEditor = dynamic(() => import("@/components/Utlis/textEditor"), {
  ssr: false,
});
export default function Blog() {
  const [value, setValue] = useState("");

  return (
    <>
      <TextEditor value={value} setValue={setValue} />

      {/* <div className="">
        <p className="text-left border-2">
         
          <span style={{ display: "inline !important", textAlign: "left" }}>
            {`$$\\ \\begin{pmatrix}\r\na_{1} & b_{1}\\\\\r\nc_{1} & d_{1}\r\n\\end{pmatrix}$$`}
          </span>
        </p>
      </div> */}
    </>
  );
}
