import {
  useGetAllGlossaryQuery,
  useGetSingleGlossaryQuery,
} from "@/redux/api/adminApi/glossaryApi";
import React from "react";

import parse from "html-react-parser";
import LoadingSkeleton from "../ui/Loading/LoadingSkeleton";
import { ENUM_STATUS, ENUM_YN } from "@/constants/globalEnums";
import { useGetAllResourceQuery } from "@/redux/api/adminApi/resourceApi";

export default function ResourcePage({ moduleId }: { moduleId: string }) {
  // console.log("🚀 ~ GlossaryPage ~ moduleId:", moduleId);

  const { data: resourcesData, isLoading } = useGetAllResourceQuery({
    module: moduleId,
    isDelete: ENUM_YN.NO,
    status: ENUM_STATUS.ACTIVE,
  });
  const data = resourcesData?.data[0];

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return <div>{data?.details ? parse(data?.details): <p className="text-center">Not found any Resource....</p>}</div>;
}
