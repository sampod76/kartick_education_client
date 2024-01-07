import React from "react";

const LabelUi = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="text-[1rem] font-[550] text-slate-700 text-start capitalize">
      {children}
    </section>
  );
};

export default LabelUi;
