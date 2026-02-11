"use client";
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { ADD_TYPE_VALUE, AddFormValues } from "@/types";
import { getPosts, deletePost } from "@/service/api";

import { List, Space, Button, Toast } from 'antd-mobile';
import { BillOutline, UserOutline } from 'antd-mobile-icons';

export const Reports = () => {
  const [type, setType] = useState<ADD_TYPE_VALUE>(ADD_TYPE_VALUE.ADD_INCOME);
  const [data, setData] = useState<AddFormValues[]>([]);

  const handleSolve = async (type: ADD_TYPE_VALUE) => {
    setType(type);
    const res = await getPosts(type);
    if (res?.status === 200) {
      setData(res?.data?.data || []);
    }
  }

  const handleDelete = async (id?: number) => {
    if (!id) return;
    const res = await deletePost(id);
    if (res?.status === 200) {
      handleSolve(type);
      toast.success(res.message);
    }
  };

  const handleEdit = (id?: number) => {
    if (!id) return;
    // window.location.href = `/reports/edit?id=${id}`;
  }

  useEffect(() => {
    handleSolve(type);
  }, [])

  return <>
    <Space wrap className="p-4 bg-pink-100 rounded-2xl shadow-inner-soft flex justify-around items-center w-full mb-4">
      <Button block shape='rounded' size='middle'
        className={type === ADD_TYPE_VALUE.ADD_INCOME ? "text-pink-500 ring-2 ring-pink-400" : ""} onClick={() => handleSolve(ADD_TYPE_VALUE.ADD_INCOME)}>业绩
      </Button>
      <Button block shape='rounded' size='middle'
        className={type === ADD_TYPE_VALUE.ADD_EXPENSE ? "text-pink-500 ring-2 ring-pink-400" : ""}
        onClick={() => handleSolve(ADD_TYPE_VALUE.ADD_EXPENSE)}>
        支出
      </Button>
      <Button block shape='rounded' size='middle'
        className={type === ADD_TYPE_VALUE.ADD_INSIGHT ? "text-pink-500 ring-2 ring-pink-400" : ""}
        onClick={() => handleSolve(ADD_TYPE_VALUE.ADD_INSIGHT)}>
        心得
      </Button>
    </Space>
    <div className="p-4 bg-gray-100 min-h-screen">
      <List className="bg-pink-100 rounded-2xl shadow-inner-soft">
        {
          data?.length ? data.map(item => (
            <List.Item key={item.id}
              prefix={
                item.type !== ADD_TYPE_VALUE.ADD_INSIGHT ?
                  <BillOutline /> : <UserOutline />
              }
              extra={
                <Space align="center" direction='vertical' className='py-2'>
                  <Button
                    size="small"
                    onClick={() => handleEdit(item.id)}
                    color="primary"
                    disabled
                  >
                    编辑
                  </Button>
                  <Button
                    size="small"
                    onClick={() => handleDelete(item.id)}
                    color="danger"
                  >
                    删除
                  </Button>
                </Space>
              }
            >
              <Space direction='vertical'>
                { type !== ADD_TYPE_VALUE.ADD_INSIGHT ?
                  <>
                    <div>日期：{item.date}</div>
                    <div>金额：{item.amount}</div>
                    <span>备注：{item.content ?? '无'}</span>
                  </> : 
                  <span>心得：{item.content ?? '无'}</span>
                }
              </Space>
            </List.Item>
          )) : <List.Item key="no-data">暂无数据</List.Item>
        }
      </List>
    </div>
  </>;
}