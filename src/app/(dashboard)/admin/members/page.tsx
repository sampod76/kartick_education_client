'use client';
import { ReloadOutlined } from '@ant-design/icons';

import LoadingSkeleton from '@/components/ui/Loading/LoadingSkeleton';
import {
  useDeleteMemberMutation,
  useGetAllMemberQuery,
} from '@/redux/api/adminApi/memberApi';
import {
  confirm_modal,
  Error_model_hook,
  Success_model,
} from '@/utils/modalHook';

import {
  Button,
  Dropdown,
  Input,
  Select,
  Space,
  TableProps,
  Tooltip,
} from 'antd';
import { useState } from 'react';

import ModalComponent from '@/components/Modal/ModalComponents';
import MemberModal from '@/components/members/MemberModal';
import ActionBar from '@/components/ui/ActionBar';
import CustomImageTag from '@/components/ui/CustomTag/CustomImageTag';
import UMTable from '@/components/ui/UMTable';
import { IMeta } from '@/types/common';

export default function MemberListCom() {
  //
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(100);
  const [sortBy, setSortBy] = useState<string>('serial_number');
  const [sortOrder, setSortOrder] = useState<string>('desc');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [memberType, setMemberType] = useState<string>('');
  query['limit'] = size;
  query['page'] = page;
  query['sortBy'] = sortBy;
  query['sortOrder'] = sortOrder;
  query['memberType'] = memberType;

  const { data, isLoading } = useGetAllMemberQuery(query);
  const [deleteCategory, { isLoading: dLoading }] = useDeleteMemberMutation();
  if (isLoading) {
    return <LoadingSkeleton />;
  }
  const handleDelete = (id: string) => {
    confirm_modal(`Are you sure you want to delete`).then(async (res: any) => {
      if (res.isConfirmed) {
        try {
          const res = await deleteCategory(id).unwrap();
          Success_model('Successfully Deleted');
        } catch (error: any) {
          Error_model_hook(error.message);
        }
      }
    });
  };
  let resentUser = data?.data || [];

  const meta = (data?.meta as IMeta) || [];

  const columns: TableProps<any>['columns'] = [
    {
      title: 'Title',
      ellipsis: true,
      key: '_id',
      render: (record: any) => (
        <div className="flex items-center justify-start gap-2">
          <CustomImageTag
            src={record?.image}
            width={550}
            height={550}
            preview={true}
            className="h-8 w-8 rounded-full shadow-lg md:h-12 md:w-12"
            alt=""
          />
          <Tooltip title={record.title}>
            <p className="truncate">{record.title}</p>
          </Tooltip>
        </div>
      ),
    },
    {
      title: 'Type',
      key: '_id',
      dataIndex: ['memberType'],
      width: 150,
    },
    {
      title: 'Status',
      key: '_id',
      ellipsis: true,
      dataIndex: ['status'],
      render: (record: any) => (
        <div className="flex items-start justify-between gap-2">
          <p>{record}</p>
        </div>
      ),
      width: 200,
    },
    {
      title: 'Date',
      key: '_id',
      ellipsis: true,
      render: (record: any) => (
        <div className="flex items-start justify-between gap-2">
          <p>{new Date(record.createdAt).toDateString()}</p>
        </div>
      ),
      width: 200,
    },
    {
      title: 'Action',
      key: '_id',
      width: 120,
      render: (record: any) => {
        const menuItems = [
          {
            key: 'view',
            label: (
              <ModalComponent
                button={
                  <Button className="!w-20" type="default">
                    View
                  </Button>
                }
              >
                <MemberModal initialValues={record} readOnly={true} />
              </ModalComponent>
            ),
          },
          {
            key: 'edit',
            label: (
              <ModalComponent
                button={
                  <Button className="!w-20" type="default">
                    Edit
                  </Button>
                }
              >
                <MemberModal initialValues={record} />
              </ModalComponent>
            ),
          },
          {
            key: 'delete',
            label: (
              <Button
                className="!w-20"
                type="default"
                loading={dLoading}
                onClick={() => handleDelete(record._id)}
              >
                Delete
              </Button>
            ),
          },
        ];

        return (
          <Space size="middle">
            <Dropdown
              placement="bottom"
              arrow
              menu={{ items: menuItems }} // Pass items directly to the menu prop
            >
              <button className="text-blue-700">Action</button>
            </Dropdown>
          </Space>
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
    setMemberType('');
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <h1 className="text-2xl font-bold capitalize">Member list</h1>
          <ModalComponent
            button={
              <p className="mx-2 cursor-pointer rounded-xl border px-3 text-lg font-bold text-green-400">
                Create Member
              </p>
            }
          >
            <MemberModal />
          </ModalComponent>
        </div>

        <ActionBar>
          <div className="mx-2">
            <Select
              onChange={(value) => setMemberType(value)}
              placeholder="Select a member type"
              allowClear
              size="large"
            >
              <Select.Option value="boardOfTrustees">
                Board Of Trustees
              </Select.Option>
              <Select.Option value="leadership">Leadership</Select.Option>
              <Select.Option value="ourStaff">Our Staff</Select.Option>
            </Select>
          </div>
          <Input
            size="large"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '250px',
            }}
          />
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              style={{ margin: '0px 5px' }}
              type="default"
              onClick={resetFilters}
            >
              <ReloadOutlined />
            </Button>
          )}
        </ActionBar>
      </div>
      <div className="bgd2">
        <UMTable
          loading={isLoading}
          columns={columns}
          dataSource={resentUser}
          pageSize={size}
          totalPages={meta?.total}
          showSizeChanger={true}
          onPaginationChange={onPaginationChange}
          onTableChange={onTableChange}
          showPagination={true}
        />
      </div>
    </div>
  );
}
