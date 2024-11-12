'use client';
import ActionBar from '@/components/ui/ActionBar';
import UMBreadCrumb from '@/components/ui/UMBreadCrumb';
import {
  Button,
  Dropdown,
  Input,
  Menu,
  Space,
  TableProps,
  Tag,
  message,
} from 'antd';
import Link from 'next/link';
import { ReloadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useDebounced } from '@/redux/hooks';
import UMTable from '@/components/ui/UMTable';

import dayjs from 'dayjs';
import UMModal from '@/components/ui/UMModal';

import Image from 'next/image';
import {
  Error_model_hook,
  Success_model,
  confirm_modal,
} from '@/utils/modalHook';
import {
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
} from '@/redux/api/adminApi/categoryApi';
import HeadingUI from '@/components/ui/dashboardUI/HeadingUI';
import dynamic from 'next/dynamic';
import { AllImage } from '@/assets/AllImge';
import { IDecodedInfo, getUserInfo } from '@/services/auth.service';
import { ENUM_YN } from '@/constants/globalEnums';
import { useGlobalContext } from '../ContextApi/GlobalContextApi';
import { useGetAllDonationQuery } from '@/redux/api/public/donactionApi';

const DonationList = () => {
  const query: Record<string, any> = {};

  // const ADMIN = USER_ROLE.ADMIN;
  const { userInfo, userInfoLoading } = useGlobalContext();
  //

  const [deleteCategory] = useDeleteCategoryMutation();

  const [adminId, setAdminId] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<string>('desc');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  query['limit'] = size;
  query['page'] = page;
  query['sortBy'] = sortBy;
  query['sortOrder'] = sortOrder;
  // query['status'] = 'active';
  // query['isDelete'] = ENUM_YN.NO;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query['searchTerm'] = debouncedSearchTerm;
  }
  const { data, isLoading, isFetching } = useGetAllDonationQuery({ ...query });

  //@ts-ignore
  const donationData = data?.data;

  //@ts-ignore
  const meta = data?.meta;

  const handleDelete = (id: string) => {
    confirm_modal(`Are you sure you want to delete`).then(async (res) => {
      if (res.isConfirmed) {
        try {
          const res = await deleteCategory(id).unwrap();

          if (res?.success == false) {
            // message.success("Admin Successfully Deleted!");
            // setOpen(false);
            Error_model_hook(res?.message);
          } else {
            Success_model('Category Successfully Deleted');
          }
        } catch (error: any) {
          Error_model_hook(error.data);
          Error_model_hook(error.message);
        }
      }
    });
  };

  const columns: TableProps<any>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'userName',
      ellipsis: true,
      //  width: 130,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      ellipsis: true,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      ellipsis: true,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      render: (text) => {
        let color = '';
        switch (text) {
          case 'pending':
            color = 'magenta';
            break;
          case 'approved':
            color = 'green';
            break;
          case 'rejected':
            color = 'red';
            break;
          default:
            color = 'geekblue'; // Default tag color
        }
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'Payment Method',
      dataIndex: ['payment', 'platform'],
      render: (text) => {
        let color = '';
        switch (text) {
          case 'stripe':
            return <div className="capitalize">{text}</div>;
            break;
          case 'paypal':
            return <div className="capitalize">{text}</div>;
            break;
          default:
            return <div className="capitalize">{text}</div>;
        }
      },
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      render: function (data: any) {
        return data && dayjs(data).format('MMM D, YYYY hh:mm A');
      },
      sorter: true,
      width: 220,
    },

    // {
    //   title: 'Action',
    //   // fixed: "right",
    //   width: 120,
    //   render: (record: any) => (
    //     <>
    //       <Space size="middle">
    //         <Dropdown
    //           overlay={
    //             <Menu>
    //               <Menu.Item key="view">
    //                 <Link
    //                   href={`/${userInfo?.role}/category/details/${record._id}`}
    //                 >
    //                   View
    //                 </Link>
    //               </Menu.Item>
    //               <Menu.Item key="edit">
    //                 <Link
    //                   href={`/${userInfo?.role}/category/edit/${record._id}`}
    //                 >
    //                   Edit
    //                 </Link>
    //               </Menu.Item>
    //               {/* <Menu.Item key="add_milestone">
    //                 <Link
    //                   href={`/${userInfo?.role}/category/create/course/${record?._id}?categoryName=${record?.title}`}
    //                 >
    //                   Add Course
    //                 </Link>
    //               </Menu.Item> */}
    //               <Menu.Item
    //                 key="delete"
    //                 onClick={() => {
    //                   handleDelete(record._id);
    //                 }}
    //               >
    //                 Delete
    //               </Menu.Item>
    //             </Menu>
    //           }
    //         >
    //           <button className="text-blue-700">Action</button>
    //         </Dropdown>
    //       </Space>
    //     </>
    //   ),
    // },
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

  const deleteCategoryHandler = async (id: string) => {
    //
    try {
      const res = await deleteCategory(id);
      if (res) {
        message.success('Category Successfully Deleted!');
        setOpen(false);
      }
    } catch (error: any) {
      Error_model_hook(error.message);
    }
  };

  return (
    <div>
      <HeadingUI>Donation List</HeadingUI>
      <ActionBar>
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '250px',
          }}
        />
        <div>
          {/* <Link href={`/${userInfo?.role}/category/create`}>
            <Button type="default">Create Category</Button>
          </Link> */}
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
        dataSource={donationData}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />

      <UMModal
        title="Remove Category"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteCategoryHandler(adminId)}
      >
        <p style={{ marginTop: '1.25rem', marginBottom: '1.25rem' }}>
          Do you want to remove this category?
        </p>
      </UMModal>
    </div>
  );
};

// export default DonationList;

export default dynamic(() => Promise.resolve(DonationList), {
  ssr: false,
});
