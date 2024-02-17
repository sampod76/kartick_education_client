import React from "react";
import FormSelectField from "../FormSelectField";

import { useGetAllCategoryQuery } from "@/redux/api/adminApi/categoryApi";
import FormSearchSelectField from "../FormSearchSelectField";
import { useGetAllCourse_labelQuery } from "@/redux/api/adminApi/courseLevelApi";

const SelectLabelField = ({ defaultData, category }: { defaultData?: any, category?: string }) => {

    //! for Category options selection
    const labelQuery: Record<string, any> = {};
    labelQuery["limit"] = 99999999;

    labelQuery["sortBy"] = "serial_number";
    labelQuery["sortOrder"] = "asc";
    labelQuery["status"] = "active";
    labelQuery["category"] = category;

    const { data: LabelData, isLoading: getLabelLoading } = useGetAllCourse_labelQuery(
        labelQuery,
        { skip: !Boolean(category) }
    );
    const CategoryOptions = LabelData?.data?.map((item: any) => {
        return {
            label: item?.serial_number + "." + " " + item?.title,
            value: item?._id,
        };
    });

    return (
        <FormSearchSelectField
            size="large"
            name="label_id"
            options={CategoryOptions as any}
            defaultValue={{ label: "Select Category", value: "" }}
            label="Course label"
            loading={getLabelLoading}
        // required={true}
        />
    );
};

export default SelectLabelField;
