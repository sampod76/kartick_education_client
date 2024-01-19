import React from "react";
import FormSelectField from "../FormSelectField";

import { useGetAllCourseQuery } from "@/redux/api/adminApi/courseApi";
import FormSearchSelectField from "../FormSearchSelectField";
import LabelUi from "@/components/ui/dashboardUI/LabelUi";
import { Select } from "antd";

const SelectStatusCoursesFIeld = ({
  categoryId,
  setCourseValue,
  disable = false,
}: {
  categoryId?: string | null | "";
  setCourseValue: React.Dispatch<React.SetStateAction<any>>;
  disable?: boolean;
}) => {

  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const onSearch = (value: string) => {
     //  // console.log("search:", value);
  };
  const query: Record<string, any> = {};
  //! for Course options selection
  query["limit"] = 999999;
  query["sortBy"] = "title";
  query["sortOrder"] = "asc";
  query["status"] = "active";
  query['category']=categoryId
  const { data: Course, isLoading } = useGetAllCourseQuery(
    { ...query },
    { skip: !Boolean(categoryId) }
  );
  const CourseData = Course?.data;
  // console.log(CourseData)
  const CourseOptions = CourseData?.map((item: any) => {
    return {
      label: item?.title,
      value: item?._id,
    };
  });

  return (
    <div>
      <LabelUi>Select Course <span className="text-red-600 text-lg text-center">*</span></LabelUi>
      <Select
        size="large"
        // onChange={handleChange ? handleChange : onChange}
        onChange={(val) => {
          setCourseValue(val);
        }}
      
        disabled={disable || !Boolean(categoryId)}
        // defaultActiveFirstOption
        defaultValue={{ label: "Select Course", value: "" }}
        options={CourseOptions}
        style={{ width: "100%" }}
        showSearch
        onSearch={onSearch}
        filterOption={filterOption}
        optionFilterProp="children"
        loading={isLoading}
      
        // placeholder={placeholder}
      />
    </div>
  );
};

export default SelectStatusCoursesFIeld;
