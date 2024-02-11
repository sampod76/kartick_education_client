"use client";
import LoadingSkeleton from "@/components/ui/Loading/LoadingSkeleton";
import {
  useDeleteCartMutation,
  useGetAllCartQuery,
} from "@/redux/api/userApi/cartAPi";
import { toggleCartModal } from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IDecodedInfo, getUserInfo } from "@/services/auth.service";
import { ICartData } from "@/types/cartData";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import { Button, Drawer, Space, message } from "antd";
import Image from "next/image";
import React from "react";

export default function CartDrawer() {
  const userInfo = getUserInfo() as IDecodedInfo;
  const { cartModal, course: cartCourse } = useAppSelector(
    state => state.cart
  )

  const { data, isLoading } = useGetAllCartQuery(
    { status: "active" },
    { skip: true }
  );

  const cartData: ICartData[] | undefined = data?.data;
  console.log("cartData", cartData);

  const [deleteCart] = useDeleteCartMutation();

  const dispatch = useAppDispatch();
  const showDrawer = () => {
    // setOpen(true);
    dispatch(toggleCartModal(true));
  };

  const onClose = () => {
    // setOpen(false);
    dispatch(toggleCartModal(false));
  };
  const deleteHandler = async (id: string) => {
    try {
      const res = await deleteCart(id).unwrap();

      if (res?.success == false) {
        // message.success("Admin Successfully Deleted!");
        // setOpen(false);
        Error_model_hook(res?.message);
      } else {
        Success_model("Course Successfully Removed");
      }
    } catch (error: any) {
      Error_model_hook(error.data);
      Error_model_hook(error.message);
    }
  };
  const totalPrice: any =
    !isLoading &&
    cartData?.length &&
    cartData?.reduce((accumulator: number, cartItem: ICartData) => {
      // Extract the price from the first item in the courseDetails array
      const coursePrice = cartItem.courseDetails[0].price;

      // Add the course price to the accumulator
      return accumulator + coursePrice;
    }, 0);

  // console.log(totalPrice, 'totalPrice')
  return (
    <Drawer
      title="Your Cart "
      width={"60%"}
      onClose={onClose}
      open={cartModal}
      styles={{
        body: {
          paddingBottom: 80,
          // overflowY: "auto"
        },
      }}
      extra={
        <Space>
          <Button onClick={onClose}>Close</Button>
        </Space>
      }
    >
      {/* //! start drawer */}

      <div className="w-full h-full bg-blac bg-opacity-90 top- overflow-x-hidden ">
        <div className="w-full absolu z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700">
          <div className="block lg:flex  justify-end">
            {/* //! cart course */}
            <div
              className=" w-full lg:w-2/3  bg-white overflow-y-auto overflow-x-hidden "
              id="scroll"
            >
              {/* <p className="text-5xl font-black leading-10 text-gray-800 pt-3">Course</p> */}
              {isLoading && <LoadingSkeleton />}
              {/*//! course-1  */}
              {!isLoading &&
                cartData?.map((cart: ICartData, index: number) => {
                  const courseData = cart?.courseDetails[0];
                  return (
                    <div
                      key={index}
                      className="md:flex items-center mt-14 py-2 border-t border-gray-200"
                    >
                      <div className="w-1/4">
                        <Image
                          height={200}
                          width={200}
                          src={courseData?.img}
                          alt="cart"
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="md:pl-3 md:w-3/4">
                        <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">
                          {courseData?.status}
                        </p>
                        <div className="flex items-center justify-between w-full pt-1">
                          <p className="text-base font-black leading-none text-gray-800">
                            {courseData?.title}
                          </p>
                        </div>
                        <p className="text-xs leading-3 text-gray-600 pt-2">
                          Height: 10 inches
                        </p>
                        <p className="text-xs leading-3 text-gray-600 py-4">
                          Color: Black
                        </p>
                        <p className="w-96 text-xs leading-3 text-gray-600">
                          Composition: 100% calf leather
                        </p>
                        <div className="flex items-center justify-between pt-5 pr-6">
                          <div className="flex itemms-center">
                            <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">
                              Buy the course
                            </p>
                            <button
                              onClick={() => deleteHandler(courseData?._id)}
                              className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                          <p className="text-base font-black leading-none text-gray-800">
                            $ {courseData?.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* //! summery section */}
            <div className=" w-full lg:w-1/3 bg-gray-100 h-ful mt-2 pt-3 rounded ">
              <div className="flex flex-col md:h-screen px-7 gap-5 overflow-y-auto ">
                <p className="text-4xl font-black leading-9 text-gray-800">
                  Summary
                </p>
                <div className=" mt-5 ">
                  <div className="flex items-center justify-between ">
                    <p className="text-base leading-none text-gray-800">
                      Subtotal
                    </p>
                    <p className="text-base leading-none text-gray-800">
                      ${totalPrice}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-5">
                    <p className="text-base leading-none text-gray-800">
                      Shipping
                    </p>
                    <p className="text-base leading-none text-gray-800">$30</p>
                  </div>
                  <div className="flex items-center justify-between pt-5">
                    <p className="text-base leading-none text-gray-800">Tax</p>
                    <p className="text-base leading-none text-gray-800">$35</p>
                  </div>
                </div>
                <div className="">
                  <div className="flex items-center pb-6 justify-between pt-2">
                    <p className="text-2xl leading-normal text-gray-800">
                      Total
                    </p>
                    <p className="text-2xl font-bold leading-normal text-right text-gray-800">
                      ${Number(totalPrice) + 30 + 35}
                    </p>
                  </div>
                  <button className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
