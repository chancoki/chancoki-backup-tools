// Config
import { baseUrl } from "@/config/environment";

// Hook
import useRequest from "../hooks/useRequest";

/**
 * 新增仓库
 */
export function addStore(data) {
  return useRequest({ baseUrl, url: "/store/addStore", method: "POST", data });
}

/**
 * 更新仓库
 */
export function updateStore(data) {
  return useRequest({ baseUrl, url: "/store/updateStore", method: "POST", data });
}

/**
 * 获取仓库
 */
export function getStore(data) {
  return useRequest({ baseUrl, url: "/store/getStore", method: "POST", data });
}

/**
 * 删除仓库
 */
export function deleteStore(data) {
  return useRequest({ baseUrl, url: "/store/deleteStore", method: "POST", data });
}
