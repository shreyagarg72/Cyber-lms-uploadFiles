import axios from "axios";

const domainUrl = `${import.meta.env.VITE_BACKEND_BASEURL}`;

const instance = axios.create({
  baseURL: domainUrl,
});

instance.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
