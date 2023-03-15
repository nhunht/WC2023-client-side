import API_CONFIG from "./config";

const HomeApi = {
  gets: async (params) => {
    const response = await fetch(
      `${API_CONFIG.endpoints.home}?` + new URLSearchParams(params),
      {
        method: "GET",
        headers: API_CONFIG.headers,
      }
    );

    return await response.json();
  },
};

export default HomeApi;
