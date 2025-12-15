import dataProviderSimpleRest from "@refinedev/simple-rest";
import axios, { AxiosInstance } from "axios";
import { DataProvider } from "@refinedev/core";
import { getSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://booking-crm.onrender.com/api/v1';

const axiosInstance: AxiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.accessToken) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

const baseDataProvider = dataProviderSimpleRest(API_URL, axiosInstance);

export const dataProvider: DataProvider = {
  ...baseDataProvider,
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const params = new URLSearchParams();
    if (pagination) {
      const currentPage = pagination.currentPage || 1;
      const pageSize = pagination.pageSize || 8;

      params.set("limit", pageSize.toString());
      params.set("offset", ((currentPage - 1) * pageSize).toString());
    }

    if (filters && filters.length > 0) {
      filters.forEach((filter) => {
        if ("field" in filter && filter.operator === "eq") {
          params.append(filter.field, String(filter.value));
        }
      });
    }
    if (sorters && sorters.length > 0) {
      params.append("sortBy", sorters.map((sorter) => sorter.field).join(","));
      params.append(
        "sortOrder",
        sorters.map((sorter) => sorter.order).join(","),
      );
    }
    const response = await axiosInstance.get(
      `${API_URL}/${meta?.resourceName || resource}`,
      {
        params,
      },
    );
    if (response.status < 200 || response.status > 299) throw response;
    const data =
      meta?.resourceName === "admin/operators"
        ? response.data.items
        : response.data.data;

    return {
      data,
      total: response.data.meta.total,
    };
  },
  getOne: async ({ resource, id, meta }) => {
    const response = await axiosInstance.get(
      `${API_URL}/${meta?.resourceName || resource}/${id}`,
    );
    if (response.status < 200 || response.status > 299) throw response;
    const record =
      meta?.resourceName === "admin/operators"
        ? response.data
        : (response.data.data ?? response.data);

    return { data: record };
  },
  update: async ({ resource, variables }) => {
    const response = await axiosInstance.patch(
      `${API_URL}/${resource}`,
      variables,
    );

    if (response.status < 200 || response.status > 299) throw response;
    return { data: response.data };
  },
};
