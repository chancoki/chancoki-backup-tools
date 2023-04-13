/**
 * 弹窗
 * @param {*} message 信息
 * @returns
 */
function useDialog(message) {
  return new Promise((resolve, reject) => {
    if (confirm(message)) {
      resolve();
      return;
    }

    reject();
  });
}

export default useDialog;
