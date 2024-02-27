"use client";
import { IDecodedInfo, getUserInfo } from "@/services/auth.service";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
export const GlobalContext = createContext({});
export const useGlobalContext = () => {
  return useContext(GlobalContext) as IContextType;
};
export type IContextType = {
  userInfo: Partial<IDecodedInfo> | null | undefined;
  userInfoLoading: boolean;
};
export default function GlobalContextApi({
  children,
}: {
  children: React.ReactNode;
}) {
  // const userInfo = getUserInfo() as any;
  const [userInfoLoading, setUserInfoLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<Partial<IDecodedInfo>>({
    email: "",
    id: "",
    role: undefined,
  });

  const memoizedFetchUserInfo = useMemo(
    () => async () => {
      const userInfo = await getUserInfo();
      setUserInfo(userInfo);
      setUserInfoLoading(false);
    },
    []
  ); // Empty dependency array means this function will be memoized once

  useEffect(() => {
    // Call the memoized function to fetch user info asynchronously
    memoizedFetchUserInfo();
  }, [memoizedFetchUserInfo]);





  const value: IContextType = {
    userInfo,
    userInfoLoading,
  };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
