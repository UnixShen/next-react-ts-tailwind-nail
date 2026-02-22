import { AddFormValues, ADD_TYPE_VALUE, HomeDataItem } from "@/types";

const isApiPath = (p?: string) => typeof p === 'string' && p.startsWith('/api');

export function buildUrl(base?: string, path?: string): string {
  const safeBase = base || '';
  const safePath = path || '';

  if (typeof safePath !== 'string') {
    console.error("safePath is not a string:", safePath);
  }

  if (isApiPath(safePath)) {
    return `${safeBase}${safePath}`;
  }

  return `${safeBase}/${safePath}`.replace(/\/+/g, '/');
}

export const addPost = async (data: AddFormValues): Promise<any> => {
  try {
    const response = await fetch(buildUrl(undefined, "/api/add"), {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
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
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
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
    const response = await fetch(buildUrl(undefined, `/api/delete?id=${id}`), {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
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
    const response = await fetch(buildUrl(undefined, "/api/home"));

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Server Error",
      data: [],
    };
  }
};
