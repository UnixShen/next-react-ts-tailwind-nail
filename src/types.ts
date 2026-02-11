export enum ADD_TYPE_VALUE {
    ADD_INCOME = "income",
    ADD_EXPENSE = "expense",
    ADD_INSIGHT = "insight",
    BENEFIT = "benefit",
}

export interface AddFormValues {
    type: ADD_TYPE_VALUE;
    amount?: number;
    date?: string;
    content?: string;
    id?: number;
    _id?: string;
}

export interface HomeDataItem {
    type: ADD_TYPE_VALUE;
    title: string;
    amount: number;
}