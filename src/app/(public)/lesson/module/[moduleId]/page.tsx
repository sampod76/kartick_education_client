'use client';
import ModuleTab from '@/components/module/ModuleTab';
import SideModuleList from '@/components/module/SideModuleList';
import LoadingSkeleton from '@/components/ui/Loading/LoadingSkeleton';
import { useGetSingleModuleQuery } from '@/redux/api/adminApi/moduleApi';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import Link from 'next/link';
export default function LessonPage({
  params,
}: {
  params: { moduleId: string };
}) {
  const moduleId = params.moduleId;
  const { data: moduleData, isLoading } = useGetSingleModuleQuery(moduleId);
  // console.log('🚀 ~ moduleData:', moduleData);
  const milestoneId = moduleData?.milestone?._id;

  if (isLoading) {
    return <LoadingSkeleton number={10} />;
  }

  const activeClass =
    '   text-[14px] lg:text-[18px] font-bold bg-[#FB8500] text-white rounded';
  const inactiveClass = '  text-[14px] lg:text-[18px]  ';

  /*  const tabsItems2: TabsProps['items'] = modulesData?.map(
    (singleModule: any, index: number) => ({
      label: (
        <button
          className={`${
            activeTabKey === String(index + 1) ? activeClass : inactiveClass
          } p-1`}
        >
          <p className="px-1"> {singleModule?.title}</p>
        </button>
      ),
      key: String(index + 1),
      children: (
        <div>
          <ModuleTop moduleData={singleModule} />
          <ModuleTab moduleId={singleModule?._id} moduleData={singleModule} />
        </div>
      ),
    }),
  ); */

  return (
    <div
      style={{
        backgroundImage:
          'url(https://img.freepik.com/free-vector/school-themed-background-template_1308-26300.jpg?t=st=1731181642~exp=1731185242~hmac=76f6831a2a6746f6759730bd1151f3285903c0fed609e43a65a248a514af356f&w=900)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
      className="mb-5 min-h-screen rounded-2xl shadow-lg shadow-purple-300"
    >
      <div className="min-h-screen py-3 backdrop-blur-md">
        <div className="mb-3 mt-5 block items-center justify-between gap-3 px-2 lg:flex lg:px-7">
          <Link
            href={`/course/milestone/${moduleData?.milestone?.course._id}?categoryName=${moduleData?.category?.title}&courseName=${moduleData?.milestone?.course?.title}`}
            className="flex w-[7rem] cursor-pointer items-center gap-2 rounded border border-[#30ACFB] p-2 font-bold uppercase"
          >
            <ArrowLeftOutlined
              style={{
                color: '#30ACFB',
                fontWeight: '800',
                fontSize: '18px',
              }}
            />
            <span>Module</span>
          </Link>
          <div className="mt-3 flex items-center gap-5 md:mt-0 lg:mt-0 xl:mt-0">
            <h1 className="flex flex-col">
              <span className="text-sm text-black">Category</span>
              <span className="text-sm text-black lg:text-lg">
                {/* <EllipsisMiddle suffixCount={2} maxLength={20}> */}
                {moduleData?.milestone?.course?.category?.title}
                {/* </EllipsisMiddle> */}
              </span>
            </h1>
            <h1 className="flex flex-col">
              <span className="text-sm text-black">Module</span>
              <Tooltip title={moduleData?.title}>
                <span className="max-w-56 truncate text-sm text-black lg:text-lg">
                  {/* <EllipsisMiddle suffixCount={1} maxLength={7}> */}
                  {moduleData?.title}
                  {/* </EllipsisMiddle> */}
                </span>
              </Tooltip>
            </h1>
          </div>
        </div>

        {/*//! small banner */}
        <div className="my-2 px-2 lg:px-5">
          {/* <h1 className="text-center text-black font-semibold text-2xl md:text--3xl lg:text-3xl xl:text-4xl my-5 ">IBLossom Math Kindergarten Two</h1> */}
          <div className="flex min-h-10 flex-col items-center justify-center lg:min-h-[6rem]">
            <h2 className="text-lg font-bold text-black lg:text-4xl">
              Overview{' '}
            </h2>
          </div>
        </div>

        <div className="mt-5 px-2 lg:px-4">
          <div className="items- block justify-center gap-5 lg:flex">
            {/* //! Side  */}
            <div className="w-full px-2 lg:max-w-[30%] lg:px-5">
              {/* <ModuleList milestoneId={milestoneId}></ModuleList> */}
              <SideModuleList milestoneId={milestoneId} moduleId={moduleId} />
              <hr className="-mx-7 overflow-hidden border-[#eec699] lg:border-none" />
            </div>

            {/* main */}
            <div className="w-full lg:max-w-[70%]">
              {/* //! top user sections */}
              {/* <div className="flex flex-col justify-center items-center mb-5">
              <Image
                src={AllImage.profileAvater || ""}
                width={300}
                height={300}
                className="w-[7rem]  h-[7rem] rounded-full"
                alt=""
              />
              <h3 className="text-[#AAA4A4] font-semibold"> David</h3>
            </div> */}
              {/* <ModuleTop moduleData={moduleData} /> */}
              <ModuleTab moduleId={moduleId} moduleData={moduleData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
