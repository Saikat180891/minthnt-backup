import Cookie from "js-cookie";
import { makeQuery } from "../utils";
import { toast } from "@/Toast";

export const asyncFetcher = async (
  api,
  options = { showSuccess: false, showError: false }
) => {
  const res = await api;

  if (res?.status >= 400) {
    const data = await res.json();
    if (data?.status === "FAILURE" && options.showError) {
      toast.next({
        title: data?.status,
        description: data?.errors?.[0]?.display_msg,
        status: "error",
      });
    }
    throw new Error(JSON.stringify({ errors: data?.errors }));
  }

  const data = await res.json();
  if (data?.status === "SUCCESS" && options.showSuccess) {
    toast.next({
      title: data?.status,
      description: data?.display_msg,
    });
  }
  return data?.data;
};

const Apis = (() => {
  const baseUrl = process.env.NEXT_PUBLIC_API_DOMAIN;
  const headers = {
    headers: {
      Authorization: `Token ${Cookie.get("token")}`,
      "Content-Type": "application/json",
    },
  };

  const createLead = async (payload) => {
    const url = `${baseUrl}/api/v1/leads`;
    const res = await fetch(url, {
      method: "POST",
      body: payload,
    });

    const data = await res.json();
    console.log(data);
  };

  const login = async (payload) => {
    const url = `${baseUrl}/api/v1/auth/login`;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status >= 400) return null;
    const data = await res.json();
    return data?.data;
  };

  const getLeadsList = async (
    currentPage = 1,
    tabType = "ON_HOLD",
    PAGE_SIZE = 5,
    filters = {},
    sort = ""
  ) => {
    let url = `${baseUrl}/api/v1/leads?page=${currentPage}&page_size=${PAGE_SIZE}&status=${tabType}`;

    if (Object.keys(filters).length > 0) {
      url = url + `&${makeQuery(filters)}`;
    }

    if (sort) {
      url = url + `&ordering=${sort.toLowerCase().replace(" ", "_")}`;
    }

    return await fetch(url, {
      headers: {
        Authorization: `Token ${Cookie.get("token")}`,
      },
    });
    // const data = await res.json();
    // return data;
  };

  const logout = async () => {
    const url = `${baseUrl}/api/v1/auth/logout`;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        Authorization: `Token ${Cookie.get("token")}`,
        "Content-Type": "application/json",
      },
    });
    if (res.status === 204) Cookie.remove("token");
  };

  const registerAdmin = async (payload) => {
    const url = `${baseUrl}/api/v1/auth/admin/register`;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Token ${Cookie.get("token")}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  };

  const rejectLead = async (id, payload) => {
    const url = `${baseUrl}/api/v1/leads/${id}`;
    return await fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        ...payload,
        status: "REJECTED",
      }),
      headers: {
        Authorization: `Token ${Cookie.get("token")}`,
        "Content-Type": "application/json",
      },
    });
  };

  const acceptLead = async (id) => {
    const url = `${baseUrl}/api/v1/leads/${id}/accept_leads`;
    return await fetch(url, {
      ...headers,
    });
  };

  const uploadRadioImage = async (id, payload) => {
    const url = `${baseUrl}/api/v1/leads/${id}`;
    const res = await fetch(url, {
      method: "PUT",
      body: payload,
      headers: {
        Authorization: `Token ${Cookie.get("token")}`,
      },
    });

    return await res.json();
  };

  const appData = async () => {
    const url = `${baseUrl}/api/v1/app_data`;
    return await fetch(url, {
      headers: {
        Authorization: `Token ${Cookie.get("token")}`,
      },
    });
  };

  const waitlistedLead = async (id, payload) => {
    const url = `${baseUrl}/api/v1/leads/${id}`;
    return await fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        ...payload,
        status: "WAITLISTED",
      }),
      headers: {
        Authorization: `Token ${Cookie.get("token")}`,
        "Content-Type": "application/json",
      },
    });
  };

  const moveToOnHold = async (id, payload) => {
    const url = `${baseUrl}/api/v1/leads/${id}`;
    return await fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        ...payload,
        status: "ON_HOLD",
      }),
      headers: {
        Authorization: `Token ${Cookie.get("token")}`,
        "Content-Type": "application/json",
      },
    });
  };

  return {
    createLead,
    login,
    getLeadsList,
    logout,
    registerAdmin,
    rejectLead,
    uploadRadioImage,
    acceptLead,
    appData,
    waitlistedLead,
    moveToOnHold,
  };
})();

export default Apis;
