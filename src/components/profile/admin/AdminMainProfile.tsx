import React from 'react'
import ProfileAboutSection from '../ProfileAboutSection';
import Courses from '@/components/Home/coureses/Courses';
import SellerPurchased from '@/components/package/SellerPurchased';
import ReviewsPage from '@/components/Course/CourseDetails/ReviewsPage';
import ProfileTabSection from '../ProfileTabSection';


export interface Tab {
    key: string;
    label: string;
    children: React.ReactNode;
}

export default function AdminMainProfile() {
    const TabItems: Tab[] = [
        {
            key: "1",
            label: "About",
            children: <ProfileAboutSection />,
        },
        {
            key: "2",
            label: "Courses",
            children: <Courses query={{ status: "active" }} />,
        },
        {
            key: "3",
            label: "Purchased",
            children: <SellerPurchased />,
        },
        {
            key: "4",
            label: "Reviews",
            children: <ReviewsPage />,
        },
    ];

    return (
        <div>
            <ProfileTabSection items={TabItems} />
        </div>
    );
}
