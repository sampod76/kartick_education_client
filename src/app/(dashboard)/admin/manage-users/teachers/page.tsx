'use client';
import ActionBar from '@/components/ui/ActionBar';
import UMTable from '@/components/ui/UMTable';
import { useDebounced } from '@/redux/hooks';
import { DeleteOutlined, EyeOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input, Menu, Space } from 'antd';
import Link from 'next/link';
import { useState } from 'react';

import {
  confirm_modal,
  Error_model_hook,
  Success_model,
} from '@/utils/modalHook';
import dayjs from 'dayjs';

import { useGlobalContext } from '@/components/ContextApi/GlobalContextApi';
import ModalComponent from '@/components/Modal/ModalComponents';
import AddSellerInCourse from '@/components/category/AddSellerInCourse';
import { useAddAdminWithFormDataMutation } from '@/redux/api/adminApi';
import {
  useDeleteSellerMutation,
  useGetAllSellersQuery,
} from '@/redux/api/adminApi/sellerApi';

const TeacherOrSellerPage = () => {
  // const SUPER_ADMIN = USER_ROLE.ADMIN;
  const [addCategory, { isLoading: categoryLoading }] =
    useAddAdminWithFormDataMutation();
  const { userInfo, userInfoLoading } = useGlobalContext();
  const query: Record<string, any> = {};
  const [deleteSeller] = useDeleteSellerMutation();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [adminId, setAdminId] = useState<string>('');

  query['limit'] = size;
  query['page'] = page;
  query['sortBy'] = sortBy;
  query['sortOrder'] = sortOrder;
  // query["status"] = "active";

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query['searchTerm'] = debouncedSearchTerm;
  }
  const { data, isLoading } = useGetAllSellersQuery({
    ...query,
  });

  //@ts-ignore
  const StudentData = data?.data;

  //@ts-ignore
  const meta = data?.meta;

  const columns = [
    {
      title: 'Name',
      render: function (data: any) {
        //
        const fullName = `${data?.name?.firstName} ${data?.name?.lastName}  `;
        return <>{fullName}</>;
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },

    {
      title: 'Created at',
      dataIndex: 'createdAt',
      render: function (data: any) {
        return data && dayjs(data).format('MMM D, YYYY hh:mm A');
      },
      sorter: true,
    },
    {
      title: 'Contact no.',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Date Of Birth',
      dataIndex: 'dateOfBirth',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Action',
      dataIndex: '_id',
      width: 130,
      render: function (_id: any) {
        return (
          <div className="flex items-center justify-center gap-1">
            <Space size="middle">
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key="details">
                      <Link
                        href={`/${userInfo?.role}/manage-users/teachers/details/${_id}`}
                      >
                        <Button className="w-full" type="default">
                          <EyeOutlined /> view
                        </Button>
                      </Link>
                    </Menu.Item>
                    <ModalComponent buttonText="Add Course Category">
                      <AddSellerInCourse sellerId={_id} />
                    </ModalComponent>
                    <Menu.Item key="details">
                      <Button
                        onClick={() => deleteSellerHandler(_id)}
                        type="default"
                        danger
                        className="w-full"
                      >
                        <DeleteOutlined /> delete
                      </Button>
                    </Menu.Item>
                  </Menu>
                }
              >
                <button className="text-blue-700">Action</button>
              </Dropdown>
            </Space>
          </div>
        );
      },
    },
  ];
  const onPaginationChange = (page: number, pageSize: number) => {
    //  //
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

  const deleteSellerHandler = async (id: string) => {
    confirm_modal(`Are you sure you want to delete`).then(async (res) => {
      if (res.isConfirmed) {
        try {
          const res = await deleteSeller(id).unwrap();
          if (res?.success == false) {
            // message.success("Admin Successfully Deleted!");
            // setOpen(false);
            Error_model_hook(res?.message);
          } else {
            Success_model('Teacher Successfully Deleted');
          }
        } catch (error: any) {
          Error_model_hook(error.message);
        }
      }
    });
  };
  // if (isLoading) {
  //   return <LoadingForDataFetch />;
  // }
  return (
    <div
      style={{
        boxShadow:
          '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        borderRadius: '1rem',
        backgroundColor: 'white',
        padding: '1rem',
      }}
    >
      <ActionBar title="Teacher List">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '250px',
          }}
        />
        <div>
          <Link href={`/${userInfo?.role}/manage-users/teachers/create`}>
            <Button type="default">Create teacher</Button>
          </Link>
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
        loading={isLoading}
        columns={columns}
        dataSource={StudentData}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
};

export default TeacherOrSellerPage;
