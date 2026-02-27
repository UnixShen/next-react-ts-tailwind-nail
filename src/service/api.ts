import { AddFormValues, ADD_TYPE_VALUE, HomeDataItem } from "@/types";

const isApiPath = (p: string) => p.startsWith('/api');

export function buildUrl(base?: string, path?: string): string {
  const safeBase = base || '';
  const safePath = path || '';

  if (typeof safePath !== 'string') {
    console.error("safePath is not a string:", safePath);
    throw new Error("safePath is not a string");
  }

  if (isApiPath(safePath)) {
    return `${safeBase}${safePath}`;
  }

  return `${safeBase}/${safePath}`.replace(/\/+/g, '/');
}

export const addPost = async (data: AddFormValues): Promise<unknown> => {
  try {
    const url = buildUrl(undefined, "/api/add");
    console.log("addPost URL:", url); // 添加日志以调试 URL
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("addPost response not ok:", response.status, response.statusText); // 添加日志以调试响应
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("addPost error:", error);
    return {
      status: 500,
      message: "Server Error"
    };
  }
};

export const getPosts = async (type?: ADD_TYPE_VALUE): Promise<{
  status: number;
  data: HomeDataItem[];
  message?: string;
}> => {
  try {
    const url = type ? buildUrl(undefined, `/api/detail?type=${type}`) : buildUrl(undefined, '/api/detail');
    console.log("getPosts URL:", url); // 添加日志以调试 URL
    const response = await fetch(url);

    if (!response.ok) {
      console.error("getPosts response not ok:", response.status, response.statusText); // 添加日志以调试响应
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("getPosts error:", error);
    return {
      status: 500,
      message: "Server Error",
      data: [],
    };
  }
};

export const deletePost = async (id: number): Promise<{
  status: number;
  message?: string;
}> => {
  try {
    const url = buildUrl(undefined, `/api/delete?id=${id}`);
    console.log("deletePost URL:", url); // 添加日志以调试 URL
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.error("deletePost response not ok:", response.status, response.statusText); // 添加日志以调试响应
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("deletePost error:", error);
    return {
      status: 500,
      message: "Server Error",
    };
  }
};

export const queryHomeList = async (): Promise<{
  status: number;
  data: HomeDataItem[];
  message?: string;
}> => {
  try {
    const url = buildUrl(undefined, "/api/home");
    console.log("queryHomeList URL:", url); // 添加日志以调试 URL
    const response = await fetch(url);

    if (!response.ok) {
      console.error("queryHomeList response not ok:", response.status, response.statusText); // 添加日志以调试响应
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("queryHomeList error:", error);
    return {
      status: 500,
      message: "Server Error",
      data: [],
    };
  }
};
