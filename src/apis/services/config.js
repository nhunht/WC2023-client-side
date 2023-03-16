const baseURL = "http://localhost:3000/api";

const API_CONFIG = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },

  endpoints: {
    home: `${baseURL}/home`,
    players: `${baseURL}/players`,
    nations: `${baseURL}/nations`,
    user: `${baseURL}/user`,
  },
};

export default API_CONFIG;
