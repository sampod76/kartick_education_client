import React from "react";

const LabelUi = ({ children }: { children: React.ReactNode }) => {
  return <h3 className="text-[1rem] font-[500] text-secondary">{children}</h3>;
};

export default LabelUi;
