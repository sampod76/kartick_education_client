"use client";
import { useGetSingleContactQuery } from '@/redux/api/adminApi/contactApi';
import React from 'react'
import CardLoading from '../ui/Loading/CardLoading';

export default function ViewContact({ contactId }: { contactId: string }) {

    const { data: contactData, isLoading
    } = useGetSingleContactQuery(contactId)

    if (isLoading) {
        return <>
            <CardLoading />
        </>
    }

    
    return (
        <div className=''>
            <div className="container mx-auto bg-white rounded shadow p-6 mb-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">{contactData?.name}</h2>
                    <span className="text-gray-500">{contactData?.createdAt}</span>
                </div>
                <div className="mb-4">
                    <p className="text-gray-700">
                        <span className="font-semibold">Email:</span> {contactData?.email}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Subject:</span> {contactData?.subject}
                    </p>
                </div>
                <div>
                    <p className="text-gray-700">
                        <span className="font-semibold">Message:</span> {contactData?.message}
                    </p>
                </div>
            </div></div>
    )
}
