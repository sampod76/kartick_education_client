import React from "react";
import FormSelectField from "../FormSelectField";

import { useGetAllCategoryQuery } from "@/redux/api/adminApi/categoryApi";

const SelectCategoryField = ({ defaultData }: { defaultData?: any }) => {
  //! for Category options selection
  const { data: Category } = useGetAllCategoryQuery({});
  const CategoryData = Category?.data;
  // console.log(CategoryData)
  const CategoryOptions = CategoryData?.map((item: any) => {
    return {
      label: item?.title,
      value: item?._id,
    };
  });
  console.log(CategoryOptions);
  return (
    <FormSelectField
      size="large"
      name="category"
      options={CategoryOptions as any}
      defaultValue={defaultData ? defaultData : null}
      label="Category"
      // placeholder="Select"
      required={true}
    />
  );
};

export default SelectCategoryField;
