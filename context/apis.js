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

  return {
    createLead,
  };
})();

export default Apis;
