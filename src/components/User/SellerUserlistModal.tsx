import { useGetAllSellersQuery } from '@/redux/api/adminApi/sellerApi';
import React, { useState } from 'react';
import LoadingSkeleton from '../ui/Loading/LoadingSkeleton';
import { useDebounced } from '@/redux/hooks';
import Image from 'next/image';
import { Button, Input, Pagination, PaginationProps } from 'antd';
import ActionBar from '../ui/ActionBar';
import { ReloadOutlined } from '@ant-design/icons';
import CustomImageTag from '../ui/CustomTag/CustomImageTag';
import fileObjectToLink from '@/utils/fileObjectToLink';
import {
  useAddTeacherAccessCourseyMutation,
  useDeleteTeacherAccessCourseyMutation,
} from '@/redux/api/adminApi/teacherAccessCourseApi';
import {
  confirm_modal,
  Error_model_hook,
  Success_model,
} from '@/utils/modalHook';
import UMTable from '../ui/UMTable';

export default function SellerUserlistModal({
  courseId,
}: {
  courseId: string;
}) {
  const [addCourse, { isLoading: aLoading }] =
    useAddTeacherAccessCourseyMutation();
  const [removeTeacherAccess, { isLoading: tLoading }] =
    useDeleteTeacherAccessCourseyMutation();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const query: Record<string, string | number> = {};
  query['needProperty'] = 'course';
  query['limit'] = size;
  query['page'] = page;
  query['sortBy'] = sortBy;
  query['sortOrder'] = sortOrder;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query['searchTerm'] = debouncedSearchTerm;
  }
  const { data, isLoading, isFetching } = useGetAllSellersQuery(query);
  const mainDate = data?.data;

  const meta = data?.meta;
  if (isLoading) {
    return <LoadingSkeleton />;
  }
  const handleAdd = async (data: any) => {
    confirm_modal(`Are you sure you want Add`).then(async (res) => {
      if (res.isConfirmed) {
        try {
          const res = await addCourse({ ...data, courseId }).unwrap();
          //   console.log('🚀 ~ confirm_modal ~ res:', res);

          Success_model('Successfully added Teacher');
        } catch (error: any) {
          Error_model_hook(error.message);
        }
      }
    });
  };
  const handleRemove = async (id: string) => {
    confirm_modal(`Are you sure you want Remove`).then(async (res) => {
      if (res.isConfirmed) {
        try {
          const res = await removeTeacherAccess(id).unwrap();
          //   console.log('🚀 ~ confirm_modal ~ res:', res);

          Success_model('Successfully Remove Teacher');
        } catch (error: any) {
          Error_model_hook(error.message);
        }
      }
    });
  };
  const columns = [
    {
      title: 'Image',
      width: 110,
      // dataIndex: 'image',
      render: (record: any) => (
        <div className="flex items-center justify-center">
          <CustomImageTag
            src={record.image ? fileObjectToLink(record.image) : record.img}
            alt="Seller"
            className="size-14 rounded-full"
            width={300}
            height={500}
            // objectFit="cover"
          />
        </div>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (name: { firstName: string; lastName: string }) => (
        <span>
          {name?.firstName} {name?.lastName}
        </span>
      ),
    },

    {
      title: 'Email',
      dataIndex: 'email',
      render: (email: string) => (
        <p className="truncate text-gray-700">{email}</p>
      ),
      width: 110,
    },
    {
      title: 'Action',
      width: 110,
      render: (record: any) => {
        console.log('🚀 ~ record:', record);
        const accesscourseArray: any[] = record.accessCourses;
        const isExaistCourse = accesscourseArray.find(
          (access) => access.courseId === courseId,
        );

        return (
          <div className="flex items-center justify-center">
            {isExaistCourse ? (
              <Button
                type="default"
                loading={tLoading}
                onClick={() => handleRemove(isExaistCourse._id)}
              >
                Remove
              </Button>
            ) : (
              <Button
                type="primary"
                loading={aLoading}
                onClick={() =>
                  handleAdd({
                    authUserId: record?.userDetails[0]?._id,
                    authRoleBaseUserId: record?._id,
                  })
                }
              >
                Add
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    //
    setSortBy(field as string);
    setSortOrder(order === 'ascend' ? 'asc' : 'desc');
  };

  const resetFilters = () => {
    setSortBy('');
    setSortOrder('');
    setSearchTerm('');
  };

  return (
    <div>
      <ActionBar>
        <div className="flex gap-2">
          <Input
            size="large"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '300px',
            }}
          />
          {/* <FilterLesson
            filterValue={filterValue}
            setFilterValue={setFilterValue}
          /> */}
        </div>
        <div>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              style={{ margin: '0px 5px' }}
              type="default"
              onClick={resetFilters}
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </ActionBar>

      <UMTable
        loading={isLoading || isFetching}
        columns={columns}
        dataSource={mainDate}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
}
