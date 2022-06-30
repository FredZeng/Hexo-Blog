---
title: node.js 图片压缩
date: 2022-06-27
categories:
- tools
---

## node.js 图片压缩

```bash
npm install -D images imagemin imagemin-mozjpeg imagemin-pngquant slash get-all-files
```

```js
import images from 'images';
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import fsPromises from 'fs/promises';
import path from 'path';
import convertToUnixPath from 'slash';
import { getAllFiles } from 'get-all-files';

const handleFile = async (sourcePath) => {
  // 如果图片 width > 750，等比缩小图片宽高
  if (images(sourcePath).width() > 375 * 2) {
    const fileType = path.extname(sourcePath).replace('.', '').toLowerCase();

    const buffer = await imagemin.buffer(
      images(sourcePath)
        .size(375 * 2) // 调整图片的宽度，高度会等比缩小
        .toBuffer(fileType),
      {
        plugins: [
          imageminMozjpeg({ quality: 70 }),
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

  // --- 纯粹的图片大小压缩 ---
  await imagemin([sourcePath], {
    destination: 'build', // 结果输出到 build 目录
    plugins: [
      imageminMozjpeg({ quality: 70 }), // 压缩 jpg
      imageminPngquant({
        quality: [0.6, 0.8],
      }), // 压缩 png
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

