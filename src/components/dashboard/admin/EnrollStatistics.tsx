import { Column } from '@ant-design/plots';
import React from 'react';

const data = [
  { month: '1', value: 1078 },
  { month: '2', value: 1216 },
  { month: '3', value: 758 },
  { month: '4', value: 623 },
  { month: '5', value: 319 },
  { month: '6', value: 422 },
  { month: '7', value: -4 },
  { month: '8', value: -217 },
  { month: '9', value: -358 },
  { month: '10', value: 1513 },
  { month: '11', value: 1388 },
  { month: '12', value: 597 },
];


export default function EnrollStatistics() {

    if (typeof window === 'undefined') {
        // Running on the server, return a placeholder or handle appropriately
        return <div>Chart cannot be rendered on the server.</div>;
      }
    const config = {
        data,
        xField: 'month',
        yField: 'value',
        scale: {
          y: {
            domainMax: 2000,
            domainMin: -1000,
          },
        },
        axis: {
          x: {
            labelFormatter: (val: string) => `${val} 月`,
          },
        },
        annotations: [
          {
            type: 'rangeX',
            data: [{ month: ['7', '9'] }],
            xField: 'month',
          },
        ],
      };


      return(<>
      
 {/* <Column {...config}/> */}
      
      </>)


    //   return <Column {...config} />;
}


