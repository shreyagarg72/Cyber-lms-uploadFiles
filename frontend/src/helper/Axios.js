import axios from "axios";

const domainUrl = "http://localhost:4000";

const instance = axios.create({
  baseURL: domainUrl,
});

export default instance;
