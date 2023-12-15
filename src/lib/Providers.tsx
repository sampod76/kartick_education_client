"use client";
import { StyleProvider } from "@ant-design/cssinjs";
import { createContext, useEffect, useState } from "react";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import StyledComponentsRegistry from "./AntdRegistry";

import { ConfigProvider } from "antd";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <StyledComponentsRegistry>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary:"#FB8500",
              colorTextSecondary:"#5371FF"
            },
          }}
        >
          {children}
        </ConfigProvider>
      </StyledComponentsRegistry>
    </Provider>
  );
};

export default Providers;
