"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";
import UploadImage from "@/components/ui/UploadImage";
import HeadingUI from "@/components/ui/dashboardUI/HeadingUI";
import { removeNullUndefinedAndFalsey } from "@/hooks/removeNullUndefinedAndFalsey";
import {
  useGetSingleCourse_labelQuery,
  useUpdateCourse_labelMutation,
} from "@/redux/api/adminApi/courseLevelApi";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import { Button, Col, Row } from "antd";
import { useState } from "react";
import SelectStatusCategoryFIeld from "../Forms/GeneralField/SelectStatusCategoryFIeld";

export default function EditCourseLabel({ courseLabelId }: { courseLabelId: string }) {
  const [isReset, setIsReset] = useState(false);
  const [category, setCategoryValue] = useState();
  const { data: Course_labelData = {}, isLoading } = useGetSingleCourse_labelQuery(
    courseLabelId,
    {
      skip: !Boolean(courseLabelId),
    }
  );
  console.log("🚀 ~ EditCourseLabel ~ Course_labelData:", Course_labelData)
  // const { data: Course_labelData = [] } = useGetAllCourse_labelQuery({});
  const [updateCourse_label, { isLoading: updateLoading, error }] =
    useUpdateCourse_labelMutation();

  const onSubmit = async (values: any) => {
    removeNullUndefinedAndFalsey(values);


    try {
      const res = await updateCourse_label({

        id: courseLabelId,
        data: { category, ...values },
      }).unwrap();

      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("successfully updated data");
        setIsReset(true);
      }
    } catch (err: any) {
      console.error(err);
      Error_model_hook(err?.message || err?.data);
    }
  };
  if (isLoading || updateLoading) {
    return <LoadingForDataFetch />;
  }
  if (error) {
    console.log(error);
  }

  return (
    <div>
      <div className="max-w-md mx-auto rounded-xl shadow-xl p-3 bg-white">
        {/* resolver={yupResolver(adminSchema)} */}
        {/* resolver={yupResolver(ICourse_labelSchema)} */}
        <Form
          isReset={isReset}
          submitHandler={onSubmit}
          defaultValues={Course_labelData}
        >
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <HeadingUI>Course label Information</HeadingUI>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                xs={24}
                md={24}
                lg={24}
                style={{
                  marginBottom: "20px",
                  // maxWidth: "30vw",
                  // margin: "0 auto",
                }}
              >
                <SelectStatusCategoryFIeld
                  defaultData={Course_labelData?.category}
                  setCategoryValue={setCategoryValue}
                />
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                md={24}
                lg={24}
                style={{
                  marginBottom: "20px",
                  maxWidth: "30vw",
                  margin: "0 auto",
                }}
              >
                <FormInput
                  type="text"
                  name="title"
                  size="large"
                  label="Course_label Name"
                 
                />
              </Col>
              <Col
                className="gutter-row"
                xs={8}
                style={{
                  marginBottom: "20px",
                  // maxWidth: "30vw",
                  // margin: "0 auto",
                }}
              >
                <FormInput
                  type="number"
                  name="serial_number"
                  
                  size="large"
                  label={`Serial number`}
                />
              </Col>

              <Col
                className="gutter-row"
                xs={24}
                style={{
                  marginTop: "18px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <UploadImage name="img" defaultImage={Course_labelData?.img} />
              </Col>
            </Row>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button htmlType="submit" type="default">
              Update Course label
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

// export default dynamic(() => Promise.resolve(EditCourse_label), {
//   ssr: false,
// });
