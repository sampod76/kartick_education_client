import React from "react";
import FormSelectField from "../FormSelectField";

import { useGetAllCategoryQuery } from "@/redux/api/adminApi/categoryApi";
import FormSearchSelectField from "../FormSearchSelectField";

const SelectCategoryField = ({ defaultData, setCategory }: { defaultData?: any, setCategory?: any }) => {
  //! for Category options selection
  const { data: Category, isLoading } = useGetAllCategoryQuery({});
  const CategoryData = Category?.data;
  // console.log(CategoryData)
  const CategoryOptions = CategoryData?.map((item: any) => {
    return {
      label: item?.title,
      value: item?._id,
    };
  });

  return (
    <FormSearchSelectField
      size="large"
      name="category"
      options={CategoryOptions as any}
      defaultValue={{ label: "Select Category", value: "" }}
      label="Category"
      loading={isLoading}
      required={true}
      setState={setCategory}
    />
  );
};

export default SelectCategoryField;
