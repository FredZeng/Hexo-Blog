---
title: 使用 jsDelivr 来加速你的博客
date: 2021-11-24
---

## 使用 jsDelivr 来加速你的博客

[jsDelivr](https://www.jsdelivr.com/?docs=gh) 为开源项目提供了免费的 CDN 服务，我们可以使用 jsDelivr 来给我们的 GitHub Page 静态资源提供 CDN 服务。

- 用法：

针对 GitHub，jsdelivr 提供了以下方式来访问仓库内的文件：

```
// load any GitHub release, commit, or branch

// note: we recommend using npm for projects that support it

https://cdn.jsdelivr.net/gh/user/repo@version/file


// load jQuery v3.2.1

https://cdn.jsdelivr.net/gh/jquery/jquery@3.2.1/dist/jquery.min.js
```

- 如何应用在 hexo 上？

将原本的 GitHub Page url 修改为 jsdelivr 的 cdn 访问地址。

```yml
# url: https://fredzeng.github.io
url: https://cdn.jsdelivr.net/gh/FredZeng/FredZeng.github.io@master
```

## 更多姿势

可以将仓库作为图床，而后通过 jsDelivr cdn 访问。