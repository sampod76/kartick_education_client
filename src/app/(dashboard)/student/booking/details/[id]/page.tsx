"use client";

import FormCustom from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import FormTimePicker from "@/components/Forms/FormTimePicker";
import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";
import { NO_IMAGE } from "@/constants/filePatch";
import {
  useGetSingleBookingQuery,
  useUpdateBookingMutation,
} from "@/redux/api/bookingApi";
import { useGetAllCategoryQuery } from "@/redux/api/adminApi/categoryApi";
import {
  useAddRatingFeedbackMutation,
  useGetAllRatingFeedbackQuery,
} from "@/redux/api/ratingFeedback";
import { getUserInfo } from "@/services/auth.service";
import {
  Error_model_hook,
  Success_model,
  confirm_modal,
} from "@/utils/modalHook";
import { Button, Col, Input, InputNumber, Row, Form, Rate } from "antd";
import { Rationale } from "next/font/google";

import Image from "next/image";
import { useEffect, useState } from "react";
import { serviceApi } from "../../../../../../redux/api/serviceApi";

const BookingDetails = ({ params }: any) => {
  const [form] = Form.useForm();
  const [user, setUserData] = useState<any>({});
  const [userLoading, setUserLoading] = useState<boolean>(true);
  useEffect(() => {
    setUserData(getUserInfo() as any);
    setUserLoading(false);
    return () => {};
  }, []);
  const [changeBookingTickets, setChangeBookingTickets] = useState<number>(0);
  const { data: bookingData = {}, isLoading } = useGetSingleBookingQuery(
    params?.id,
    {
      skip: !Boolean(params?.id),
    }
  );
  
  const ratingFeedBack = bookingData?.ratingFeedback;

  const [updateBooking, { isLoading: bookingLoading }] =
    useUpdateBookingMutation();
  const [addRating, { isLoading: ratingLoading }] =
    useAddRatingFeedbackMutation();

  const defaultValues = {
    // name:,
    address: bookingData?.address || "",
    bookingDate: bookingData?.bookingDate || "",
    bookingTickets: changeBookingTickets || bookingData?.bookingTickets || 0,
    createdAt: bookingData?.createdAt || "",
    googleMapLink: bookingData?.googleMapLink || "",
    note: bookingData?.note || "",
    authorityNote: bookingData?.authorityNote || "",
    phoneNumber: bookingData?.phoneNumber || "",
    categoryVehicle: bookingData?.service?.category?.title || "",
    status: bookingData?.status || "",
    time: bookingData?.time || "",
    customerName: bookingData?.user?.generalUser?.name || "",
    perSitPrice: bookingData?.service?.price || 0,
  };
  const onFinish = async (values: any) => {

    try {
      const res = await addRating({
        ...values,
        booking: params.id,
        service: bookingData?.service?._id,
      }).unwrap();

      if (res?.success == false) {
        // message.success("Admin Successfully Deleted!");
        // setOpen(false);
        Error_model_hook(res?.message);
      } else {
        // Success_model("Review Successfully add!");
        
        //@ts-ignore
        const resBooking = await updateBooking({
          id: params?.id,
          body: { ratingFeedback: res?._id, status: "complete" },
        }).unwrap();
        
        if (resBooking.success == false) {
          Error_model_hook(resBooking?.message + "");
        } else {
          Success_model("Successfully update booking");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlePayment = (value: string) => {
    confirm_modal("Are you sure you want to payment this", "Yes payment").then(
      async (res) => {
        if (res.isConfirmed) {
          try {
            //@ts-ignore
            const res = await updateBooking({
              id: params?.id,
              body: { payment: true },
            }).unwrap();
            if (res?.success == false) {
              Error_model_hook(res?.message + "");
            } else {
              Success_model("Successfully update booking");
            }
          } catch (error) {
            
          }
        }
      }
    );
  };
  if (isLoading || bookingLoading) {
    return <LoadingForDataFetch />;
  }
  return (
    <>
      <div className="container mx-auto mt-10">
        <FormCustom submitHandler={() => {}} defaultValues={defaultValues}>
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-bold">
              Service name : {bookingData?.service?.title}
            </h1>
            <Image
              src={bookingData?.service?.image || NO_IMAGE}
              width={300}
              height={300}
              className="w-16 h-16"
              alt="booking"
            />
          </div>
          <Row gutter={16}>
            <Col
              className="gutter-row"
              xs={24}
              md={12}
              lg={8}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormInput
                label="User name"
                type="text"
                name="customerName"
                readOnly={true}
                // placeholder="Please provide your phone number"
              />
            </Col>
            <Col
              className="gutter-row"
              xs={24}
              md={12}
              lg={8}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormInput
                label="Phone Number (For contact)"
                type="number"
                name="phoneNumber"
                readOnly={true}
              />
            </Col>
            <Col
              className="gutter-row"
              xs={24}
              md={12}
              lg={8}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormInput
                label="User name"
                type="text"
                name="categoryVehicle"
                readOnly={true}
                // placeholder="Please provide your phone number"
              />
            </Col>
          </Row>

          <div className="mt-1">
            <div className="flex flex-wrap justify-between items-center">
              {/* <FormInput
                label="Booking Sit "
                type="number"
                size="large"
                name="bookingTickets"
              /> */}
              <div>
                <h1 className="text-base font-normal">Booking Sit</h1>
                <InputNumber
                  type="number"
                  readOnly={true}
                  defaultValue={defaultValues.bookingTickets}
                  onChange={(value) => setChangeBookingTickets(value)}
                  style={{ width: "100px" }}
                ></InputNumber>
              </div>
              <FormInput
                label="Par sit (tk)"
                type="number"
                size="large"
                name="perSitPrice"
                readOnly={true}
              />
              <div>
                <h1 className="text-base font-normal">Total price</h1>
                <Input
                  type="text"
                  value={
                    Number(defaultValues.perSitPrice) *
                    Number(defaultValues.bookingTickets)
                  }
                  readOnly
                  style={{ width: "100px" }}
                ></Input>
              </div>
              <FormDatePicker name="bookingDate" label="*Date" size="large" />
              <FormTimePicker name="time" label="time" />
            </div>
          </div>
          <Row gutter={16}>
            <Col
              className="gutter-row"
              xs={24}
              md={16}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormInput
                label="Google Map Link "
                name="googleMapLink"
                placeholder="Please provide googleMapLink"
                readOnly={true}
              />
            </Col>
            <Col
              className="gutter-row"
              xs={24}
              md={8}
              style={{
                marginBottom: "10px",
              }}
            >
              <div className="border-2 p-3 flex flex-col justify-center items-center">
                <h1 className="text-base font-normal">Status</h1>
                <Button
                    type="default"
                  danger={defaultValues?.status === "reject"}
                >
                  {defaultValues?.status}
                </Button>
              </div>
            </Col>
          </Row>
          <FormInput label="location/address" name="address" />

          <FormTextArea label="Passenger Note" name="note" />
          <FormTextArea
            label="Authority Note"
            name="authorityNote"
            placeholder="Please provide authorityNote"
            readOnly={true}
          />
          <div className="m-2">
            {defaultValues.status == "accept" &&
              bookingData?.payment == false && (
                <Button
                  onClick={() => handlePayment(params?.id)}
                    type="default"
                >
                  Payment
                </Button>
              )}
          </div>
          {/* <div className="my-2 flex justify-center items-center">
            <Button htmlType="submit"   type="default">
              Submit
            </Button>
          </div> */}
        </FormCustom>
        <h1 className="text-center text-2xl my-7">Rating and feedback</h1>
        {bookingData?.payment && (
          <div>
            {ratingFeedBack?.rating ? (
              <div className="border-2 rounded-xl p-5">
                <Form
                  name="rating-feedback"
                  form={form}
                  initialValues={{
                    rating: ratingFeedBack?.rating || 0,
                    feedback: ratingFeedBack?.feedback || "",
                  }}
                >
                  <Form.Item name="rating" label="Rating">
                    <Rate disabled />
                  </Form.Item>

                  <Form.Item name="feedback" label="Feedback">
                    <Input.TextArea readOnly rows={4} />
                  </Form.Item>
                </Form>
              </div>
            ) : (
              <div className="border-2 rounded-xl p-5">
                <Form name="rating-feedback" onFinish={onFinish}>
                  <Form.Item
                    name="rating"
                    label="Rating"
                    rules={[
                      { required: true, message: "Please provide a rating" },
                    ]}
                  >
                    <Rate />
                  </Form.Item>

                  <Form.Item
                    name="feedback"
                    label="Feedback"
                    rules={[
                      { required: true, message: "Please provide feedback" },
                    ]}
                  >
                    <Input.TextArea rows={4} />
                  </Form.Item>

                  <Form.Item
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button   type="default" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default BookingDetails;
