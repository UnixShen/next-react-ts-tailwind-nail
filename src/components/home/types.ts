import type { ModalProps } from 'antd-mobile';

import type { ADD_TYPE_VALUE } from "@/types";

export interface ModalItemProps extends Omit<ModalProps, 'visible' | 'onClose'> {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    title: React.ReactNode;
    children?: React.ReactNode;
    addType: ADD_TYPE_VALUE;
}

export enum ADD_TYPE {
    ADD_INCOME = "新增业绩",
    ADD_EXPENSE = "新增退款",
    ADD_INSIGHT = "今日心得",
}