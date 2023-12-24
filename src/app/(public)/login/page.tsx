import Login from "@/components/Login/LoginPage";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login",
  description: "..",
};
const LoginPage = () => {
  return (
    <>
      <Login />
    </>
  );
};

export default LoginPage;
