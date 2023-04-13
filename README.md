### nodejs --version  v14.18.1
### npm --version 6.14.15

### npm install --global windows-build-tools --save

### 打包安装教程 
#### 运行前，.electron-vue/build.js 变量tasks命名重复更改一个，并添加const Multispinner = require("multispinner");，添加yarn add multispinner
#### .electron-vue/dev-client.js 添加 import 'polyfill-object.fromentries'; ，并添加yarn add polyfill-object.fromentries
#### 
#### https://blog.csdn.net/mm_0123456789/article/details/122825576
#### https://blog.csdn.net/y_k_1_2_3_4/article/details/126479427

> An electron-vue project

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[8d4ed60](https://github.com/SimulatedGREG/electron-vue/tree/8d4ed607d65300381a8f47d97923eb07832b1a9a) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
