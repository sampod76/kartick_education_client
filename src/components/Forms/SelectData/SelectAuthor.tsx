import React from "react";
import FormSelectField from "../FormSelectField";
import { useGetAllUsersQuery } from "@/redux/api/adminApi/usersApi";

const SelectAuthorField = () => {
  const { data: usersData } = useGetAllUsersQuery({});
  console.log(usersData);

  const AuthorOptions = usersData?.data?.data?.map((item: any) => {
    return {
      label: item?.email,
      value: item?._id,
    };
  });

  console.log(AuthorOptions);
  return (
    <FormSelectField
      size="large"
      name="author"
      options={AuthorOptions}
      label="Author"
      // placeholder="Select"
      required={true}
    />
  );
};

export default SelectAuthorField;
