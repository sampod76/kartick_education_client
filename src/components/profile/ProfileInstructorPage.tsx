import React from "react";

import TopProfileSection, { IProfileDetailsTop } from "./TopProfileSection";
import ProfileMainSection from "./ProfileTabSection";
import { IDecodedInfo, getUserInfo } from "@/services/auth.service";

const ProfileInstructorPage = ({ userData }: { userData: any }) => {
  const userInfo = getUserInfo() as IDecodedInfo;
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

  const topDetailsData: IProfileDetailsTop = {
    headings: firstName + lastName,
    sub_headings: userData?.role,
    total_student: 201,
    total_course: 5,
    total_review: 8,
    total_subscription: 10,
    img: img,
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    edit_link: `/${userInfo?.role}/manage-users/all-users/edit/${userData?._id}`,
    detail_link: `/${userInfo?.role}/manage-users/all-users/details/${userData?._id}`,
  };

  return (
    <div className="">
      <TopProfileSection topDetails={topDetailsData} />
      <ProfileMainSection />
    </div>
  );
};

export default ProfileInstructorPage;
