import React from "react";

const SubHeadingUI = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <p className="text-[1.3rem] font-semibold text-black mt-3 mb-2">
        {children}
      </p>
    </div>
  );
};

export default SubHeadingUI;
