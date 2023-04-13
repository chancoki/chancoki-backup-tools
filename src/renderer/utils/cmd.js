const exec = require("child_process").exec;
let message = "";

function cmd(cmdStr, cmdPath) {
  return new Promise((resolve, reject) => {
    // 子进程名称
    let workerProcess;

    // 执行命令行，如果命令不需要路径，或就是项目根目录，则不需要cwd参数：
    workerProcess = exec(cmdStr, { cwd: cmdPath });
    // 不受child_process默认的缓冲区大小的使用方法，没参数也要写上{}：workerProcess = exec(cmdStr, {})

    // 打印正常的后台可执行程序输出
    workerProcess.stdout.on("data", function (data) {
      message = data;
    });

    // 打印错误的后台可执行程序输出
    workerProcess.stderr.on("data", function (data) {
      message = data;
    });

    // 退出之后的输出
    workerProcess.on("close", function (code) {
      if (code !== 0) {
        reject(message);
      }
      
      resolve(message);

      console.log("out code：" + code);
    });
  });
}

export default cmd;
