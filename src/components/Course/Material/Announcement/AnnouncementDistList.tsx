import ModalComponent from '@/components/Modal/ModalComponents';
import LoadingSkeleton from '@/components/ui/Loading/LoadingSkeleton';
import { DateFormatByDayJs } from '@/components/Utlis/DateFormatByDayJs';
import { useGetAllAnnouncementQuery } from '@/redux/api/adminApi/announcementApi';
import { Button, Pagination, PaginationProps } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import AnnouncementForm from './CreateAnnouncement';

export default function Announcement({ courseId }: { courseId: string }) {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  query['limit'] = size;
  query['page'] = page;
  query['sortBy'] = sortBy;
  query['sortOrder'] = sortOrder;
  query['searchTerm'] = searchTerm;
  query['courseId'] = courseId;
  const { data, isLoading } = useGetAllAnnouncementQuery(query);
  if (isLoading) {
    return <LoadingSkeleton />;
  }
  console.log(data);
  const allData = data?.data || [];
  const meta = data?.meta;
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    page,
    limit,
  ) => {
    setPage(page);
    setSize(limit);
  };

  const onChange: PaginationProps['onChange'] = (page) => {
    setPage(page);
  };
  return (
    <div>
      <div className="flex items-center justify-end">
        <ModalComponent buttonText="Create Announcement">
          <AnnouncementForm courseId={courseId} />
        </ModalComponent>
      </div>
      <div className="mt-2">
        {allData.map((item, index) => (
          <div key={index}>
            <div
              className="mb-2 rounded-lg border border-blue-300 bg-blue-50 p-2 text-blue-800 dark:border-blue-800 dark:bg-gray-800 dark:text-blue-400"
              role="alert"
            >
              <div className="flex items-center">
                <svg
                  className="mr-2 h-4 w-4 flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <h3 className="text-lg font-medium">{item?.title}</h3>
              </div>
              <div className="mb-4 mt-2 line-clamp-3 text-sm">
                {item?.description}
              </div>
              <div className="flex">
                {item?.startDate && new Date(item.startDate) <= new Date() ? (
                  <Link target="_blank" href={item?.zoho?.link || ''}>
                    <button className="mr-2 inline-flex items-center rounded-lg bg-blue-800 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-200">
                      <svg
                        className="mr-2 h-3 w-3"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 14"
                      >
                        <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                      </svg>
                      Join Class
                    </button>
                  </Link>
                ) : (
                  <div className="flex items-center justify-start gap-2">
                    <Button
                      disabled
                      className="mr-2 inline-flex items-center rounded-lg bg-blue-800 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-200"
                    >
                      <svg
                        className="mr-2 h-3 w-3"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 14"
                      >
                        <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                      </svg>
                      Join Class{' '}
                    </Button>
                    <div className="flex justify-start gap-2 text-black">
                      <p className="text-green-400">
                        Start:{' '}
                        {item?.startDate &&
                          DateFormatByDayJs(
                            item?.startDate,
                            'DD MMMM YYYY hh:mm',
                          )}
                      </p>

                      <p className="text-red-400">
                        End:{' '}
                        {item?.endDate &&
                          DateFormatByDayJs(
                            item?.endDate,
                            'DD MMMM YYYY hh:mm',
                          )}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* <div
          className="mb-4 rounded-lg border border-red-300 bg-red-50 p-4 text-red-800 dark:border-red-800 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <div className="flex items-center">
            <svg
              className="mr-2 h-4 w-4 flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <h3 className="text-lg font-medium">This is a danger alert</h3>
          </div>
          <div className="mb-4 mt-2 text-sm">
            More info about this danger alert goes here. This example text is
            going to run a bit longer so that you can see how spacing within an
            alert works with this kind of content.
          </div>
          <div className="flex">
            <button className="mr-2 inline-flex items-center rounded-lg bg-red-800 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-red-300">
              <svg
                className="mr-2 h-3 w-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 14"
              >
                <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
              </svg>
              View more
            </button>
            <button className="rounded-lg border border-red-800 bg-transparent px-3 py-1.5 text-xs font-medium text-red-800 hover:bg-red-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300">
              Dismiss
            </button>
          </div>
        </div> */}
      </div>
      <div className="mt-4">
        <Pagination
          showSizeChanger
          showQuickJumper
          current={page}
          onChange={onChange}
          onShowSizeChange={onShowSizeChange}
          defaultCurrent={1}
          total={meta?.total}
          align="end"
        />
      </div>
    </div>
  );
}
