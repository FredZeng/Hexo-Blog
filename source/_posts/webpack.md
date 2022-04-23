---
title: Webpack 杂记
date: 2022-03-28
categories:
- webpack
---

## Webpack 杂记

1. 关于为什么使用 `await import('@/common/themes/' + window.mode)` 时，会把 `@/common/themes` 目录下的其他文件（如，markdown 文件）也打包进 chunk！

根据 [webpack官方文档](https://webpack.docschina.org/guides/dependency-management/#require-with-expression) 的解释：

当我们在使用 `import()` 或 `require()` 时，若其标识符参数中含有表达式，由于这种引入形式不能在打包编译阶段确定标识符参数的值，导致无法做静态分析、构建依赖图，因此会自动创建一个上下文（context）；

webpack 会解析`require()`调用中的字符串，提取出如下的一些信息，供 context 使用：

```txt
从 '@/common/themes/' + window.mode 中提取出：

Directory：@/common/themes
Regular expression: /^.*/
```

而后，webpack 会将目录（`@/common/themes`）下所有符合正则表达式（`/^.*/`）的模块都打包到一起；因此这种方式，可能会引入一些不必要的模块。

对于`require()`的引入方式，可通过设置`require.context()`解决；对于`import()`方式，可以使用 webpack 的[内联注释](https://webpack.docschina.org/api/module-methods/#magic-comments)解决该问题。

2. less webpack 配置

使用 `less-loader` 预编译 `*.less` 文件，而后使用 `cssnano` postcss 插件压缩 css，使用 `autoprefixer` 插件兼容各浏览器 css prefix。

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: process.env.NODE_ENV === 'production' ? {
                plugins: [
                  require('cssnano')({
                    preset: 'default',
                  }),
                  'autoprefixer'
                ]
              } : undefined,
            }
          },
          { loader: 'less-loader' }
        ]
      }
    ]
  }
};
```
