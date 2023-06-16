// Config
import { baseUrl } from "@/config/environment";

// Hook
import useRequest from "../hooks/useRequest";

/**
 * 登录
 */
export function login(data) {
  return useRequest({ baseUrl, url: "/user/login", method: "POST", data });
}

/**
 * 注册
 */
export function signup(data) {
  return useRequest({ baseUrl, url: "/user/signup", method: "POST", data });
}
