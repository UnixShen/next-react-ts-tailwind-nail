import { AddFormValues, HomeDataItem, ADD_TYPE_VALUE } from "@/types";

export const formatHomeData = (today: AddFormValues[], month: AddFormValues[]): HomeDataItem[] => {
    const todayIncome = today.filter((item) => item.type === ADD_TYPE_VALUE.ADD_INCOME).reduce((acc, cur) => acc + (cur.amount || 0), 0);
    const monthIncome = month.filter((item) => item.type === ADD_TYPE_VALUE.ADD_INCOME).reduce((acc, cur) => acc + (cur.amount || 0), 0);
    return [
        {
            type: ADD_TYPE_VALUE.ADD_INCOME,
            title: "今日业绩",
            amount: todayIncome,

        },
        {
            type: ADD_TYPE_VALUE.ADD_INCOME,
            title: "本月总业绩",
            amount: monthIncome,
        },
        {
            type: ADD_TYPE_VALUE.BENEFIT,
            title: "今日提成",
            amount: Number((todayIncome / 2).toFixed(2)),
        },
        {
            type: ADD_TYPE_VALUE.ADD_INCOME,
            title: "本月总提成",
            amount: Number((monthIncome / 2).toFixed(2)),
        },
        {
            type: ADD_TYPE_VALUE.ADD_EXPENSE,
            title: "今日退款",
            amount: today.filter((item) => item.type === ADD_TYPE_VALUE.ADD_EXPENSE).reduce((acc, cur) => acc + (cur.amount || 0), 0),
        },
        {
            type: ADD_TYPE_VALUE.ADD_EXPENSE,
            title: "本月总退款",
            amount: month.filter((item) => item.type === ADD_TYPE_VALUE.ADD_EXPENSE).reduce((acc, cur) => acc + (cur.amount || 0), 0),
        },

    ]
}