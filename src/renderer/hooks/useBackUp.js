import useGit from "./useGit";
import useNotification from "./useNotification";

import { Message } from "element-ui";

function useBackUp(data) {
  if (!(data instanceof Array)) {
    data = [data];
  }

  data = data.filter((item) => !item.disabled);

  const count = { success: 0, fail: 0 };

  return new Promise(async (resolve, reject) => {
    if (!data.length) {
      reject("没有需要备份的项目");
    }

    try {
      for (let [index, item] of data.entries()) {
        const git = new useGit(item.url);

        try {
          await git.clone(item.branch);
        } catch (error) {
          count.fail++;
          Message.error(error);
          if (index + 1 === data.length) {
            useNotification("备份完成", `success ${count.success} , fail ${count.fail}`);
            resolve();
          }

          continue;
        }

        count.success++;
        if (index + 1 === data.length) {
          useNotification("备份完成", `success ${count.success} , fail ${count.fail}`);
          resolve();
        }
      }
    } catch (error) {
      reject(error);
    }
  });
}

export default useBackUp;
