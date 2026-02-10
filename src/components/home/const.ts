import { ADD_TYPE_VALUE } from "./types";

export const ShowData = [
    {
        title: "今日业绩",
        amount: "¥0",
    },
    {
        title: "本月总业绩",
        amount: "¥0",
    },
    {
        title: "今日提成",
        amount: "¥0",
    },
    {
        title: "本月提成",
        amount: "¥0",
    },
    {
        title: "今日支出",
        amount: "¥0",
    },
    {
        title: "本月总支出",
        amount: "¥0",
    },
];

export const AddTypeOptions = [
    {
        label: '业绩',
        value: ADD_TYPE_VALUE.ADD_INCOME,
    },
    {
        label: '支出',
        value: ADD_TYPE_VALUE.ADD_EXPENSE,
    },
    {
        label: '心得',
        value: ADD_TYPE_VALUE.ADD_INSIGHT,
    },
]