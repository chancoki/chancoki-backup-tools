// contextMenu.js
import { remote, clipboard } from "electron";
const { Menu, MenuItem } = remote;

function useContextMenu() {
  //new一个菜单
  // 监听contextmenu，实现自定义右键菜单
  window.addEventListener(
    "contextmenu",
    function (e) {
      e.preventDefault();
      let menu = new Menu();
      //添加菜单功能, label: 菜单名称， accelerator：快捷键，click：点击方法
      menu.append(new MenuItem({ label: "拷贝", accelerator: "CommandOrControl+C", click: copyText }));
      //添加菜单分割线
      menu.append(new MenuItem({ type: "separator" }));
      //添加菜单功能
      menu.append(new MenuItem({ label: "粘贴", accelerator: "CommandOrControl+V", click: printText }));
      menu.append(new MenuItem({ type: "separator" }));

      menu.append(new MenuItem({ label: "搜索", click: openDefaultBrowser }));

      menu.popup(remote.getCurrentWindow());
    },
    false,
  );
  // 写入剪贴板方法
  function copyText() {
    const str = getSelection(); // 获取选中内容
    clipboard.writeText(str); // 写入剪贴板
  }

  // 获取剪贴版内容写入当前焦点元素中
  function printText() {
    if (document.activeElement) {
      const str = clipboard.readText(); // 获取剪贴板内容
      var ev = new Event("input", { bubbles: true });
      ev.simulated = true;
      document.activeElement.value = str; // 写入焦点元素
      document.activeElement.dispatchEvent(ev);
      // clipboard.clear() // 清空剪贴板，一般都不做清空，爱粘贴就粘贴，干嘛要粘贴完就清空呢
    }
  }
}

const openDefaultBrowser = function () {
  var exec = require("child_process").exec;
  const str = getSelection(); // 获取选中内容
  const url = `https://www.baidu.com/s?wd=${str}`;

  switch (process.platform) {
    case "darwin":
      exec("open " + url);
      break;
    case "win32":
      exec("start " + url);
      break;
    default:
      exec("xdg-open", [url]);
  }
};

// 获取选中内容
function getSelection() {
  var text = "";
  if (window.getSelection) {
    // 除IE9以下 之外的浏览器
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type !== "Control") {
    //IE9以下，可不考虑
    text = document.selection.createRange().text;
  }

  if (text) {
    return text;
  }
}

export default useContextMenu;
