import {
  useGetAllGlossaryQuery,
  useGetSingleGlossaryQuery,
} from "@/redux/api/adminApi/glossaryApi";
import React from "react";

import parse from "html-react-parser";
import LoadingSkeleton from "../ui/Loading/LoadingSkeleton";
import { ENUM_STATUS, ENUM_YN } from "@/constants/globalEnums";

export default function GlossaryPage({ moduleId }: { moduleId: string }) {
  // console.log("🚀 ~ GlossaryPage ~ moduleId:", moduleId);

  const { data: glossaryData, isLoading } = useGetAllGlossaryQuery({
    module: moduleId,
    isDelete: ENUM_YN.NO,
    status: ENUM_STATUS.ACTIVE,
  });
  const data = glossaryData?.data[0];
  // console.log("🚀 ~ GlossaryPage ~ glossaryData:", glossaryData);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return <div>{data?.details && parse(data?.details)}</div>;
}
