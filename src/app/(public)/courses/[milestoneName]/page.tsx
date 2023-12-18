import React from 'react';

const MilestonePage = ({
    params: { milestoneName },
  }: {
    params: { milestoneName: string };
  }) => {
    return (
        <div>
            <h2>This is milestone {milestoneName}</h2>
        </div>
    );
};

export default MilestonePage;