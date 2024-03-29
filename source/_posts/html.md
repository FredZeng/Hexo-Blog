---
title: Html 速记
date: 2021-11-22
---

1. `<img loading="lazy">` 由浏览器实现图片懒加载

![Can I Use lazy loading](/images/lazy-loading.png)

2. 动态添加 `script` 到页面

```js
let script = document.createElement('script');
script.src = '/xxx.js';
document.body.appendChild(script);
```

脚本在附加到文档后立即开始加载；默认情况下，**动态脚本以 `async=true` 的方式表现**。

3. 关于 `history.length`

`history.length` 表示会话历史记录中的元素数量，即当前窗口访问过多少个不同的 URI。
`history.go()`、`history.pushState()`、`history.replaceState()` 操作都会使得 `history.length` + 1；
`history.go(-1)` 会返回到上一个页面，但是 `history.length` 不会减一。
