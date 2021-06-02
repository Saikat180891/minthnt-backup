import Cookie from "js-cookie";
import { makeQuery } from "../utils";

const Apis = (() => {
  const baseUrl = process.env.NEXT_PUBLIC_API_DOMAIN;
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
    return data;
  };

  const getLeadsList = async (
    currentPage = 1,
    tabType = "ON_HOLD",
    PAGE_SIZE = 5,
    filters = {}
  ) => {
    let url = `${baseUrl}/api/v1/leads?page=${currentPage}&page_size=${PAGE_SIZE}&status=${tabType}`;

    if (Object.keys(filters).length > 0) {
      url = url + `&${makeQuery(filters)}`;
    }

    const res = await fetch(url, {
      headers: {
        Authorization: `Token ${Cookie.get("token")}`,
      },
    });
    const data = await res.json();
    return data;
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
    console.log(data);
  };

  const rejectLead = async (id, payload) => {
    // status=REJECTED
    const url = `${baseUrl}/api/v1/leads/${id}`;
    const res = await fetch(url, {
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

    return await res.json();
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

  return {
    createLead,
    login,
    getLeadsList,
    logout,
    registerAdmin,
    rejectLead,
    uploadRadioImage,
  };
})();

export default Apis;
