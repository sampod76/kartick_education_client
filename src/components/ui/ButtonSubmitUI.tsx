import { Button } from "antd";
import React from "react";

const ButtonSubmitUI = ({ children }: { children: React.ReactNode }) => {
  return (
    <Button
      htmlType="submit"
      style={{
        padding: "8px 18px",
        fontSize: "18px",
        fontWeight: "600",
        color: "#fff",
        backgroundColor: "#5371FF",
        border: "none",
        marginBlock: "2rem",
        height:"3rem"
      }}
      type="default"
    >
      {children}
    </Button>
  );
};

export default ButtonSubmitUI;
