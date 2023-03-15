import API_CONFIG from "./config";

const UserApi = {
  gets: async (body) => {
    const response = await fetch(`${API_CONFIG.endpoints.user}?`, {
      method: "POST",
      headers: API_CONFIG.headers,
      body: JSON.stringify(body),
    });

    return await response.json();
  },

  get: async (id) => {
    const response = await fetch(`${API_CONFIG.endpoints.user}/edit/${id}`, {
      method: "GET",
      headers: API_CONFIG.headers,
    });

    return await response.json();
  },

  put: async (id, body) => {
    const response = await fetch(`${API_CONFIG.endpoints.user}/edit/${id}`, {
      method: "POST",
      headers: API_CONFIG.headers,
      body: JSON.stringify(body),
    });

    return response.status;
  },

  post: async (body) => {
    const response = await fetch(`${API_CONFIG.endpoints.user}/register`, {
      method: "POST",
      headers: API_CONFIG.headers,
      body: JSON.stringify(body),
    });

    return response.status;
  },
};

export default UserApi;
