import { IMilestoneData } from '@/types/miestoneType';
import { ContainerOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import starSvg from '../../assets/svg/star.svg';

export default function SingleMilestone({
  milestoneData,
  index,
}: {
  milestoneData: IMilestoneData;
  index: number;
}) {
  // console.log('milestoneData', milestoneData)

  let res: any;
  const [resData, SetResData] = useState([]);
  const [isOpen, isClose] = useState(false);

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleOpen = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };
  useEffect(() => {}, [isOpen]);

  return (
    <div className="rounded-xl border-2 shadow-xl">
      <Link
        href={`/module/${milestoneData?._id}`}
        className={`leading-1 flex gap-2 py-4 text-start font-['Inter'] text-[20px] font-semibold ${
          index % 8 === 0
            ? 'bg-[#2c92a8]'
            : index % 7 === 0
              ? 'bg-[#0374d4]'
              : index % 6 === 0
                ? 'bg-[#159f85]'
                : index % 5 === 0
                  ? 'bg-[#a95fdc]'
                  : index % 4 === 0
                    ? 'bg-[#2c92a8]'
                    : index % 3 === 0
                      ? 'bg-[#5a9b33]'
                      : index % 2 === 0
                        ? 'bg-[#2c38a8]'
                        : 'bg-[#215461]'
        } rounded-t-md px-3 text-white brightness-95`}
      >
        <ContainerOutlined />
        <span>{milestoneData?.title}</span>

        {/* //! Milestone Title */}
      </Link>

      <div className="grid grid-cols-1 gap-x-2 gap-y-1 px-2 py-3 pl-3 lg:grid-cols-2">
        {milestoneData?.modules?.map((module: any, index: number) => {
          // testfunction(module?._id)
          return (
            // <Link
            //   href={`/lesson/module/${module?._id}?module=${module?.title}`}
            //   key={module?._id || index}
            //   className="text-gray-900 text-start flex justify-start  gap-1"
            // >
            <div key={index}>
              <p className="mt-1">{/* <HiOutlineClipboardDocumentList /> */}</p>
              <div>
                <div className="flex gap-3">
                  {/* <Image
                    className="hover:opacity-[70%]"
                    style={{
                      transform: `${
                        openIndex === index ? 'rotate(180deg)' : 'rotate(90deg)'
                      }`,
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      toggleOpen(index);
                    }}
                    src={Arrow}
                    alt=""
                  /> */}
                  {index + 1}.
                  <Link
                    href={`/lesson/module/${module?._id}?module=${module?.title}`}
                    className="cursor-pointer text-xl font-bold transition-all hover:scale-95"
                  >
                    {' '}
                    {module?.title}
                  </Link>
                </div>
                <div className="pl-5">
                  {openIndex == index ? (
                    resData.map((item: any, index: number) => {
                      return (
                        <p className="flex gap-2" key={index}>
                          <Image alt="" width={12} src={starSvg} />{' '}
                          <Link
                            href={`/lesson/module/${item?.module?._id}?module=${item?.module?.title}`}
                          >
                            {item?.title}
                          </Link>
                        </p>
                      );
                    })
                  ) : (
                    <p className="ml-3"></p>
                  )}
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
