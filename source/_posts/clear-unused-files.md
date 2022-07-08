---
title: 清理前端项目中未被使用到的文件
date: 2022-07-08
categories:
- webpack
- frontend
---

一个项目经过多次迭代后，不可避免的会残留一些未被使用到/多余的文件，人为的去分析文件的引用情况是一种费时、费力的行为；
使用 [unused-files-webpack-plugin](https://www.npmjs.com/package/unused-files-webpack-plugin) webpack 插件可以快速的找出哪些文件未被使用到。

安装：

```bash
npm i --save-dev unused-files-webpack-plugin
```

or 

```bash
yarn add --dev unused-files-webpack-plugin
```

配置：

```js
const { UnusedFilesWebpackPlugin } = require("unused-files-webpack-plugin");
 
module.exports = {
  plugins: [
    new UnusedFilesWebpackPlugin({
      patterns: ['src/**/*.*']
    }),
  ],
};
```
