import CourseMaterialCom from '@/components/Course/Material/CourseMaterialCom';

export default function CourseMaterial({
  params,
}: {
  params: { courseId: string };
}) {
  return (
    <div>
      <CourseMaterialCom courseId={params.courseId} />
    </div>
  );
}
