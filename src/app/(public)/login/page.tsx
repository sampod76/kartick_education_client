import Login from "@/components/Login/LoginPage";
import LoginStudent from "@/components/Login/LoginStudent";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login",
  description: "..",
};
const LoginPage = () => {
  return (
    <>

      {/* <LoginStudent/> */}
      <Login />


    </>
  );
};

export default LoginPage;
