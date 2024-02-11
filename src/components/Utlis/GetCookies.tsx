"use server";
import { cookies } from "next/headers";
export default async function GetCookies() {
  const cookieStore = cookies();
  const theme = cookieStore.get("refreshToken");
  console.log("🚀 ~ GetCookies ~ theme:", theme)
  return theme;
}
