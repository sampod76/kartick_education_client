'use client';

import LoadingSkeleton from '@/components/ui/Loading/LoadingSkeleton';
import { useGetSingleCourseQuery } from '@/redux/api/adminApi/courseApi';
import { Tabs } from 'antd';

import Announcement from './Announcement/AnnouncementDistList';
import CourseCardMaterial from './CourseCardMaterial';

export default function CourseMaterialCom({ courseId }: { courseId: string }) {
  const { data, isLoading } = useGetSingleCourseQuery(courseId);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  const items = [
    {
      key: '1',
      label: 'Announcement',
      children: <Announcement courseId={courseId} />,
    },
    {
      key: '2',
      label: 'Tab 2',
      children: <div>Content for Tab 2</div>,
    },
    {
      key: '3',
      label: 'Tab 3',
      children: <div>Content for Tab 3</div>,
    },
    {
      key: '4',
      label: 'Tab 4',
      children: <div>Content for Tab 4</div>,
    },
  ];

  return (
    <div>
      <CourseCardMaterial course={data} />
      <Tabs centered defaultActiveKey="1" items={items} />
    </div>
  );
}
