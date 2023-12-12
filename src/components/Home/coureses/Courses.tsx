import { Col, Row, Tabs } from 'antd';
import React from 'react';
import SIngleCourse from './SIngleCourse';

const Courses = ({data}:{data:any[]}) => {
    // console.log("🚀 ~ file: Courses.tsx:5 ~ Courses ~ data:", data)

    return (
        <div className='mt-[5rem] container mx-auto'>
          <Row justify="space-around" align="middle">
          {
            data.map((item:any, index:number) => {
                return (
                   <Col key={index+1} lg={6} md={12} sm={24}>
                   <SIngleCourse course={item}/>
                   </Col>
                )
            })
           }
          </Row>
        </div>
    );
};

export default Courses;