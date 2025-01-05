import axios from "axios";

export const api = axios.create({
  baseURL: "https://tawasol-server-nf3x.onrender.com/api",
});

api.defaults.headers.common["Content-Type"] = "application/json";

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["x-auth-token"] = `${token}`;
    localStorage.setItem("token", token);
  } else {
    delete api.defaults.headers.common["x-auth-token"];
    localStorage.removeItem("token");
  }
};

export const getProfileImage = (user_id) =>
  `https://tawasol-server-nf3x.onrender.com/images/${user_id}`;

export const formatDate = (date) => {
  return new Intl.DateTimeFormat("en", {
    weekday: "long",
    year: "numeric",
    month: "long",
  }).format(new Date(date));
};
