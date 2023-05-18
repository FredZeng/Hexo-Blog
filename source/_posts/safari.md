---
title: iOS webview 调试
date: 2022-11-28
---

1. 在 iOS 设备上，依次打开 “设置” -> “Safari浏览器” -> “高级” -> 开启 “JavaScript” 和 “网页检查器”

![](/images/iOS1.png)

![](/images/iOS2.png)

![](/images/iOS3.png)

2. 在 Mac 设备上，显示 Safari 浏览器的 “开发” 菜单

![](/images/Safari1.png)

![](/images/Safari2.png)

3. 将 iOS 设备连接到对应的 Mac 设备上，并在 iOS 设备上打开对应的 webview 页面，此时能在 Safari 浏览器的 “开发” 菜单中看到可调试的 webview 页面，选中对应的页面即可

![](/images/Safari3.png)

### 如何调试 WebRTC / 媒体播放？

在 Safari 的网页检查器中，打开 “媒体日志记录”、“MSE日志记录”、“WebRTC日志记录” 设置

![](/images/Safari4.png)
