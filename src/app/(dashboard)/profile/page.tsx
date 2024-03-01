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
import { useGlobalContext } from "@/components/ContextApi/GlobalContextApi";

const { Meta } = Card;
const { Title, Text } = Typography;

const ProfileTemplate = () => {
  const [update, setUpdate] = useState(false);
  // console.log(update);
  const { userInfo, userInfoLoading } = useGlobalContext()
  const { data = {}, isLoading } = useGetProfileQuery("");
  console.log(data, 'data profile');



  if (isLoading) {
    return <LoadingForDataFetch />;
  }



  return (
    <div>
    
      <UserProfile userData={data} />
      {/* {
        data?.role === "seller" &&
        <SellerMainProfile />
      }
      {
        data?.role === "admin" &&
        <AdminMainProfile />
      } */}

    </div>
  );
};

export default ProfileTemplate;
