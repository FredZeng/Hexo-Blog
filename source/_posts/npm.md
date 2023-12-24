---
title: npm 命令速记
date: 2023-02-06
---

- 查看 npm 包所有版本

```bash
npm view <package_name> versions
```

- 在本地打出一个 `.tgz` 包

```bash
npm pack
```

> 加上 `--dry-run` 参数的话，只会列出参与打包的文件，并不会真的生成 `.tgz` 文件
