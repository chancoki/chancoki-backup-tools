/**
 * 是否为空
 * @description 判断是否是null,对象是否为空，数组是否为空。是否为 undefaind，是否为 “”空字符串。
 * @param value 任意
 */
export function isEmpty(value) {
  if (typeof value === "string") {
    value = value.trim();
  }

  if (value == "") {
    return true;
  }

  if (value == null) {
    return true;
  }

  if (typeof value === "undefined") {
    return true;
  }

  if (Array.isArray(value)) {
    if (value.length == 0) {
      return true;
    }
  }

  if (typeof value === "object") {
    if (Object.keys(value).length == 0) {
      return true;
    }
  }

  return false;
}

const Store = require("electron-store");

const store = new Store();

/**
 * 设置cookie数据
 * @param {String} key 键值
 * @param {String} data 值
 * @returns Boolean
 */
export function setCookie(key, data) {
  try {
    store.set(key, data);
    return true;
  } catch (error) {
    return false;
  }
}
/**
 * 删除一个本地cookie
 * @param {String} key 键值
 * @returns Boolean
 */
export function delCookie(key) {
  try {
    store.delete(key);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * 获取一个cookie数据
 * 如果存入的是对象，返回的也是对象。如果是string返回的也是字符串。
 * @param {String} key 键
 * @returns json/string
 */
export function getCookie(key) {
  try {
    const value = store.get(key);

    try {
      let val = JSON.parse(value);
      return val;
    } catch (error) {
      return value;
    }
  } catch (error) {
    return undefined;
  }
}
