import { useGetAllCategoryChildrenQuery } from '@/redux/api/categoryChildrenApi';
import React, { useState } from 'react'
import { Select } from 'antd';
import SelectCategoryChildren from '../Forms/GeneralField/SelectCategoryChildren';
import LoadingSkeleton from '../ui/Loading/LoadingSkeleton';

const { Option } = Select;
const timeOptions = [
    { label: 'Today', value: 'today' },
    { label: '2 days ago', value: '2days' },
    { label: '5 days ago', value: '5days' },
    { label: '15 days ago', value: '15days' },
    { label: '30 days ago', value: '30days' },
    // Add more options as needed
];

export default function TopFilterSelect({ setCategory, setCourse, setTime, category }: { setCategory: any, setCourse: any, setTime: any, category: any }) {

    // ///! sort sections
    // const [category, setCategory] = useState<{ _id?: string; title?: string }>(
    //     {}
    // );
    // const [course, setCourse] = useState<{ _id?: string; title?: string }>({});


    const queryCategory: Record<string, any> = {};
    queryCategory["children"] = "course";
    //! for Category options selection
    const { data: Category, isLoading: categoryLoading } =
        useGetAllCategoryChildrenQuery({
            ...queryCategory,
        });
    const categoryData: any = Category?.data;



    if (categoryLoading) {
        return <LoadingSkeleton />
    }
    return (
        <div>  {/* /! sort Section */}
            <div className="flex gap-5 items-center my-2 ">

                <div className="flex gap-2 items-center text-xl">
                    <h5 className='text-gray-600 uppercase '>Category</h5>
                    <SelectCategoryChildren

                        setState={setCategory}
                        isLoading={categoryLoading}
                        categoryData={categoryData}
                    />
                </div>
                <div className="flex gap-2 items-center text-xl">
                    <h5 className='text-gray-600 uppercase '>Course</h5>
                    <SelectCategoryChildren

                        setState={setCourse}
                        categoryData={
                            //@ts-ignore
                            category?.courses || []
                        }
                    />
                </div>
                <div className="flex gap-2 items-center text-xl">
                    <h5 className='text-gray-600 uppercase '>Date Range</h5>
                    <Select dropdownStyle={{ minWidth: "180px" }} placeholder="Select time duration">
                        {timeOptions.map((option) => (
                            <Option key={option.value} value={option.value}>
                                {option.label}
                            </Option>
                        ))}
                    </Select>
                </div>

            </div></div>
    )
}
