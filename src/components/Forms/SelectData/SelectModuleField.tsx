import React from "react";
import FormSelectField from "../FormSelectField";
import { useGetAllModuleQuery } from "@/redux/api/adminApi/moduleApi";

const SelectModuleField = () => {
  //! for Module options selection
  const { data } = useGetAllModuleQuery({});
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
      // defaultValue={priceTypeOptions[0]}
      label="module"
      // placeholder="Select"
      required={true}
    />
  );
};

export default SelectModuleField;
