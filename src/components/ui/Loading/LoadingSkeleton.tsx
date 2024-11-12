import { Skeleton } from 'antd';
const LoadingSkeleton = ({
  number,
  sectionNumber = 5,
}: {
  number?: number;
  sectionNumber?: number;
}) => (
  <div className="container mx-auto">
    <Skeleton
      avatar
      style={{ marginTop: '1rem' }}
      paragraph={{
        rows: number || 4,
      }}
    />
    <Skeleton
      avatar
      style={{ marginTop: '1rem' }}
      paragraph={{
        rows: number || 4,
      }}
    />
  </div>
);
export default LoadingSkeleton;
