"use client";
import { useGlobalContext } from "@/components/ContextApi/GlobalContextApi";
import CreateCourse from "@/components/Course/CreateCourse";
import ModalComponent from "@/components/Modal/ModalComponents";
import FilterCategorySelect from "@/components/dashboard/Filter/FilterCategory";
import ActionBar from "@/components/ui/ActionBar";
import UMModal from "@/components/ui/UMModal";
import UMTable from "@/components/ui/UMTable";
import HeadingUI from "@/components/ui/dashboardUI/HeadingUI";
import { USER_ROLE } from "@/constants/role";
import {
  useDeleteCourseMutation,
  useGetAllCourseQuery,
} from "@/redux/api/adminApi/courseApi";
import { useAppSelector, useDebounced } from "@/redux/hooks";
import {
  Error_model_hook,
  Success_model,
  confirm_modal,
} from "@/utils/modalHook";
import { ReloadOutlined } from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Input,
  Menu,
  Space,
  message,
  Card,
  List,
  Descriptions,
} from "antd";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ILesson } from "@/schemas/lessonSchema";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetAllAssignmentQuery } from "@/redux/api/assernmentApi";
import AssignmentUpload from "@/components/assignment/Assignment";

import { FilePdfOutlined } from "@ant-design/icons";
import { getBaseUrl, getOnlyBaseUrl } from "@/helpers/config/envConfig";
const AssignmentList = () => {
  const query: Record<string, any> = {};

  const getLessonId = useSearchParams().get("lessonId");
  console.log("🚀 ~ AssignmentList ~ getLessonId:", getLessonId);
  const { userInfo, userInfoLoading } = useGlobalContext();
  const [deleteCourse, { isLoading: deleteLoading }] =
    useDeleteCourseMutation();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["status"] = "active";
  if (getLessonId) {
    query["lesson"] = getLessonId;
  }
  if (userInfo?.role !== USER_ROLE.ADMIN) {
    query["author"] = userInfo?.id;
  }

  const { data, isLoading } = useGetAllAssignmentQuery(
    { ...query },
    { skip: !Boolean(getLessonId) }
  );

  //@ts-ignore
  const courseData = data?.data || [];
  console.log("🚀 ~ AssignmentList ~ courseData:", courseData);
  //@ts-ignore
  const meta = data?.meta;

  const handleDelete = (id: string) => {
    confirm_modal(`Are you sure you want to delete`).then(async (res) => {
      if (res.isConfirmed) {
        try {
          const res = await deleteCourse(id).unwrap();
          if (res?.success == false) {
            // message.success("Admin Successfully Deleted!");
            // setOpen(false);
            Error_model_hook(res?.message);
          } else {
            Success_model("Course Successfully Deleted");
          }
        } catch (error: any) {
         
          Error_model_hook(error.message);
        }
      }
    });
  };

  return (
    <div>
      {courseData.map((data) => (
        <div
          key={data?._id}
          className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <div className="px-6 py-4">
            <h2 className="font-bold text-3xl text-center mb-2">
              {data.title}
            </h2>
            <p className="text-gray-700 text-base mb-4">
              {data?.description || ""}
            </p>
            <div className="mb-4">
              <div className="flex justify-start gap-3 font-semibold text-gray-800">
                <span>Total Marks:</span>
                <span>{data?.totalMarks || 0}</span>
              </div>
              <div className="flex justify-start gap-3 font-semibold text-gray-800">
                <span>Pass Marks:</span>
                <span>{data?.passMarks || 0}</span>
              </div>
            </div>
            <div>
              {/* <p>
                Start time:{" "}
                {data.startTime
                  ? new Date(data.startTime).toLocaleDateString()
                  : "N/A"}
              </p>
              <p>
                End time:{" "}
                {data.endTimes
                  ? new Date(data.endTimes).toLocaleDateString()
                  : "N/A"}
              </p> */}
            </div>
            <h3 className="font-semibold text-lg mb-2">PDF Files</h3>
            <ul>
              {data.pdfs.map((pdf: any) => (
                <li key={pdf.server_url} className="flex items-center mb-2">
                  <FilePdfOutlined className="text-red-500 mr-2" />
                  <div>
                    <a
                      href={
                        process.env.NEXT_PUBLIC_API_ONLY_BASE_URL +
                        "/" +
                        pdf?.server_url
                      }
                      className="text-blue-500"
                    >
                      {pdf?.original_filename}
                    </a>
                    {/* <p className="text-gray-600 text-sm">{`Last Modified: ${pdf.lastModifiedDate.toDateString()}`}</p> */}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

// export default AssignmentList;

export default dynamic(() => Promise.resolve(AssignmentList), {
  ssr: false,
});
