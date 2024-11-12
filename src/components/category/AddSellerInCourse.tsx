'use client';
import { useGetAllCategoryQuery } from '@/redux/api/adminApi/categoryApi';
import {
  useAddCatagoriesByAdminToSellerMutation,
  useGetSingleSellerQuery,
} from '@/redux/api/adminApi/sellerApi';
import { Error_model_hook, Success_model } from '@/utils/modalHook';
import type { CheckboxProps } from 'antd';
import { Button, Checkbox, Divider } from 'antd';
import { useEffect, useState } from 'react';

const CheckboxGroup = Checkbox.Group;
// const plainOptions = [
//   { label: 'Apple', value: '66d4406a9c0f7bdd939310fa' },
//   { label: 'Orange', value: '66e9c1f1220fbc560fee3ba6' },
// ];

export default function AddSellerInCourse({ sellerId }: { sellerId: string }) {
  const { data, isLoading } = useGetAllCategoryQuery({});
  const { data: findSeller, isLoading: sellerLoading } =
    useGetSingleSellerQuery(sellerId);
  //   console.log('🚀 ~ AddSellerInCourse ~ findSeller:', findSeller);
  const [addCateroyAdmin, { isLoading: aloading }] =
    useAddCatagoriesByAdminToSellerMutation();
  //   console.log('🚀 ~ AddSellerInCourse ~ data:', data);
  const [checkedList, setCheckedList] = useState<any>();
  //   console.log('🚀 ~ AddSellerInCourse ~ checkedList:', checkedList);

  useEffect(() => {
    if (findSeller?.accessCategories?.length) {
      const setDefaults = findSeller?.accessCategories?.map(
        (data: any) => data?.category?._id,
      );

      setCheckedList(setDefaults);
    }
  }, [findSeller?.updatedAt]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const plainOptions = data?.data?.map((d: any) => ({
    label: d.title,
    value: d._id,
  })) as any;
  const checkAll = plainOptions?.length === checkedList?.length;
  const indeterminate =
    checkedList?.length > 0 && checkedList?.length < plainOptions?.length;

  const onChange = (list: string[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };
  const submit = async () => {
    try {
      const accessCategories = checkedList?.map((checked: any) => ({
        category: checked,
      }));
      console.log(
        '🚀 ~ accessCategories ~ accessCategories:',
        accessCategories,
      );
      const res = await addCateroyAdmin({
        id: sellerId,
        data: { accessCategories },
      }).unwrap();
      console.log('🚀 ~ submit ~ res:', res);
      Success_model('Successfully added');
    } catch (error: any) {
      Error_model_hook(error?.message);
      console.log('🚀 ~ submit ~ error:', error);
    }
  };

  return (
    <div>
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        Check all
      </Checkbox>
      <Divider />
      <CheckboxGroup
        options={plainOptions}
        value={checkedList}
        onChange={onChange}
        style={{ flex: 'column' }}
      />
      <div className="my-4 flex items-center justify-center">
        <Button loading={aloading || sellerLoading} onClick={submit}>
          Submit
        </Button>
        <Button onClick={() => setCheckedList([])}>Reset</Button>
      </div>
    </div>
  );
}
