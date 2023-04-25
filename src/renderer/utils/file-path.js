const { dialog } = require("electron").remote;

/**
 * Returns a Promise that resolves to the path of a selected directory using a dialog box
 * @returns {Promise<string>} - A Promise that resolves to the selected directory path
 */
function filePath() {
  return new Promise((resolve, reject) => {
    // Show a dialog box to select a directory
    dialog.showOpenDialog(
      {
        properties: ["openDirectory"],
      },
      // When a directory is selected, resolve the Promise with the path
      (filePaths) => {
        resolve(filePaths[0].replace(/\\/g, "\\\\")); // Replace backslashes with double backslashes to escape them
      },
    );
  });
}

export default filePath;
