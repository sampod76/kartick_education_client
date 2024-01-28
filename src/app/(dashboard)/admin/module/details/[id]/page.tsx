import DetailsMilestoneDash from '@/components/milestone/details/DetailsMilestoneDash';
import React from 'react';

const ModuleDetailsPage = ({ params }: { params: { id: string } }) => {
  return (
    <div >
    <DetailsMilestoneDash milestoneId={params?.id} />
    </div>
  );
};

export default ModuleDetailsPage;