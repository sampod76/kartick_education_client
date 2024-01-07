import React from "react";

import TopProfileSection from "./TopProfileSection";
import ProfileMainSection from "./ProfileTabSection";

const ProfileInstructorPage = ({ userData }: { userData: any }) => {

  const img = userData?.img || userData[userData.role]["img"];
  // console.log(img);
  const gender = userData?.gender || userData[userData.role]["gender"];
  const phoneNumber = userData?.phoneNumber || userData[userData.role]["phoneNumber"];
  const address = userData?.address || userData[userData.role]["address"];
  const firstName =
    userData?.name?.firstName || userData[userData.role]["name"].firstName;
  const lastName =
    userData?.name?.lastName || userData[userData.role]["name"].lastName;
  return (
    <div className="">
      <TopProfileSection topDetails={userData} />
      <ProfileMainSection />
    </div>
  );
};

export default ProfileInstructorPage;
