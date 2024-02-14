import BannerSignUp from "@/components/Home/Banner&hero/BannerSignup";
import Login from "@/components/Login/LoginPage";
import LoginStudent from "@/components/Login/LoginStudent";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login",
  description: "...",
};
const LoginPage = () => {
  return (
    <>
      {/* <div className="-mt-[2rem] mb-4 lg:mb-6 ">
        <div className="w-full min-h-[3.3rem] bg-[#BEDDF9]"></div>
        <BannerSignUp />
      </div> */}
      {/* <LoginStudent/>*/}
      <Login />
    </>
  );
};

export default LoginPage;
