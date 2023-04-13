import cmd from "@/utils/cmd";
import { getCookie } from "@/utils";
import fs from "fs";
import dayjs from "dayjs";

import { backUp } from "@/config/enum";
const date = dayjs().format("YYYY_MM_DD");

class useGit {
  constructor(url) {
    const setting = getCookie(backUp);
    fs.mkdir(`${setting.path}/${date}`, () => {});
    this.path = `${setting.path}/${date}/`;
    this.url = url;
  }

  clone(branch) {
    return new Promise((resolve, reject) => {
      cmd(`git clone -b ${branch} ${this.url}`, this.path)
        .then((res) => {
          console.log(res);
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  pull() {
    return new Promise((resolve, reject) => {
      cmd(`git pull`, this.path)
        .then((res) => {
          resolve(res);
        })
        .catch(() => {
          reject("pull failed");
        });
    });
  }
}

export default useGit;
