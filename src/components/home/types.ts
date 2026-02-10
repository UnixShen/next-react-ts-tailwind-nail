import type { ModalProps } from 'antd-mobile';

export interface ModalItemProps extends Omit<ModalProps, 'visible' | 'onClose'> {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    title: React.ReactNode;
    children?: React.ReactNode;
    addType: ADD_TYPE_VALUE;
}

export enum ADD_TYPE {
    ADD_INCOME = "新增业绩",
    ADD_EXPENSE = "新增支出",
    ADD_INSIGHT = "今日心得",
}

export enum ADD_TYPE_VALUE {
    ADD_INCOME = "income",
    ADD_EXPENSE = "expense",
    ADD_INSIGHT = "insight",
}

export interface AddFormValues {
    type: ADD_TYPE_VALUE;
    amount: number;
    date: string;
    content?: string;
    id?: number;
}