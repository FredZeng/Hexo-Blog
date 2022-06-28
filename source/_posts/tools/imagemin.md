---
title: node.js 图片压缩
date: 2022-06-27
categories:
- tools
---

## node.js 图片压缩

```bash
npm install -D images imagemin imagemin-jpegtran imagemin-pngquant slash get-all-files
```

```js
import images from 'images';
import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
import fsPromises from 'fs/promises';
import path from 'path';
import convertToUnixPath from 'slash';
import { getAllFiles } from 'get-all-files';

const handleFile = async (sourcePath) => {
  // 如果图片 width > 750，先等比缩小图片宽高
  if (images(sourcePath).width() > 375 * 2) {
    const fileType = path.extname(sourcePath).replace('.', '').toLowerCase();

    const buffer = await imagemin.buffer(
      images(sourcePath)
        .size(375 * 2) // 调整图片的宽高
        .toBuffer(fileType),
      {
        plugins: [
          imageminJpegtran(),
          imageminPngquant({
            quality: [0.6, 0.8],
          }),
        ],
      }
    );

    const destinationPath = path.join('./build', path.basename(sourcePath).toLowerCase());

    await fsPromises.mkdir(path.dirname(destinationPath), { recursive: true });

    await fsPromises.writeFile(destinationPath, buffer);
    return;
  }

  await imagemin([sourcePath], {
    destination: 'build', // 结果输出到 build 目录
    plugins: [
      imageminJpegtran(),
      imageminPngquant({
        quality: [0.6, 0.8],
      }),
    ],
  });
};

// 递归获取 images 目录下所有文件
getAllFiles('./images')
  .toArray()
  .then((paths) => {
    return paths
      .map((it) => convertToUnixPath(it)) // 将 Windows 的 "\\" 路径转为 "/"
      .filter((it) => {
        const ext = path.extname(it).toLowerCase();

        return ['.jpg', '.jpeg', '.png'].includes(ext); // 筛选出 .jpg, .jpeg, .png 后缀的文件
      });
  })
  .then((paths) => {
    return paths.map(async (p) => {
      try {
        return await handleFile(p);
      } catch (err) {
        throw err;
      }
    });
  });
```

