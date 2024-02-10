"use client";
import SellerPurchased from "@/components/package/SellerPurchased";
import LoadingSkeleton from "@/components/ui/Loading/LoadingSkeleton";
import { ENUM_YN } from "@/constants/globalEnums";
import { useGetAllSingleQuizQuery } from "@/redux/api/adminApi/singleQuizApi";
import { useGetAllUsersQuery } from "@/redux/api/adminApi/usersApi";
import { useGetAllPurchaseAcceptedPackageQuery } from "@/redux/api/public/purchaseAPi";
import { IDecodedInfo, getUserInfo } from "@/services/auth.service";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { GiBookCover } from "react-icons/gi";
import { MdAccountBalance } from "react-icons/md";
import { SiSellfy } from "react-icons/si";

export default function SellerDashboardMain() {
  const [userInfoLoading, setUserInfoLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<Partial<IDecodedInfo>>({
    email: "",
    id: "",
    role: undefined,
  });

  useEffect(() => {
    // Fetch user info asynchronously on the client side
    const fetchUserInfo = async () => {
      const userInfo = (await getUserInfo()) as any;
      setUserInfo(userInfo);
    };
    fetchUserInfo();
    setUserInfoLoading(false);
  }, []);
  const {
    data: allStudent,
    error: UserError,
    isLoading: userLoading,
  } = useGetAllUsersQuery({ isDelete: ENUM_YN.NO, author: userInfo?.id });
  const {
    data: allPurchasePackage,
    error: allPurchasePackageError,
    isLoading: allPurchasePackageLoading,
  } = useGetAllPurchaseAcceptedPackageQuery(
    {
      isDelete: ENUM_YN.NO,
      user: userInfo?.id,
    },
    { skip: !Boolean(userInfo?.id) }
  );
  const {
    data: allSingleQuiz,
    error: allSingleQuizError,
    isLoading: allSingleQuizLoading,
  } = useGetAllSingleQuizQuery(
    {
      isDelete: ENUM_YN.NO,
      user: userInfo?.id,
    },
    { skip: !Boolean(userInfo?.id) }
  );
  if (userLoading || userInfoLoading || allSingleQuizLoading) {
    return <LoadingSkeleton />;
  }
  return (
    <>
      {
        <div className="w-full mx-auto p-4 grid grid-cols-12 gap-2 min-h-screen">
          <div className="col-span-12 relative top-0 z-10">
            {/* <Chart></Chart> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3   gap-4 xl:gap-6 text-[30px]">
              <div className="border text-white bg-[#4e36e2] w-full p-4 shadow rounded-xl flex justify-between items-center h-28 ">
                <p className="border-2 border-white rounded-md p-1">
                  <FaUser className="h-7 w-7" />
                </p>
                <div className="space-y-2">
                  <p className="text-end font-normal text-base lggg:text-lg">
                    Total Student
                  </p>

                  <div className="font-bold font-sans text-end text-2xl">
                    <span>{allStudent?.meta?.total || 0}</span>
                  </div>
                </div>
              </div>
              <div className="border text-white bg-[#1ad588] w-full p-4 shadow rounded-xl flex justify-between items-center h-28">
                <p className="border-2 border-white rounded-md p-1">
                  <GiBookCover className="h-7 w-7" />
                </p>
                <div className="space-y-2">
                  <p className="text-end font-normal text-base lggg:text-lg">
                    Total Purchase Package
                  </p>
                  <div className="font-bold font-sans text-end text-2xl">
                    <span>{allPurchasePackage?.meta?.total || 0}</span>
                  </div>
                </div>
              </div>
              <div className="border text-white bg-[#1a97d5] w-full p-4 shadow rounded-xl flex justify-between items-center h-28">
                <p className="border-2 border-white rounded-md p-1">
                  <GiBookCover className="h-7 w-7" />
                </p>
                <div className="space-y-2">
                  <p className="text-end font-normal text-base lggg:text-lg">
                    Total Submitted Quiz
                  </p>
                  <div className="font-bold font-sans text-end text-2xl">
                    <span>{allSingleQuiz?.meta?.total || 0}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2 ">
              <div className="rounded-lg bg-white max-w-full md:min-h-[40vh] lgg:min-h-[60vh] px-4 py-5 shadow">
                <div className="py-2 align-middle px-2">
                  <h3 className="text-base font-medium underline underline-offset-2">
                    Recent register student
                  </h3>
                  <div className="w-full divide-y divide-gray-300">
                    <div className="flex justify-between">
                      <p className="py-3.5 pl-3 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                        Name
                      </p>
                      <p className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        email
                      </p>
                    </div>
                    <div className="divide-y divide-gray-200 space-y-4">
                      {allStudent?.data?.length ? (
                        allStudent?.data?.map((user: any) => (
                          <div
                            key={user?._id}
                            className="flex justify-between gap-3 hover:bg-slate-50 pt-4"
                          >
                            <div className="font-medium leading-6 text-gray-700 group-hover:text-gray-900 capitalize duration-200 ">
                              <p className="line-clamp-1">
                                {user[user.role]?.name?.firstName +
                                  " " +
                                  user[user.role]?.name?.lastName}
                              </p>
                              <p>
                                {new Date(user?.createdAt).toLocaleString()}
                              </p>
                            </div>
                            <div className="py-4 text-sm text-gray-500 capitalize">
                              <p>{user?.email}</p>
                              <p className="line-clamp-1">
                                {user[user.role]?.phoneNumber}
                              </p>{" "}
                              <br />
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="py-20 w-full text-center text-red-400">
                          Empty !
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white max-w-full md:min-h-[40vh] lgg:min-h-[60vh] px-4 py-5 shadow">
                <div className="py-2 align-middle px-2">
                  <h3 className="text-base font-medium underline underline-offset-2">
                    Recent submitted Quiz
                  </h3>
                  <div className="w-full divide-y divide-gray-300">
                    <div className="flex justify-between">
                      <p className="py-3.5 pl-3 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                        Title
                      </p>
                      {/* <p className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Data
                      </p> */}
                    </div>
                    <div className="divide-y divide-gray-200 space-y-4">
                      {allSingleQuiz?.data?.length ? (
                        allSingleQuiz?.data?.map(({ title,_id,createdAt }: any) => (
                          <div
                            key={_id}
                            className="flex justify-between gap-3 hover:bg-slate-50 pt-4"
                          >
                            <div className="font-medium leading-6 text-gray-700 group-hover:text-gray-900 capitalize duration-200 ">
                              <p className="line-clamp-1">{title}</p>
                              <p>{new Date(createdAt).toLocaleString()}</p>
                            </div>
                            
                          </div>
                        ))
                      ) : (
                        <div className="py-20 w-full text-center text-red-400">
                          Empty !
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <Modal
    closeModal={setOpenModal}
    isOpen={openModal?.link ? true : false}
    ownClass={
      "relative w-fit max-w-5xl transform overflow-hidden bg-white shadow-xl transition-all"
    }
  >
    <VimeoPlayer link={openModal.link} />
  </Modal> */}
        </div>
      }
    </>
  );
}
