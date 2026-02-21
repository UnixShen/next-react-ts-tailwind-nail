import React from 'react';
import { InterList } from '@/types';
import { queryHomeList } from '@/service/api';
import { useQuery } from '@tanstack/react-query';

export const Show = () => {
    const { data, isLoading, error } = useQuery<InterList, Error>({
        queryKey: ['todos'],
        queryFn: queryHomeList
    });
    console.log("🚀 ~ Show ~ data:", data)

    if (isLoading) {
        return <div className="text-center fs-14 pt-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center fs-14 pt-10">发生错误: {error.message}</div>;
    }

    return (
        <div className="grid grid-cols-2 gap-4 h-[164px] mt-4">
            {data?.data?.map((item, index) => (
                <div key={item?.id || index} className="bg-pink-100 p-4 rounded-2xl shadow-soft">
                    <p className="text-sm text-gray-600">{item?.title}:</p>
                    <p className="text-3xl font-bold text-gray-800 mt-1">{item?.amount}</p>
                    <div className="mt-3 flex justify-end">
                        <div className="w-12 h-6 bg-pink-200 rounded-full p-1 flex items-center">
                            <div className="w-4 h-4 bg-pink-400 rounded-full shadow-md"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
