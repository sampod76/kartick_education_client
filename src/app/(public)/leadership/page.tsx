'use client';
import CustomImageTag from '@/components/ui/CustomTag/CustomImageTag';
import LoadingSkeleton from '@/components/ui/Loading/LoadingSkeleton';
import SupportDonateHelpDesk from '@/components/widgets/SupportDonate';
import { useGetAllMemberQuery } from '@/redux/api/adminApi/memberApi';
import { useDebounced } from '@/redux/hooks';
import Image from 'next/image';
import { useState } from 'react';

export default function Leadership() {
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
  query['memberType'] = 'leadership';
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query['searchTerm'] = debouncedSearchTerm;
  }
  // const Administartions = [
  //   {
  //     image:
  //       'https://iblossomlearn.s3.us-east-2.amazonaws.com/dashboard/tuang1+(2).jpg',
  //     h1: 'Dr. Sabah Kunle-Elfaramawy',
  //     h2: 'Founder/Head of School',
  //     h3: 'Chief Education Officer',
  //     email: 'dr.sabah-elfaramawy@iblossomlearn.org',
  //   },
  //   {
  //     image:
  //       'https://res.cloudinary.com/duyfxtcdd/image/upload/v1725388370/banner/u50kjlunrulyvmr15sqs.jpg', //nan image
  //     h1: 'Sam Lewis',
  //     h2: 'Director of Finance',
  //     h3: '',
  //     email: 'dr.sabah-elfaramawy@iblossomlearn.org',
  //   },

  //   {
  //     image:
  //       'https://res.cloudinary.com/duyfxtcdd/image/upload/v1726083714/man/ugqktqvhbwt9msmsnyu4.jpg',
  //     h1: 'Meah Hill ',
  //     h2: 'Social and Emotional Learning Specialist',
  //     h3: '',
  //     email: 'dr.sabah-elfaramawy@iblossomlearn.org',
  //   },
  //   {
  //     image:
  //       'https://res.cloudinary.com/duyfxtcdd/image/upload/v1726083715/man/bge8xe2qe00zbensmmyy.jpg',
  //     h1: 'Barbra Morgan',
  //     h2: 'Special Education Program Director',
  //     h3: '',
  //     email: 'dr.sabah-elfaramawy@iblossomlearn.org',
  //   },
  //   {
  //     image:
  //       'https://res.cloudinary.com/duyfxtcdd/image/upload/v1726083715/man/djbq72cmowrpbzzohzrh.jpg',
  //     h1: 'Tung Hoang',
  //     h2: 'Chief Data and Analytics Specialist',
  //     h3: '',
  //     email: 'dr.sabah-elfaramawy@iblossomlearn.org',
  //   },
  //   {
  //     image:
  //       'https://iblossomlearn.s3.us-east-2.amazonaws.com/dashboard/New+Project+(6).png',
  //     // 'https://iblossomlearn.s3.us-east-2.amazonaws.com/dashboard/New+Project+(5).png',
  //     h1: 'Dr. Shawky Salah Elfaramawy',
  //     h2: 'Director of iBlossomLearn  Language Institute',
  //     h3: '',
  //     email: 'dr.sabah-elfaramawy@iblossomlearn.org',
  //   },
  //   {
  //     image:
  //       'https://res.cloudinary.com/duyfxtcdd/image/upload/v1726083714/man/kriurwycaer8jrak4fgv.jpg',
  //     h1: 'Gilles Konan Kouadio',
  //     h2: 'Communication and Marketing  Specialist Family Engagement Director',
  //     h3: '',
  //     email: 'dr.sabah-elfaramawy@iblossomlearn.org',
  //   },
  //   {
  //     image:
  //       'https://res.cloudinary.com/duyfxtcdd/image/upload/v1726083714/man/kriurwycaer8jrak4fgv.jpg',
  //     h1: 'Gilles Konan Kouadio',
  //     h2: 'Communication and Marketing  Specialist Family Engagement Director',
  //     h3: '',
  //     email: 'dr.sabah-elfaramawy@iblossomlearn.org',
  //   },
  // ];

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
            src={
              'https://res.cloudinary.com/duyfxtcdd/image/upload/v1725384976/g5xsc3vlwacfta30iefr.png'
            }
            width={1900}
            height={750}
            alt=""
            className="h-full w-full overflow-auto lg:h-[50vh] lg:w-[100vw]"
          />
          <h1 className="absolute left-1/2 top-1/2 mx-auto w-fit -translate-x-1/2 -translate-y-1/2 transform whitespace-nowrap rounded-[35px] bg-white bg-opacity-50 px-5 py-3 text-xl text-black lg:px-10 lg:text-2xl">
            Leadership
          </h1>
        </div>
        <div className="h-10 bg-primary"></div>
        <div className="mb-20 space-y-5 px-5 py-7 text-center lg:space-y-12 lg:px-28">
          <h1
            data-aos="zoom-in"
            className="mt-2 text-3xl font-bold lg:mt-6 lg:text-4xl"
          >
            Leadership
          </h1>
          <p data-aos="zoom-in" className="bodyText lg:pb-6">
            iBlossomLearn is guided by a dynamic leadership team dedicated to
            providing a comprehensive and innovative educational experience. At
            the helm is the Chairperson & Chief Educational Director, who
            combines strategic leadership with deep expertise in curriculum
            development, ensuring that every program meets the highest
            educational standards. Supported by a committed Board of Trustees,
            including roles in finance, community outreach, and technology, the
            leadership team works collaboratively to uphold the school’s
            mission. Together, they foster a nurturing and adaptive learning
            environment that equips students to thrive in a rapidly changing
            world.
          </p>
          <div>
            {/* <div className="flex flex-col gap-3 py-[30px] ">
              <div className="grid sm:px-0 px-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 gap-4 xl:gap-10">
                {Administartions?.map((item: any, index: any) => {
                  return (
                    <div
                      data-aos={index % 2 == 0 ? "zoom-in" : "zoom-out"}
                      // data-aos={index % 2 == 0 ? "flip-right" : "flip-left"}
                      key={index}
                      className="bg-[#e4dfdf] text-center flex flex-col justify-between items-center pb-7 rounded-xl shadow-lg"
                    >
                      <div className="">
                        <Image
                          src={item?.image}
                          alt=""
                          width={700}
                          height={700}
                          className=" h-60 rounded-t-xl"
                        />
                      </div>
                      <div className="my-2 px-5">
                        <h4> {item?.h1}</h4>
                        <h5>{item?.h2}</h5>
                        <h5 className="my-2">{item?.h3}</h5>
                      </div>
                      <div className="justify-self-end">
                        <button className="bg-[#5373fe] mt-2 rounded-3xl px-10 text-white">
                          Bio
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div> */}
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
      </div>
      <SupportDonateHelpDesk />
    </div>
  );
}
