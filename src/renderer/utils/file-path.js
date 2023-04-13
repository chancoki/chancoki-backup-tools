const { dialog } = require("electron").remote;

function filePath() {
  return new Promise((resolve, reject) => {
    dialog.showOpenDialog(
      {
        properties: ["openDirectory"],
      },
      (filePaths) => {
        resolve(filePaths[0].replace(/\\/g, "\\\\"));
      },
    );
  });
}

export default filePath;
