const API_CONFIG = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },

  endpoints: {
    home: "/api/home",
    players: "/api/players",
    nations: "/api/nations",
    user: "/api/user",
  },
};

export default API_CONFIG;
