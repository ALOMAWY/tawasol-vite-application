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

export const getProfileImage = (user) =>
  `https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/uploads/${user._id}-${user.Date}.png`;

export const formatDate = (date) => {
  return new Intl.DateTimeFormat("en", {
    weekday: "long",
    year: "numeric",
    month: "long",
  }).format(new Date(date));
};
