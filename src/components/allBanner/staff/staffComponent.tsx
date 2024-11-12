'use client';
import CustomImageTag from '@/components/ui/CustomTag/CustomImageTag';
import LoadingSkeleton from '@/components/ui/Loading/LoadingSkeleton';
import SupportDonateHelpDesk from '@/components/widgets/SupportDonate';
import { useGetAllMemberQuery } from '@/redux/api/adminApi/memberApi';
import { useDebounced } from '@/redux/hooks';
import Image from 'next/image';
import { useState } from 'react';

export default function StaffComponent() {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(100);
  const [sortBy, setSortBy] = useState<string>('serial_number');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [searchTerm, setSearchTerm] = useState<string>('');
  query['limit'] = size;
  query['page'] = page;
  query['sortBy'] = sortBy;
  query['sortOrder'] = sortOrder;
  query['status'] = 'active';
  query['memberType'] = 'ourStaff';
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query['searchTerm'] = debouncedSearchTerm;
  }

  const { data, isLoading } = useGetAllMemberQuery(query);

  const Administartions = data?.data || [];
  return (
    <div className="">
      <div className="">
        {/* <div
      style={{
        backgroundImage: "url('/banner/careropp.png')",
        backgroundAttachment: "fixed",
        backgroundSize: "cover", // Add this line for covering the full height
        height: "33vh",
      }}
    ></div> */}
        <div className="relative">
          <Image
            src={'/banner/careropp4.png'}
            width={1900}
            height={750}
            alt=""
            className="h-full w-full overflow-auto lg:h-[50vh] lg:w-[100vw]"
          />
          <h1 className="absolute left-1/2 top-1/2 mx-auto w-fit -translate-x-1/2 -translate-y-1/2 transform whitespace-nowrap rounded-[35px] bg-white bg-opacity-50 px-5 py-3 text-xl text-black lg:px-20 lg:text-2xl">
            Our staff
          </h1>
        </div>
        <div className="h-10 bg-primary"></div>
        <div className="mb-6 flex flex-col items-center justify-center space-y-5 px-5 py-7 text-center lg:mb-20 lg:space-y-12 lg:px-28">
          <h1
            data-aos="zoom-in"
            className="mt-2 text-3xl font-bold lg:mt-6 lg:text-4xl"
          >
            Our staff
          </h1>
          <p data-aos="zoom-in" className="bodyText lg:pb-6">
            At iBlossomLearn, our staff is a team of dedicated and passionate
            educators committed to providing the best possible learning
            experience for our students. Each member of our team brings a wealth
            of knowledge and expertise in their respective fields, from
            certified teachers who serve as learning coaches to language
            professors who immerse students in new cultures. Our staff is united
            by a shared mission to support the academic, social, and emotional
            growth of every student, ensuring they thrive in their educational
            journey and beyond.
          </p>
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <div className="flex flex-wrap justify-center gap-10 py-[30px]">
              {Administartions?.map((item: any, index: any) => {
                return (
                  <div
                    data-aos={index % 2 == 0 ? 'zoom-in' : 'zoom-out'}
                    // data-aos={index % 2 == 0 ? "flip-right" : "flip-left"}
                    key={index}
                    className="flex max-h-[500px] max-w-[290px] flex-col items-center justify-start rounded-xl bg-[#e4dfdf] pb-7 text-center shadow-lg"
                  >
                    <div className="">
                      <CustomImageTag
                        src={item?.image}
                        alt=""
                        width={900}
                        height={900}
                        className="h-52 rounded-t-xl bg-cover"
                      />
                    </div>
                    <div className="my-2 px-5">
                      <h4 className="text-lg font-bold"> {item?.title}</h4>
                      <h5>{item?.sub1}</h5>
                      <h5 className="my-2">{item?.sub2}</h5>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <SupportDonateHelpDesk />
    </div>
  );
}
