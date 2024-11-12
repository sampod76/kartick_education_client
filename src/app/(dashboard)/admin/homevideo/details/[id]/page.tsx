"use client"
import HomeVideoCard from '@/components/shared/HomeVideoCard';
import { useGetSingleVideoQuery } from '@/redux/api/adminApi/homeVideoApi';
import React from 'react'

const HomeVideoDetailPage = ({params}:any) => {

    const id = params?.id;

    const { data, isLoading: loading }  = useGetSingleVideoQuery(id);

    const item = data && data.length > 0 ? data[0] : null;

//   console.log(data[0],"data");


  return (
    <div>
        <HomeVideoCard
              
              title={item?.title}
              desc={item?.description}
              videoname={item?.videoFileName}
              videoURl={item?.videoURL}
            />
    </div>
  )
}

export default HomeVideoDetailPage