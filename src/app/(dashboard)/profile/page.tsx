"use client";
import React, { useState } from "react";
import { Card, Typography, Row, Col, Space, Button } from "antd";

import { useGetProfileQuery } from "@/redux/api/auth/authApi";
import { NO_IMAGE } from "@/constants/filePatch";
import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";
import Image from "next/image";
import Link from "next/link";
import UpdateProfile from "@/components/profile/UpdateProfile";
import UserProfile from "@/components/profile/UserProfile";
import ProfileTabSection from "@/components/profile/ProfileTabSection";
import SellerMainProfile from "@/components/profile/seller/SellerMainProfile";
import AdminMainProfile from "@/components/profile/admin/AdminMainProfile";

const { Meta } = Card;
const { Title, Text } = Typography;

const ProfileTemplate = () => {
  const [update, setUpdate] = useState(false);
  // console.log(update);
  const { data = {}, isLoading } = useGetProfileQuery("");
  console.log(data, 'data profile');


  const userData = data

  const firstName =
    userData?.name?.firstName 
  const lastName =
    userData?.name?.lastName 
  if (isLoading) {
    return <LoadingForDataFetch />;
  }


  return (
    <section>
      <div className="flex justify-end items-end">
        {/* <Button onClick={() => setUpdate(!update)}   type="default">
          {update ? "profile" : "Update/edit profile"}
        </Button> */}
      </div>
      {/* {update ? (
        <UpdateProfile></UpdateProfile>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <div className=" border-2 rounded-2xl shadow-2xl w-fit p-5">
            <div>
              <Title level={2}>Profile</Title>
              <Space align="center" direction="horizontal">
                <Row gutter={16}>
                  <Col span={8}>
                    <Image
                      width={800}
                      height={800}
                      src={userData?.profileImage || NO_IMAGE}
                      alt="Profile"
                      style={{ width: "300px", borderRadius: "100%" }}
                    />
                  </Col>
                  <Col span={16}>
                    <Title level={3}>Name: {userData?.name}</Title>
                    <Text strong>Email:</Text> <Text>{userData?.email}</Text>
                    <br />
                    <Text strong>Phone:</Text>{" "}
                    <Text>{userData?.phoneNumber}</Text>
                    <br />
                    {userData?.address && (
                      <>
                        <Text strong>Address:</Text>{" "}
                        <Text>{userData?.address}</Text>
                        <br />
                      </>
                    )}
                    {userData?.gender && (
                      <>
                        <Text strong>Gender:</Text>{" "}
                        <Text>{userData?.gender}</Text>
                        <br />
                      </>
                    )}
                    {userData?.dateOfBirth && (
                      <>
                        <Text strong>Date of Birth:</Text>{" "}
                        <Text>{userData?.dateOfBirth}</Text>
                        <br />
                      </>
                    )}
                  </Col>
                </Row>
              </Space>
            </div>
          </div>
        </div>
      )} */}
      <UserProfile userData={userData} />
      {
        userData?.role === "seller" &&
        <SellerMainProfile />
      }
      {
        userData?.role === "admin" &&
        <AdminMainProfile />
      }

    </section>
  );
};

export default ProfileTemplate;
