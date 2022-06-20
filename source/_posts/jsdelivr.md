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

给你的 **图片**、**js**、**css** 加上 **https://cdn.jsdelivr.net/gh/user/repo@version/** 前缀。

1. 给 `markdown` 图片加上前缀

如果你使用的是 `hexo-renderer-marked@^4.1.0`，你可以将下述代码片段复制到你的 `scripts` 目录下。
如果没有 `scripts` 目录，那么在你的 hexo 项目根目录下创建一个；hexo 会自动读取并加载 `scripts` 下的 js 文件。
下述的代码片段主要来自 [hexo-renderer-marked#render.js](https://github.com/hexojs/hexo-renderer-marked/blob/master/lib/renderer.js)，主要是覆写了它处理 markdown 中 `image` 的逻辑，以便给图片加上前缀。

```js
// scripts/render.js

const { encodeURL, url_for } = require('hexo-util');

hexo.extend.filter.register('marked:renderer', function (renderer) {
    const { config } = this; // Skip this line if you don't need user config from _config.yml
    renderer.image = function (href, title, text) {
        const { hexo, options } = this;
        const { relative_link } = hexo.config;
        const { lazyload, prependRoot, postPath } = options;
        let { baseUrl = '' } = options;

        if (!/^(#|\/\/|http(s)?:)/.test(href) && !relative_link && prependRoot) {
            if (!href.startsWith('/') && !href.startsWith('\\') && postPath) {
                const PostAsset = hexo.model('PostAsset');
                // findById requires forward slash
                const asset = PostAsset.findById(join(postPath, href.replace(/\\/g, '/')));
                // asset.path is backward slash in Windows
                if (asset) href = asset.path.replace(/\\/g, '/');
            }
            href = url_for.call(hexo, href);
        }

        // 此处是修改的内容：支持配置 baseUrl
        if (!/^(#|\/\/|http(s)?:)/.test(href)) {
            baseUrl = baseUrl.replace(/\\/g, '/');
            if (baseUrl.endsWith('/')) {
                baseUrl = baseUrl.slice(0, baseUrl.length - 1);
            }
            if (!href.startsWith('/')) {
                href = '/' + href;
            }
            href = baseUrl + href;
        }

        let out = `<img src="${encodeURL(href)}"`;
        if (text) out += ` alt="${text}"`;
        if (title) out += ` title="${title}"`;
        if (lazyload) out += ' loading="lazy"';

        out += '>';
        return out;
    }
})
```

你的 markdown 已经支持给本地图片加上前缀的功能了，而后你需要在 `_config.yml` 中配置你的 `baseUrl`。

```yml
marked:
  baseUrl: https://cdn.jsdelivr.net/gh/FredZeng/FredZeng.github.io@master
  lazyload: true
```

2. 给`js`和`css`加上前缀

很遗憾，这并没有什么通用的解决方法。因为，假如你使用了一个主题的话，那么`js`和`css`文件的使用是写死在主题中的，你需要自己定位并修改。

## 更多姿势

可以将仓库作为图床，而后通过 jsDelivr cdn 访问。


## 遇到的一些小问题

- 如何手动刷新 jsdelivr cdn 缓存？

使用 `purge.jsdelivr.net` 替换 `cdn.jsdelivr.net` 来访问 cdn 地址，访问后即可刷新 cdn 资源。

```txt
https://purge.jsdelivr.net/gh/FredZeng/FredZeng.github.io@master/css/style.css?v=
```
