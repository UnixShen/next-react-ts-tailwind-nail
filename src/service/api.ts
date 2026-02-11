import { AddFormValues, ADD_TYPE_VALUE } from "@/types";

export const addPost = async (data: AddFormValues) => {
  const response = await fetch("/api/add", {
    method: "POST",
    body: JSON.stringify(data),
  });
  const resData = await response?.json();
  return resData;
};

export const getPosts = async (type?: ADD_TYPE_VALUE) => {
  const url = type ? `/api/detail?type=${type}` : '/api/detail'
  const response = await fetch(url);
  const resData = await response?.json();
  return resData;
};

export const deletePost = async (id: number) => {
  const response = await fetch(`/api/delete?id=${id}`, {
    method: "DELETE",
  });
  const resData = await response?.json();
  return resData;
}

export const queryHomeList = async () => {
  const response = await fetch("/api/home");
  const resData = await response?.json();
  return resData;
}