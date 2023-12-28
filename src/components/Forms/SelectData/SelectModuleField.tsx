import React from "react";
import FormSelectField from "../FormSelectField";
import { useGetAllModuleQuery } from "@/redux/api/adminApi/moduleApi";

const SelectModuleField = () => {
  const query: Record<string, any> = {};
  //! for Course options selection
  query["limit"] = 999999;
  query["sortBy"] = "title";
  query["sortOrder"] = "asc";
  //! for Module options selection
  const { data } = useGetAllModuleQuery({ ...query });
  const moduleData = data?.data;
  // console.log(moduleData)
  const ModuleOptions = moduleData?.map((item: any) => {
    return {
      label: item?.title,
      value: item?._id,
    };
  });
  console.log(ModuleOptions);
  return (
    <FormSelectField
      size="large"
      name="module"
      options={ModuleOptions as any}
      defaultValue={{ label: "Select Module", value: "" }}
      label="module"
      // placeholder="Select"
      required={true}
    />
  );
};

export default SelectModuleField;
