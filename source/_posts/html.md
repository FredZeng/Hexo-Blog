---
title: Html 速记
date: 2021-11-22
---

## Html 速记

1. `<img loading="lazy">` 由浏览器实现图片懒加载

![Can I Use lazy loading](/images/lazy-loading.png)

2. 动态添加 `script` 到页面

```js
let script = document.createElement('script');
script.src = '/xxx.js';
document.body.appendChild(script);
```

脚本在附加到文档后立即开始加载；默认情况下，**动态脚本以 `async=true` 的方式表现**。

