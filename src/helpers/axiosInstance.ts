import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    return { data: { ...err?.response?.data }, ststus: err?.response?.staus };
  }
);

export const GET = async (url: string, config = {}) => {
  return await axiosInstance
    .get(url, { ...config })
    .then((res) => res?.data)
    .catch((err) => err);
};

export const POST = async (url: string, data: any, config = {}) => {
  return await axiosInstance
    .post(url, data, { ...config })
    .then((res) => res?.data)
    .catch((err) => err);
};
