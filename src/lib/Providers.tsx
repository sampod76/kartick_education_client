"use client";
import { StyleProvider } from "@ant-design/cssinjs";
import { createContext, useEffect, useState } from "react";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import StyledComponentsRegistry from "./AntdRegistry";
import { getUserInfo } from "@/services/auth.service";
// const AuthContext = createContext(undefined);
const Providers = ({ children }: { children: React.ReactNode }) => {
  // const [userData, setUserData] = useState<any>({});
  // const authData: any = {
  //   userData,
  // };
  // useEffect(() => {
  //   setUserData(getUserInfo() as any);
  // }, []);
  return (
    <StyleProvider hashPriority="high">
      {/* <AuthContext.Provider value={authData}> */}
        <Provider store={store}>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </Provider>
      {/* </AuthContext.Provider> */}
    </StyleProvider>
  );
};

export default Providers;
