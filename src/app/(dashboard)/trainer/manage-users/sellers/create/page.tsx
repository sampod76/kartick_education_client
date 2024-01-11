import UserCreateComponent from "@/components/User/UserCreate";
import { USER_ROLE } from "@/constants/role";
import React from "react";

export default function CreateSellerPage() {
  const role:  {
      label: string;
      value: string;
    } = {
      label: USER_ROLE.SELLER,
      value: USER_ROLE.SELLER,
    };

  return (
    <>
      <UserCreateComponent role={role} />
    </>
  );
}
