import ModalComponent from '@/components/Modal/ModalComponents';
import AnyFileViewer from '@/components/ui/AnyFileViewer';
import CustomImageTag from '@/components/ui/CustomTag/CustomImageTag';
import { IFileAfterUpload } from '@/types/globalType';
import fileObjectToLink from '@/utils/fileObjectToLink';
import { Tooltip } from 'antd';
import Image from 'next/image';
import React from 'react';

interface Author {
  _id: string;
  email: string;
  role: string;
  status: string;
  blockingTimeout: number;
  createdAt: string;
  updatedAt: string;
  isDelete: string;
  admin: {
    _id: string;
    name: {
      firstName: string;
      lastName: string;
      _id: string;
    };
    dateOfBirth: string;
    gender: string;
    email: string;
    phoneNumber: number;
    address: string;
    createdAt: string;
    updatedAt: string;
    isDelete: string;
  };
}

interface Category {
  _id: string;
  title: string;
  status: string;
  isDelete: string;
  serial_number: number;
}

interface Image {
  url: string;
  mimetype: string;
  filename: string;
  path: string;
  cdn: string;
  platform: string;
  createdAt: string;
  updatedAt: string;
}

interface Course {
  _id: string;
  title: string;
  snid: string;
  img: string;
  image: Image;
  details: string;
  short_description: string;
  author: Author;
  category: Category;
  price: number;
  duration: string[];
  price_type: string;
  status: string;
  isDelete: string;
  favorite: string;
  tags: string[];
  syllabus: IFileAfterUpload[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  labelDetails: Record<string, any>;
}

interface CoursePageProps {
  course: Course;
}

const CourseCardMaterial: React.FC<CoursePageProps> = ({ course }) => {
  return (
    <div className="mx-auto flex max-w-6xl items-center justify-start gap-3 rounded-lg bg-white p-6">
      {/* Course Image */}
      <div className="flex justify-center">
        <CustomImageTag
          src={fileObjectToLink(course?.image)}
          alt={course?.title}
          className="h-40 w-40 rounded-lg object-cover shadow-lg"
          preview={true}
        />
      </div>

      <div className="rounded-xl border p-2 shadow-lg">
        {/* Course Title and Category */}
        <div className="mt-4">
          <h1 className="text-xl font-semibold text-gray-800">
            Name: {course.title}
          </h1>
          <p className="text-sm text-gray-500">
            Category: {course.category.title}
          </p>
        </div>

        {/* Status and Tags */}
        <div className="mt-1 flex flex-wrap items-center">
          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${course.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
          >
            {course.status}
          </span>
        </div>
        <div className="mt-1 flex flex-wrap items-center justify-center gap-3">
          {course?.syllabus?.length
            ? course?.syllabus?.map((file: IFileAfterUpload) => {
                return (
                  <div
                    key={file.path}
                    className="flex w-fit items-center justify-start gap-3 rounded-md border"
                  >
                    <ModalComponent
                      button={
                        <Tooltip title="Click and view">
                          <div className="flex items-center justify-center">
                            <p className="max-w-56 cursor-pointer truncate rounded-lg p-1 shadow-lg">
                              {file.filename}
                            </p>
                          </div>
                        </Tooltip>
                      }
                      width={1200}
                      maskClosable={false}
                    >
                      <AnyFileViewer files={[file]} />
                    </ModalComponent>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default CourseCardMaterial;
