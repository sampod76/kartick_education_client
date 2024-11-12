'use client';
import CourseStatistics from '../CourseStatistics';
import MilestoneHomeList from '../MilestoneHomeList';

export default function CourseMilestoneDetails({
  courseId,
}: {
  courseId: string;
}) {
  return (
    <div
      className={`rounded-xl shadow-2xl shadow-purple-300`}
      style={{
        backgroundImage:
          'url(https://img.freepik.com/free-vector/back-school-essentials_1308-174766.jpg?t=st=1731186122~exp=1731189722~hmac=38c8584247843e9bc6f6ef1a208b85e84897da1731e4390b78989bfa1102e6fa&w=1380)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div className="rounded-xl backdrop-blur-sm">
        <CourseStatistics courseId={courseId} />
        <MilestoneHomeList courseId={courseId} />
      </div>
    </div>
  );
}
