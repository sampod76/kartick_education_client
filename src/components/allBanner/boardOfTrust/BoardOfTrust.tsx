/* eslint-disable react/no-unescaped-entities */
'use client';
import CustomImageTag from '@/components/ui/CustomTag/CustomImageTag';
import LoadingSkeleton from '@/components/ui/Loading/LoadingSkeleton';
import SupportDonateHelpDesk from '@/components/widgets/SupportDonate';
import { useGetAllMemberQuery } from '@/redux/api/adminApi/memberApi';
import { useDebounced } from '@/redux/hooks';
import Image from 'next/image';
import { useState } from 'react';

export default function BoardOfTrust() {
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
  query['memberType'] = 'boardOfTrustees';
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
        <div className="relative">
          <Image
            src={'/boardOfTrust.png'}
            width={1900}
            height={750}
            alt=""
            className="h-full w-full overflow-auto lg:h-[50vh] lg:w-[100vw]"
          />
          <h1 className="absolute left-1/2 top-1/2 mx-auto w-fit -translate-x-1/2 -translate-y-1/2 transform whitespace-nowrap rounded-[35px] bg-white bg-opacity-50 px-5 py-3 text-xl text-black lg:px-10 lg:text-2xl">
            Board Of Trustees
          </h1>
        </div>
        <div className="h-10 bg-primary"></div>
        <div className="mb-20 flex flex-col items-center justify-center space-y-5 px-5 py-7 text-center lg:space-y-12 lg:px-28">
          <h1 data-aos="zoom-in" className="bodyHeaderText mt-2 lg:mt-6">
            Board Of Trustees
          </h1>
          <p data-aos="zoom-in" className="bodyText lg:pb-2">
            The Board of Trustees at iBlossomLearn plays a vital role in guiding
            the strategic direction and ensuring the success of the institution.
            Comprised of experienced professionals from various fields, the
            board provides governance, oversight, and support to the school’s
            leadership. Their responsibilities include setting policies,
            ensuring financial stability, and upholding the school’s mission and
            values. The board collaborates closely with the Founder and Chief
            Educational Officer to create a nurturing and innovative learning
            environment that meets the diverse needs of students and families.
          </p>
        </div>
        <div>
          <div>
            <div className="space-y-2 bg-black px-5 py-4 text-white lg:py-10">
              <h1 className="bodyHeaderText text-center">
                Officers of the Board
              </h1>
              <p className="text-center text-xl">
                The Board of Trustees at iBlossomLearn consists of dedicated
                officers who bring a wealth of <br /> knowledge and leadership
                to the institution:
              </p>

              <div className="bodyText flex justify-center">
                <ul className="mx-auto w-fit list-inside list-disc space-y-2 py-4 text-xl">
                  <li data-aos="zoom-in">
                    <strong>Vice Chairperson:</strong> Assists the Chairperson
                    and provides additional leadership support as needed.
                  </li>
                  <li data-aos="zoom-out">
                    <strong>Secretary:</strong> Manages board communications,
                    documentation, and meeting minutes.
                  </li>
                  <li data-aos="zoom-in">
                    <strong>Treasurer:</strong> Oversees financial planning,
                    budgeting, and fiscal oversight.
                  </li>
                  <li data-aos="zoom-out">
                    <strong>Fundraising Chair: :</strong> Leads efforts in
                    securing financial resources and managing donor relations.
                  </li>
                  <li data-aos="zoom-in">
                    <strong>Community Outreach Officer:</strong> Connects the
                    school with the broader community and fosters relationships
                    with external stakeholders.
                  </li>
                  <li data-aos="zoom-out">
                    <strong>Technology Advisor: </strong> Provides guidance on
                    digital learning tools and IT infrastructure to support the
                    school's online programs.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="px-10">
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
