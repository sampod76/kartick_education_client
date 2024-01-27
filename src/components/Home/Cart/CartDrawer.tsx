"use client"
import { useGetAllCartQuery } from '@/redux/api/userApi/cartAPi'
import { toggleCartModal } from '@/redux/features/cartSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { IDecodedInfo, getUserInfo } from '@/services/auth.service'
import { Button, Drawer, Space } from 'antd'
import React from 'react'

export default function CartDrawer() {

    const userInfo = getUserInfo() as IDecodedInfo
    const { cartModal, course: cartCourse } = useAppSelector(state => state.cart)

    const { data: cartData, isLoading } = useGetAllCartQuery({ status: "active", user: userInfo?.id })

    console.log('cartData', cartData)
    const dispatch = useAppDispatch()
    const showDrawer = () => {
        // setOpen(true);
        dispatch(toggleCartModal(true))
    };

    const onClose = () => {
        // setOpen(false);
        dispatch(toggleCartModal(false))
    }
        ;
    return (

        <Drawer
            title="Create a new account"
            width={'60%'}
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


            <div className="w-full h-full bg-blac bg-opacity-90 top- overflow-x-hidden " >
                <div className="w-full absolu z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" >
                    <div className="block lg:flex  justify-end" >
                        {/* //! cart course */}
                        <div className=" w-full lg:w-2/3  bg-white overflow-y-auto overflow-x-hidden " id="scroll">

                            {/* <p className="text-5xl font-black leading-10 text-gray-800 pt-3">Course</p> */}
                            {/*//! course-1  */}
                            <div className="md:flex items-center mt-14 py-2 border-t border-gray-200">
                                <div className="w-1/4">
                                    <img src="https://cdn.tuk.dev/assets/templates/e-commerce-kit/bestSeller3.png" alt='cart' className="w-full h-full object-center object-cover" />
                                </div>
                                <div className="md:pl-3 md:w-3/4">
                                    <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">RF293</p>
                                    <div className="flex items-center justify-between w-full pt-1">
                                        <p className="text-base font-black leading-none text-gray-800">North wolf bag</p>

                                    </div>
                                    <p className="text-xs leading-3 text-gray-600 pt-2">Height: 10 inches</p>
                                    <p className="text-xs leading-3 text-gray-600 py-4">Color: Black</p>
                                    <p className="w-96 text-xs leading-3 text-gray-600">Composition: 100% calf leather</p>
                                    <div className="flex items-center justify-between pt-5 pr-6">
                                        <div className="flex itemms-center">
                                            <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">Add to favorites</p>
                                            <p className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">Remove</p>
                                        </div>
                                        <p className="text-base font-black leading-none text-gray-800">$9,000</p>
                                    </div>
                                </div>
                            </div>
                            <div className="md:flex items-center py-8 border-t border-gray-200">
                                <div className="w-1/4">
                                    <img src="https://cdn.tuk.dev/assets/templates/e-commerce-kit/bestSeller2.png" alt className="w-full h-full object-center object-cover" />
                                </div>
                                <div className="md:pl-3 md:w-3/4 w-full">
                                    <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">RF293</p>
                                    <div className="flex items-center justify-between w-full pt-1">
                                        <p className="text-base font-black leading-none text-gray-800">Luxe Signature Ring</p>
                                        <select className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none">
                                            <option>01</option>
                                            <option>02</option>
                                            <option>03</option>
                                        </select>
                                    </div>
                                    <p className="text-xs leading-3 text-gray-600 pt-2">Height: 10 inches</p>
                                    <p className="text-xs leading-3 text-gray-600 py-4">Color: Black</p>
                                    <p className="w-96 text-xs leading-3 text-gray-600">Composition: 100% calf leather</p>
                                    <div className="flex items-center justify-between pt-5 pr-6">
                                        <div className="flex itemms-center">
                                            <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">Add to favorites</p>
                                            <p className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">Remove</p>
                                        </div>
                                        <p className="text-base font-black leading-none text-gray-800">$9,000</p>
                                    </div>
                                </div>
                            </div>

                            <div className="md:flex items-center py-8 border-t border-b border-gray-200">
                                <div className="h-full w-1/4">
                                    <img src="https://cdn.tuk.dev/assets/templates/e-commerce-kit/bestSeller1.png" alt className="w-full h-full object-center object-cover" />
                                </div>
                                <div className="md:pl-3 md:w-3/4 w-full">
                                    <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">RF293</p>
                                    <div className="flex items-center justify-between w-full pt-1">
                                        <p className="text-base font-black leading-none text-gray-800">Luxe Signature Shoes</p>
                                        <select className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none">
                                            <option>01</option>
                                            <option>02</option>
                                            <option>03</option>
                                        </select>
                                    </div>
                                    <p className="text-xs leading-3 text-gray-600 pt-2">Height: 10 inches</p>
                                    <p className="text-xs leading-3 text-gray-600 py-4">Color: Black</p>
                                    <p className="w-96 text-xs leading-3 text-gray-600">Composition: 100% calf leather</p>
                                    <div className="flex items-center justify-between pt-5 pr-6">
                                        <div className="flex itemms-center">
                                            <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">Add to favorites</p>
                                            <p className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">Remove</p>
                                        </div>
                                        <p className="text-base font-black leading-none text-gray-800">$9,000</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* //! summery section */}
                        <div className=" w-full lg:w-1/3 bg-gray-100 h-ful mt-2 pt-3 rounded ">
                            <div className="flex flex-col md:h-screen px-7 gap-5 overflow-y-auto ">
                                <p className="text-4xl font-black leading-9 text-gray-800">Summary</p>
                                <div className=' mt-5 '>
                                    <div className="flex items-center justify-between ">
                                        <p className="text-base leading-none text-gray-800">Subtotal</p>
                                        <p className="text-base leading-none text-gray-800">$9,000</p>
                                    </div>
                                    <div className="flex items-center justify-between pt-5">
                                        <p className="text-base leading-none text-gray-800">Shipping</p>
                                        <p className="text-base leading-none text-gray-800">$30</p>
                                    </div>
                                    <div className="flex items-center justify-between pt-5">
                                        <p className="text-base leading-none text-gray-800">Tax</p>
                                        <p className="text-base leading-none text-gray-800">$35</p>
                                    </div>
                                </div>
                                <div className=''>
                                    <div className="flex items-center pb-6 justify-between pt-2">
                                        <p className="text-2xl leading-normal text-gray-800">Total</p>
                                        <p className="text-2xl font-bold leading-normal text-right text-gray-800">$10,240</p>
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

    )
}
