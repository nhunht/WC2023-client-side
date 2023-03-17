const baseURL = "https://wc2023-server.azurewebsites.net/api";
const baseURL2 = "/api";

const API_CONFIG = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },

  endpoints: {
    home: `${baseURL2}/home`,
    players: `${baseURL2}/players`,
    nations: `${baseURL2}/nations`,
    user: `${baseURL2}/user`,
  },
};

export default API_CONFIG;
