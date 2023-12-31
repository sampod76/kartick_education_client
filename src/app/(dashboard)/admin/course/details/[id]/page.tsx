"use client";

import Form from "@/components/Forms/Form";
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
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import { Button, Col, Input, InputNumber, Row } from "antd";

import Image from "next/image";
import { useState } from "react";

const BookingDetails = ({ params }: any) => {
  const [changeBookingTickets, setChangeBookingTickets] = useState<number>(0);
  const { data: bookingData, isLoading } = useGetSingleBookingQuery(
    params?.id,
    {
      skip: !Boolean(params?.id),
    }
  );

  // const { data: categoryData = [], isLoading: categoryLoading } =
  //   useGetAllCategoryQuery({});
  const [updateBooking, { isLoading: bookingLoading }] =
    useUpdateBookingMutation();

  const onSubmit = async (data: any) => {
    const updateData = {
      ...data,
      bookingTickets: changeBookingTickets || bookingData?.bookingTickets,
    };

    try {
      //@ts-ignore
      const res = await updateBooking({
        id: params?.id,
        body: updateData,
      }).unwrap();
      if (res.success == false) {
        Error_model_hook(res?.message + "");
      } else {
        Success_model("Successfully update booking");
      }
    } catch (error) {
      console.log(error);
    }
  };
  //

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
  if (isLoading || bookingLoading) {
    return <LoadingForDataFetch />;
  }
  return (
    <>
      <div
        style={{ marginLeft: "auto", marginRight: "auto", marginTop: "2.5rem" }}
        className="container "
      >
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }} /* className="flex justify-between items-center" */
          >
            <h1
              style={{
                fontSize: "1.125rem",
                lineHeight: "1.75rem",
                fontWeight: 700,
              }} /* className="text-lg font-bold" */
            >
              Service name : {bookingData?.service?.title}
            </h1>
            <Image
              src={bookingData?.service?.image || NO_IMAGE}
              width={300}
              height={300}
              style={{ width: "4rem", height: "4rem" }}
              /* className="w-16 h-16" */
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
                type="text"
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

          <div style={{ marginTop: "0.25rem" }} /* className="mt-1" */>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
              }} /* className="flex flex-wrap justify-between items-center" */
            >
              {/* <FormInput
                label="Booking Sit "
                type="number"
                size="large"
                name="bookingTickets"
              /> */}
              <div>
                <h1>Booking Sit</h1>
                <InputNumber
                  type="number"
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
                <h1>Total price</h1>
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
              <FormSelectField
                name="status"
                label="Select status"
                options={[
                  {
                    value: "pending",
                    label: "Pending",
                  },
                  {
                    value: "accept",
                    label: "Accept",
                  },
                  {
                    value: "reject",
                    label: "Reject",
                  },
                  // {
                  //   value: "complete",
                  //   label: "Complete",
                  // },
                ]}
              />
            </Col>
          </Row>
          <FormInput label="location/address" name="address" />

          <FormTextArea label="Passenger Note" name="note" />
          <FormTextArea
            label="Authority Note"
            name="authorityNote"
            placeholder="Please provide authorityNote"
          />
          <div
            style={{
              display: "flex",
              marginTop: "0.5rem",
              marginBottom: "0.5rem",
              justifyContent: "center",
              alignItems: "center",
            }} /* className="my-2 flex justify-center items-center" */
          >
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default BookingDetails;
