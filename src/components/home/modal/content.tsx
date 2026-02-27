import React, { RefObject, useEffect } from "react";
import dayjs from "dayjs";
import { Form, Input, Button, DatePicker, TextArea, Radio, Space } from "antd-mobile";
import toast from "react-hot-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ADD_TYPE_VALUE, AddFormValues } from "@/types";
import { AddTypeOptions } from "../const";
import { DatePickerRef } from "antd-mobile/es/components/date-picker";
import { addPost } from "@/service/api";

export const ModalContent = ({
    setShowModal,
    addType,
}: {
    setShowModal: (showModal: boolean) => void;
    addType: ADD_TYPE_VALUE;
}) => {
    const queryClient = useQueryClient();
    const [form] = Form.useForm<AddFormValues>()


    const onSubmit = async () => {
        const values = form.getFieldsValue()
        const res = await addPost(values)
        if (res?.status === 200) {
            setShowModal(false)
            form.resetFields();
            toast.success(res.message)
        } else {
            toast.error(res.message)
        }
    }

    const mutation = useMutation({
        mutationFn: onSubmit,
        onSuccess: () => {
          // 使其失效并重新获取
          queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
        onError: (error) => {
          toast.error(error.message)
          },
      })
    const onClose = () => {
        setShowModal(false)
        form.resetFields();
    }

    useEffect(() => {
        form.setFieldValue('type', addType);
    }, [addType, form]);

    return (
        <div className="p-2 fz-12">
            <Form
                initialValues={{ type: addType }}
                form={form}
                onFinish={mutation.mutate}
                layout="vertical"
                className="space-y-4 text-sm"
                footer={
                    <div className="mt-4 flex gap-4">
                        <Button size="small" block className="rounded-lg bg-gray-200 text-gray-700" onClick={onClose}>
                            取消
                        </Button>
                        <Button size="small" block type="submit" color="primary" className="rounded-lg bg-pink-400 text-white">
                            保存
                        </Button>
                    </div>
                }
            >
                <Form.Item name="type" label={<span className="text-gray-600">类型</span>} required>
                    <Radio.Group>
                        <Space direction='horizontal'>
                            {
                                AddTypeOptions.map(item => (
                                    <Radio key={item.value} disabled={item.value !== addType} value={item.value} style={{
                                        '--icon-size': '18px',
                                        '--font-size': '14px',
                                        '--gap': '6px',
                                    }}>{item.label}</Radio>
                                ))
                            }
                        </Space>
                    </Radio.Group>
                </Form.Item>
                {
                    addType === ADD_TYPE_VALUE.ADD_INSIGHT ?
                        <Form.Item name='content' label={<span className="text-gray-600">美甲小技巧</span>} required>
                            <TextArea
                                placeholder='请输入心得小技巧'
                                maxLength={100}
                                rows={2}
                                showCount
                            />
                        </Form.Item>
                        :
                        <>
                            <Form.Item name="date" label={<span className="text-gray-600">日期</span>} trigger='onConfirm'
                                getValueProps={value => ({ value: value ? new Date(value) : value })}
                                normalize={value => (value ? dayjs(value).format('YYYY-MM-DD') : value)}
                                onClick={(_, ref: RefObject<DatePickerRef>) => ref.current?.open()} rules={[{ required: true, message: '请选择日期' }]}>
                                <DatePicker>
                                    {value => (value ? dayjs(value).format('YYYY-MM-DD') : '请选择日期')}
                                </DatePicker>
                            </Form.Item>
                            <Form.Item name="amount" label={<span className="text-gray-600">金额</span>}
                                rules={[{ required: true, message: '请输入金额' }]}
                                normalize={(value) => {
                                    const regex = /^\d*\.?\d{0,2}$/;
                                    if (!regex.test(value)) {
                                        return value ? value.slice(0, -1) : value;
                                    }
                                    return value ? Number(value) : value;
                                }}
                                required
                            >
                                <Input placeholder="请输入金额" type="number" className="rounded-lg bg-gray-50 p-3" pattern="^\d+(\.\d{1,2})?$" />
                            </Form.Item>
                            <Form.Item name='content' label={<span className="text-gray-600">备注</span>}>
                                <TextArea
                                    placeholder='备注'
                                    maxLength={100}
                                    rows={2}
                                    showCount
                                />
                            </Form.Item>
                        </>
                }

            </Form>
        </div>
    )
}
