---
title: Web 如何排查音视频问题
date: 2023-01-01
categories:
- media
---

## MP4 播放失败

1. 当发现 MP4 在浏览器上播放出错时，先 F12 打开 DevTools 查看 Console（控制台）面板是否出现报错；

2. 其次，可以打开 DevTools 的 Media（媒体）面板，查看对应 `<video>` 播放器的 Message（消息）面板是否有告警/报错；

![](/images/media-msg.png)

3. 如果 Console 无报错，Message 无报错，说明浏览器认为流媒体文件是可以正常解码播放的；
至于播放出来的效果，浏览器并不保证，如可能会出现音画不同步、视频画面闪烁等情况；这大概率是视频本身就有问题。

4. 出现浏览器能正常播放，但播放效果不符合预期的问题时：
  - 使用 VLC、PotPlayer 工具也去播放对比看一下
  - 单独用一个 Tab 打开视频地址 or 把视频下载下来然后拖进浏览器播放；如果这样做还是有问题，那就大概率是视频本身的问题

## FLV 播放失败

1. 参照《MP4 播放失败》收集错误信息
2. [如何分析 flv](https://fredzeng.github.io/2023/09/18/media/flv/3-flv/)


## WebRTC 播放失败

1. 参照《MP4 播放失败》收集错误信息
2. 查看 WebRTC 日志：<chrome://webrtc-internals/>、<chrome://webrtc-logs/>
