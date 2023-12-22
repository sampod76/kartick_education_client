import React from "react";

const LabelUi = ({ children }: { children: React.ReactNode }) => {
  return <h3 className="text-[1rem] font-[550] text-slate-700 text-start pl-2">{children}</h3>;
};

export default LabelUi;
