import React from "react";
import FormSelectField from "../FormSelectField";
import { useGetAllModuleQuery } from "@/redux/api/adminApi/moduleApi";
import FormSearchSelectField from "../FormSearchSelectField";

const SelectModuleField = () => {
  const query: Record<string, any> = {};
  //! for Course options selection
  query["limit"] = 999999;
  query["sortBy"] = "title";
  query["sortOrder"] = "asc";
  query["status"] = "active";
  //! for Module options selection
  const { data, isLoading } = useGetAllModuleQuery({ ...query });
  const moduleData = data?.data;
  // console.log(moduleData)
  const ModuleOptions = moduleData?.map((item: any) => {
    return {
      label: item?.title,
      value: item?._id,
    };
  });
  // console.log(ModuleOptions);
  return (
    <FormSearchSelectField
      size="large"
      name="module"
      options={ModuleOptions as any}
      defaultValue={{ label: "Select Module", value: "" }}
      label="module"
      loading={isLoading}
      required={true}
    />
  );
};

export default SelectModuleField;
