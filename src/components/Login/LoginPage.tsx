"use client";
import { Button, Col, Input, Row, Spin, message, Modal } from "antd";
import loginImage from "@/assets/login-image.png";
import Image from "next/image";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
// import { useUserLoginMutation } from "@/redux/api/authApi";
import { isLoggedIn, storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schemas/login";
import { Error_model_hook } from "@/utils/modalHook";
import LoadingForDataFetch from "../Utlis/LoadingForDataFetch";
import { useUserLoginMutation } from "@/redux/api/auth/authApi";
import ButtonLoading from "../ui/Loading/ButtonLoading";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AllImage } from "@/assets/AllImge";
import Link from "next/link";
import ForgetPassword from "./ForgetPassword";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const [userLogin, { error, isLoading }] = useUserLoginMutation();

  const login = isLoggedIn();

  // console.log("🚀 ~ Login ~ login:", login)

  // useEffect(() => {
  //   if (login) {
  //     router.push("/dashboard");
  //   }
  // }, [login, router]);
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await userLogin({ ...data }).unwrap();
      if (res?.accessToken) {
        // router.push("/profile");
        message.success("User logged in successfully!");
        storeUserInfo({ accessToken: res?.accessToken });
        router.push("/dashboard");
      } else {
        Error_model_hook(res?.message);
      }
    } catch (err: any) {
      Error_model_hook(err?.data || err?.message);
      console.log(err);
    }
  };
  // if(isLoading){
  //  return <LoadingForDataFetch/>
  // }
  // redux error
  if (error) {
    console.log(error);
    //@ts-ignore
    Error_model_hook(error?.message);
  }

  return (
    <div className="bg-white ">
      <div className="flex justify-center h-screen shadow">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)`,
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-3xl font-bold text-white sm:text-3xl ">
                Login Page
              </h2>

              <p className="max-w-xl mt-3 text-gray-300">
                For getting more information about this page please visit the
                website at our course with Login
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-lg px-6 mx-auto lg:w-3/6 ">
          <div className="flex-1 shadow-lg p-5 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300">
            <div className="text-center">
              <div className="flex justify-center mx-auto">
                <Image
                  width={500}
                  height={500}
                  className="w-48 "
                  src={AllImage.siteLogo}
                  alt=""
                />
              </div>

              <p className="mt-3 text-primary text-[1.5rem]">
                Log in to access your account
              </p>
            </div>

            <div className="mt-8">
              <Form
                submitHandler={onSubmit}
                resolver={yupResolver(loginSchema)}
              >
                <div>
                  <label className="text-md text-gray-600 mb-1">
                    Your Email
                  </label>
                  <FormInput
                    name="email"
                    type="email"
                    size="large"
                    // label="User email"
                    placeholder="Type your email"
                    required={true}
                  />
                </div>
                <div
                  style={{
                    margin: "15px 0px",
                  }}
                >
                  <label className="text-md text-gray-600 mb-1">
                    Your Password
                  </label>
                  <FormInput
                    name="password"
                    type="password"
                    size="large"
                    // label="Password"
                    placeholder="Type your password"
                    // label="Password"
                    required={true}
                  />
                </div>
                <div className="">
                  <Button
                    type="default"
                    style={{
                      width: "6rem",
                      fontWeight: "600",
                      backgroundColor: "blue",
                      height: "2.6rem",
                      color: "white",
                    }}
                    htmlType="submit"
                  >
                    {isLoading ? <ButtonLoading /> : "Login"}
                  </Button>
                </div>
              </Form>
              {/* //! forget password */}
              <ForgetPassword />
              <div className="mt-10">
                <p className="text-sm text-center mt-6">
                  Don{"'"}t have an account{" "}
                  <Link
                    href="/signup"
                    className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                  >
                    Register here
                  </Link>
                </p>
                F
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default Login;

export default dynamic(() => Promise.resolve(Login), {
  ssr: false,
});
