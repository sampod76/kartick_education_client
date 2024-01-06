import React from "react";
import FormSelectField from "../FormSelectField";
import { useGetAllUsersQuery } from "@/redux/api/adminApi/usersApi";
import { ENUM_STATUS } from "@/constants/globalEnums";
import FormSearchSelectField from "../FormSearchSelectField";

const SelectAuthorField = () => {
  const query: Record<string, any> = {};
  query["status"] = ENUM_STATUS.ACTIVE;
  query["multipleRole"] = "admin,trainer";
  //! for Course options selection
  // query["limit"] = 999999;
  // query["sortBy"] = "title";
  // query["sortOrder"] = "asc";
  const { data: usersData, isLoading } = useGetAllUsersQuery({
    ...query,
  });
  // console.log(usersData);

  const AuthorOptions = usersData?.data?.map((item: any) => {
    return {
      label: item?.email,
      value: item?._id,
    };
  });


  return (
    <FormSearchSelectField
      size="large"
      name="author"
      options={AuthorOptions}
      label="Author"
      defaultValue={{ label: "Select Trainer", value: "" }}
      required={true}
      loading={isLoading}
    />
  );
};

export default SelectAuthorField;
