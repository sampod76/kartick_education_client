import { USER_ROLE } from "@/constants/role";
import { authKey } from "@/constants/storageKey";
import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { decodedToken } from "@/utils/jwt";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setToLocalStorage(authKey, accessToken as string);
};

export interface IDecodedInfo {
  id: string;
  role: USER_ROLE | string;
  email: string;
  e?:string
}

export const getUserInfo = (): IDecodedInfo | {e:""} => {
  const authToken = getFromLocalStorage(authKey);
  // console.log(authToken)

  if (authToken) {
    const decodedData = decodedToken(authToken) as IDecodedInfo;
    // console.log(decodedData)
    return decodedData;
  } else {
    return {e:''};
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  return !!authToken;
};

export const removeUserInfo = (key: string) => {
  return localStorage.removeItem(key);
};

export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: `${getBaseUrl()}/auth/refresh-token`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};
