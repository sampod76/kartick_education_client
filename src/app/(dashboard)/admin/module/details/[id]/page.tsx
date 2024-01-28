import DetailsMilestoneDash from '@/components/milestone/details/DetailsMilestoneDash';
import DetailsModuleDash from '@/components/module/details/DeatilsModuleDash';
import React from 'react';

const ModuleDetailsPage = ({ params }: { params: { id: string } }) => {
  return (
    <div >
    <DetailsModuleDash moduleId={params?.id} />
    </div>
  );
};

export default ModuleDetailsPage;