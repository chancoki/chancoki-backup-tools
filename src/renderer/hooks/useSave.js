// Config
import { dataKey } from "@/config/enum";

// Utils
import { getCookie, setCookie } from "@/utils";

export function saveData(data) {
  return setCookie(dataKey, data);
}

export function getData() {
  return getCookie(dataKey) || [];
}
