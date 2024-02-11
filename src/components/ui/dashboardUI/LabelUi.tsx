import React from "react";

const LabelUi = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-[1rem] font-[550] text-slate-700 text-start capitalize">
      {children}
    </div>
  );
};

export default LabelUi;
