import useGit from "./useGit";
import useClickNotification from "./useClickNotification";
import { Message } from "element-ui";

/**
 *
 *@param {Array|Object} data - Data to be backed up. If it's an object, it will be converted to an array.
 *@param {string} data.url - The Git repository URL.
 *@param {string} data.branch - The Git branch to clone.
 *@param {boolean} data.disabled - Whether or not the item is disabled.
 *@returns {Promise} - A promise that resolves when the backup is complete, or rejects if there is an error.
 *@throws {string} - Throws an error if there is no data to backup.
 */
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
            useClickNotification(count);
            resolve();
          }

          continue;
        }

        count.success++;
        if (index + 1 === data.length) {
          useClickNotification(count);

          resolve();
        }
      }
    } catch (error) {
      reject(error);
    }
  });
}

export default useBackUp;
