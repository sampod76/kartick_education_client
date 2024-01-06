import React from "react";

const LabelUi = ({ children }: { children: React.ReactNode }) => {
  return (
    <h1 className="text-[1rem] font-[550] text-slate-700 text-start capitalize">
      {children}
    </h1>
  );
};

export default LabelUi;
