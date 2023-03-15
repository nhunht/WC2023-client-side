import API_CONFIG from "./config";

const PlayerApi = {
  gets: async (params) => {
    const response = await fetch(
      `${API_CONFIG.endpoints.players}?` + new URLSearchParams(params),
      {
        method: "GET",
        headers: API_CONFIG.headers,
      }
    );

    return await response.json();
  },

  get: async (id) => {
    const response = await fetch(`${API_CONFIG.endpoints.players}/edit/${id}`, {
      method: "GET",
      headers: API_CONFIG.headers,
    });

    return await response.json();
  },

  put: async (id, body) => {
    const response = await fetch(`${API_CONFIG.endpoints.players}/edit/${id}`, {
      method: "POST",
      headers: API_CONFIG.headers,
      body: JSON.stringify(body),
    });

    return response.status;
  },

  post: async (body) => {
    const response = await fetch(`${API_CONFIG.endpoints.players}`, {
      method: "POST",
      headers: API_CONFIG.headers,
      body: JSON.stringify(body),
    });

    return response.status;
  },

  delete: async (id) => {
    const response = await fetch(`${API_CONFIG.endpoints.players}/delete/${id}`, {
      method: "get",
      headers: API_CONFIG.headers,
    });

    return response.status;
  }
};

export default PlayerApi;
