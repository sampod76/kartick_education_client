import Image from "next/image";
import {
  GithubFilled,
  TwitterSquareFilled,
  FacebookFilled,
  LinkedinFilled,
  InstagramFilled,
} from "@ant-design/icons";
import Link from "next/link";

import React from "react";
import ImageTag from "../ui/CustomTag/ImageTag";
import TopProfileSection from "./TopProfileSection";
import ProfileMainSection from "./ProfileTabSection";

const UserProfilePage = ({ userData }: { userData: any }) => {
  // console.log(userData);
  const img = userData?.img || userData[userData.role]["img"];
  // console.log(img);
  const gender = userData?.gender || userData[userData.role]["gender"];
  const phoneNumber =
    userData?.phoneNumber || userData[userData.role]["phoneNumber"];
  const address = userData?.address || userData[userData.role]["address"];
  const firstName =
    userData?.name?.firstName || userData[userData.role]["name"].firstName;
  const lastName =
    userData?.name?.lastName || userData[userData.role]["name"].lastName;

  return (
    <div className="">
      <TopProfileSection userData={userData} />
      <ProfileMainSection />
    </div>
  );
};

export default UserProfilePage;
