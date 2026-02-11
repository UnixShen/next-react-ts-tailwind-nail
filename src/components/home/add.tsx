"use client"

import { Button, Space } from "antd-mobile";
import { useState, } from "react";

import { ModalItem } from "./modal/modal";
import { ADD_TYPE } from "./types";
import { ADD_TYPE_VALUE } from "@/types";

export const Add = () => {
    const [addType, setAddType] = useState<ADD_TYPE_VALUE>();
    const [showModal, setShowModal] = useState(false);

    const handleSolve = (value: ADD_TYPE_VALUE) => {
        setAddType(value);
        setShowModal(true);
    };

    return (
        <>
            <Space wrap className="p-4 bg-pink-100 rounded-2xl shadow-inner-soft flex justify-around items-center w-full">
                <Button block shape='rounded' size='middle' className={addType === ADD_TYPE_VALUE.ADD_INCOME ? "text-pink-500 ring-2 ring-pink-400" : ""} onClick={() => handleSolve(ADD_TYPE_VALUE.ADD_INCOME)}>{ADD_TYPE.ADD_INCOME}</Button>
                <Button block shape='rounded' size='middle' className={addType === ADD_TYPE_VALUE.ADD_EXPENSE ? "text-pink-500 ring-2 ring-pink-400" : ""} onClick={() => handleSolve(ADD_TYPE_VALUE.ADD_EXPENSE)}>{ADD_TYPE.ADD_EXPENSE}</Button>
                <Button block shape='rounded' size='middle' className={addType === ADD_TYPE_VALUE.ADD_INSIGHT ? "text-pink-500 ring-2 ring-pink-400" : ""} onClick={() => handleSolve(ADD_TYPE_VALUE.ADD_INSIGHT)}>{ADD_TYPE.ADD_INSIGHT}</Button>
            </Space>
            <ModalItem
                showModal={showModal}
                setShowModal={setShowModal}
                title={addType === ADD_TYPE_VALUE.ADD_INCOME ? ADD_TYPE.ADD_INCOME : addType === ADD_TYPE_VALUE.ADD_EXPENSE ? ADD_TYPE.ADD_EXPENSE : ADD_TYPE.ADD_INSIGHT}
                addType={addType as ADD_TYPE_VALUE}
            />
        </>

    )
}