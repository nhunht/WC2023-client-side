import API_CONFIG from "./config";

const NationApi = {
  gets: async (params) => {
    const response = await fetch(
      `${API_CONFIG.endpoints.nations}?` + new URLSearchParams(params),
      {
        method: "GET",
        headers: API_CONFIG.headers,
      }
    );

    return await response.json();
  },

  get: async (id) => {
    const response = await fetch(`${API_CONFIG.endpoints.nations}/edit/${id}`, {
      method: "GET",
      headers: API_CONFIG.headers,
    });

    return await response.json();
  },

  put: async (id, body) => {
    const response = await fetch(`${API_CONFIG.endpoints.nations}/edit/${id}`, {
      method: "POST",
      headers: API_CONFIG.headers,
      body: JSON.stringify(body),
    });

    return response.status;
  },

  post: async (body) => {
    const response = await fetch(`${API_CONFIG.endpoints.nations}`, {
      method: "POST",
      headers: API_CONFIG.headers,
      body: JSON.stringify(body),
    });

    return response.status;
  },

  delete: async (id) => {
    const response = await fetch(`${API_CONFIG.endpoints.nations}/delete/${id}`, {
      method: "get",
      headers: API_CONFIG.headers,
    });

    return response.status;
  }
};

export default NationApi;
