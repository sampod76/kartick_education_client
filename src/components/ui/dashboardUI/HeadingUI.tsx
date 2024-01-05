import React from "react";

const HeadingUI = ({ children }: { children: React.ReactNode }) => {
  return (
    <h1 className="text-[2rem] font-bold text-primary mt-7 mb-5">{children}</h1>
  );
};

export default HeadingUI;
