import UserCreateComponent from "@/components/User/UserCreate";
import React from "react";
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Create User",
  description: "Create User",
};
export default function UserCreatePage() {
  
  return (
    <>
      <UserCreateComponent  />
    </>
  );
}
