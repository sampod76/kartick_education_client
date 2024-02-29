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
              colorPrimary: "#5371FF",
              colorTextSecondary: "#5371FF",
              // colorBgContainer: "#f6ffed",
            },
            components: {
              Button: {
                colorPrimary: "#5371FF",
                // // algorithm: true,
                // // colorBgContainer: "#5371FF",
                // colorPrimaryBg: "#535BE5",
                // defaultBg: '#5371FF'
              },
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
