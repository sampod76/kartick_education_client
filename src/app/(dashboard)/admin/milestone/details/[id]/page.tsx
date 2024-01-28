import DetailsMilestoneDash from '@/components/milestone/details/DetailsMilestoneDash';
import React from 'react';

const MilestoneDetailsPage = ({ params }: { params: { id: string } }) => {
  return (
    <div >
      <p><DetailsMilestoneDash milestoneId={params?.id} /></p>
    </div>
  );
};

export default MilestoneDetailsPage;