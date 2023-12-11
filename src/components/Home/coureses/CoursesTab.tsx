"use client";
import { Tabs, TabsProps } from 'antd';
import React, { useState } from 'react';
import Courses from './Courses';

const CoursesTab = () => {
    const onlineCourseServices = [
        {
          id: 1,
          name: 'Learn JavaScript Essentials',
          instructor: 'John Doe',
          duration: '8 weeks',
          price: 99.99,
          description: 'Master the fundamentals of JavaScript with hands-on projects.',
        },
        {
          id: 2,
          name: 'Web Development Bootcamp',
          instructor: 'Jane Smith',
          duration: '12 weeks',
          price: 149.99,
          description: 'Comprehensive bootcamp covering HTML, CSS, and JavaScript.',
        },
        {
          id: 3,
          name: 'Data Science with Python',
          instructor: 'Alex Johnson',
          duration: '10 weeks',
          price: 129.99,
          description: 'Explore data science concepts using Python and popular libraries.',
        },
        {
          id: 4,
          name: 'Digital Marketing Masterclass',
          instructor: 'Emily White',
          duration: '6 weeks',
          price: 79.99,
          description: 'Learn effective digital marketing strategies for online success.',
        },
        {
          id: 5,
          name: 'Mobile App Development',
          instructor: 'Samuel Brown',
          duration: '14 weeks',
          price: 179.99,
          description: 'Build mobile apps for iOS and Android platforms with React Native.',
        },
        {
          id: 6,
          name: 'Graphic Design Fundamentals',
          instructor: 'Sophia Lee',
          duration: '8 weeks',
          price: 109.99,
          description: 'Unlock your creativity with a foundation in graphic design principles.',
        },
      ];
    const [activeTabKey, setActiveTabKey] = useState("1");
    const handleTabClick = (key: any) => {
        setActiveTabKey(key);
        // console.log(key);
      };

    const tabsItems: TabsProps["items"] = [
        {
          label: <p className=""> Math</p>,
          key: "1",
          children: <Courses data={onlineCourseServices}/>,
        },
        {
          label: <p> Language Arts</p>,
          key: "2",
          children: <Courses data={onlineCourseServices}/>,
        },
        {
          label: <p> Science</p>,
          key: "3",
          children:<Courses data={onlineCourseServices}/>,
        },
      ];
    return (
        <div>
        <Tabs
            defaultActiveKey="1"
            centered
            onChange={handleTabClick}
            items={tabsItems}

            // items={new Array(3).fill(null).map((_, i) => {
            //   const id = String(i + 1);
            //   return {
            //     label: `Tab ${id}`,
            //     key: id,
            //     children: `Content of Tab Pane ${id}`,
            //   };
            // })}
            />
        </div>
    );
};

export default CoursesTab;