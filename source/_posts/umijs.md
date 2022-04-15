---
title: UmiJS
date: 2022-04-15
---

## UmiJS

### 图片压缩

打包时使用 `image-webpack-loader` 压缩图片

```ts
import { defineConfig } from 'umi';

export default defineConfig({
  chainWebpack(memo, { env, webpack, createCSSRule }) {
    // 在默认的 images 规则上，添加 image-webpack-loader 来压缩图片
    memo.module
      .rule('images')
      .use('image-webpack-loader')
      .loader(require.resolve('image-webpack-loader'))
      .options({
        options: {
          bypassOnDebug: true, // webpack@1.x
          disable: true, // webpack@2.x and newer
        },
      });
  },
});
```
