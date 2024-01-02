import UserCreateComponent from "@/components/User/UserCreate";
import { USER_ROLE } from "@/constants/role";
import React from "react";

export default function CreateAdminPage() {
  const role:  {
      label: string;
      value: string;
    } = {
      label: USER_ROLE.ADMIN,
      value: USER_ROLE.ADMIN,
    };

  return (
    <>
      <UserCreateComponent role={role} />
    </>
  );
}
