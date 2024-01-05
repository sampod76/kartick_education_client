"use client";
import { Button, Col, Input, Row, Spin, message } from "antd";
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

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const [userLogin, { error, isLoading }] = useUserLoginMutation();
  const [isLoginLoading, setSetisloading] = useState(true);
  const login = isLoggedIn();

  useEffect(() => {
    setSetisloading(true);
    if (login) {
      router.push("/dashboard");
    }
    setSetisloading(false);
  }, [login, router]);
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await userLogin({ ...data }).unwrap();
      console.log(res);
      if (res?.accessToken) {
        // router.push("/profile");
        message.success("User logged in successfully!");
        storeUserInfo({ accessToken: res?.accessToken });
        router.push("/dashboard");
      } else {
        Error_model_hook(res?.message);
      }
    } catch (err: any) {
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
  if (isLoginLoading) {
    return <LoadingForDataFetch />;
  }

  return (
    <Row
      justify="center"
      // align="middle"
      style={
        {
          // minHeight: "100vh",
        }
      }
    >
      {/* <Col sm={12} md={16} lg={10}>
        <Image src={loginImage} width={500} alt="login image" />
      </Col> */}
      <Col sm={24} md={8} lg={8} style={{ position: "relative" }}>
        <section className=" p-5 rounded-lg shadow-2xl sm:max-w-xs md:max-w-lg mt-3  ">
          <h1 className="my-2 font-bold text-lg">First login your account</h1>
          <div>
            <Form submitHandler={onSubmit} resolver={yupResolver(loginSchema)}>
              <div>
                <FormInput
                  name="email"
                  type="email"
                  size="large"
                  label="User email"
                  required={true}
                />
              </div>
              <div
                style={{
                  margin: "15px 0px",
                }}
              >
                <FormInput
                  name="password"
                  type="password"
                  size="large"
                  label="Password"
                  required={true}
                />
              </div>
              <Button type="default" htmlType="submit">
                {isLoading ? <ButtonLoading /> : "Login"}
              </Button>
            </Form>
          </div>
        </section>
      </Col>
    </Row>
  );
};

export default Login;
