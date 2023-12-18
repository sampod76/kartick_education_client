import DropDownUI from "@/components/ui/NavUI/DropDownUI";
import { dropDownItemsData } from "@/db/publicNavDB";
import type { MenuProps } from "antd";
import Link from "next/link";
export const homeNavItems: MenuProps["items"] = [
    {
      label: <Link href={`/`}> Homes</Link>,
  
      key: `/Home`,
    },
    {
        key: "mathmetical-academic",
        label: <DropDownUI itemData={dropDownItemsData}>MathMetical Academic</DropDownUI>,
      },
    {
      key: "Learning",
      label: <DropDownUI itemData={dropDownItemsData}>Learning</DropDownUI>,
    },
    {
      key: "assessment",
      // label: <Link href="/">Assetment</Link>,
      label: <DropDownUI itemData={dropDownItemsData}>Assessment</DropDownUI>,
    },
    {
      key: "analysis",
      label: <DropDownUI itemData={dropDownItemsData}>Analyses</DropDownUI>,
    },
   
  ];