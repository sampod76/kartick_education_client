import { SVGYelloDot } from "@/assets/svg/Icon";
import { IMilestoneData } from "@/types/miestoneType";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ContainerOutlined } from "@ant-design/icons";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import axios from "axios";
import starSvg from "../../assets/svg/star.svg"
import Arrow from '../../assets/svg/Arrow.svg'
import Image from "next/image";





export default function SingleMilestone({
  milestoneData,
  index,
}: {
  milestoneData: IMilestoneData;
  index: number;
}) {
  // console.log('milestoneData', milestoneData)

  let res :any ;
  const  [resData , SetResData] = useState([])
  const [isOpen, isClose] = useState(false)

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleOpen = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };
  useEffect(()=>{

      

  },[isOpen])





  const testfunction =  async(modueid : string)=>{

    


    try {
       let tes = await  axios.get(`https://api.iblossomlearn.org/api/v1/lesson?module=${modueid}&limit=999999&sortBy=lesson_number&sortOrder=asc&status=active&isDelete=no`)

      console.log(tes.data.data, "done bye aya ");
      // res = tes.data.data

      SetResData(tes.data.data)

      
      
    } catch (error) {
      console.log(error);
      
    }

  }

  return (
    <div className="border-2 shadow-xl  rounded-xl">
      <Link
        href={`/module/${milestoneData?._id}`}
        className={`text-start text-[20px] flex gap-2 font-semibold font-['Inter'] leading-1 py-4  ${index % 8 === 0
          ? "bg-[#2c92a8]"
          : index % 7 === 0
            ? "bg-[#0374d4]"
            : index % 6 === 0
              ? "bg-[#159f85]"
              : index % 5 === 0
                ? "bg-[#a95fdc]"
                : index % 4 === 0
                  ? "bg-[#2c92a8]"
                  : index % 3 === 0
                    ? "bg-[#5a9b33]"
                    : index % 2 === 0
                      ? "bg-[#2c38a8]"
                      : "bg-[#215461]"
          }  text-white px-3 brightness-95 rounded-t-md`}
      >
        <ContainerOutlined />
        <span>{milestoneData?.title}</span>

        {/* //! Milestone Title */}
      </Link>

      <div className="py-3 px-2 pl-3 gap-x-2 gap-y-1 grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

        {milestoneData?.modules?.map((module: any, index: number) => {
          // testfunction(module?._id)
          return (
            // <Link
            //   href={`/lesson/module/${module?._id}?module=${module?.title}`}
            //   key={module?._id || index}
            //   className="text-gray-900 text-start flex justify-start  gap-1"
            // >
            <div key={index}>
              <p className="mt-1">
                {/* <HiOutlineClipboardDocumentList /> */}
                
              </p>
              <div>
              <div className="flex gap-3">
                <Image
                className="hover:opacity-[70%]"
                          style={{
                            transform: `${
                              openIndex === index
                                ? "rotate(180deg)"
                                : "rotate(90deg)"
                            }`,
                            cursor: "pointer",
                            
                          }}
                          onClick={() => {
                            toggleOpen(index), testfunction(module?._id);
                          }}
                          src={Arrow}
                          alt=""
                        />
              <Link href={`/lesson/module/${module?._id}?module=${module?.title}}`} className="text-lg font-bold cursor-pointer hover:text-gray-600" > {module?.title}</Link>
              
                </div>
              <div className="pl-5">
                {
                  openIndex == index ? (resData.map((item:any, index:number)=>{
                    console.log(item);
                    return(
                      <p className="flex gap-2" key={index}><Image alt="" width={12}  src={starSvg}/> {" "}
                      <Link href={`/lesson/module/${item?.module?._id}?module=${item?.module?.title}`}>{item?.title}</Link></p>
                    )
                  })
        ): <p>............</p>}
              </div>

              </div>
              
            {/* </Link> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
