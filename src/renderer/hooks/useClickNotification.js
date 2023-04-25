// Config
import { backUp } from "@/config/enum";
// Hooks
import useNotification from "./useNotification";

// Utils
import { getCookie } from "@/utils";
import dayjs from "dayjs";
import { shell } from "electron";

/**
 * useClickNotification - displays a notification with backup completion status and opens the backup folder when clicked
 *
 * @param  {Object} count object containing success and fail keys for the number of successful and failed backups
 * @return {void}
 */
function useClickNotification(count) {
  const date = dayjs().format("YYYY_MM_DD");
  const setting = getCookie(backUp);
  const backup = setting.path.replace(/\\\\/g, "/");
  const path = `${backup}/${date}/`;
  useNotification("备份完成", `success ${count.success} , fail ${count.fail}`, () => {
    shell.showItemInFolder(`${path}/${date}/`);
  });
}

export default useClickNotification;
