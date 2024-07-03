import axios from "axios";

const domainUrl = `${import.meta.env.VITE_BACKEND_BASEURL}`;

const instance = axios.create({
  baseURL: domainUrl,
});



export default instance;
