import dataProviderSimpleRest from "@refinedev/simple-rest";
import axios, { AxiosInstance } from "axios";
import { DataProvider } from "@refinedev/core";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ""; 

const axiosInstance: AxiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("authToken");

        if (token && config?.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

const baseDataProvider = dataProviderSimpleRest(API_URL, axiosInstance);

export const dataProvider: DataProvider = {
    ...baseDataProvider,
};
