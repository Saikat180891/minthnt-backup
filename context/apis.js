import Cookie from "js-cookie";

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
    const data = await res.json();
    return data;
  };

  const getLeadsList = async (currentPage = 1, PAGE_SIZE = 5) => {
    const url = `${baseUrl}/api/v1/leads?page=${currentPage}&page_size=${PAGE_SIZE}&status=ON_HOLD`;
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
      headers: {
        Authorization: `Token ${Cookie.get("token")}`,
      },
    });
    const data = await res.json();
    Cookie.remove("token");
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

  return {
    createLead,
    login,
    getLeadsList,
    logout,
    registerAdmin,
  };
})();

export default Apis;
