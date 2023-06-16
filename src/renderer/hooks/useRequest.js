// Components
import axios from "axios";
import { Message } from "element-ui";
// Config
import { baseUrl } from "@/config/environment";
import { token } from "@/config/enum";

// Utils
import { getCookie } from "@/utils";
import nprogress from "nprogress";

axios.defaults.timeout = 60000;
axios.defaults.baseURL = baseUrl;
axios.defaults.method = "post";

// request interceptor
axios.interceptors.request.use(
  (config) => {
    if (!config.data) {
      config.data = "{}";
    }
    nprogress.start();
    config.headers["authorization"] = getCookie(token) || "";

    return config;
  },
  (error) => {
    Message.error(error.message);
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (res) => {
    const status = res.data.code || res.status;
    const message = res.data.msg || res.data.error_description || "未知错误";
    nprogress.done();
    switch (status) {
      case 200:
        return res.data;

      default:
        Message.error(message);
        return Promise.reject(res);
    }
  },
  (error) => {
    nprogress.done();
    Message.error(error.message);
    return Promise.reject(error);
  },
);

export default axios;
