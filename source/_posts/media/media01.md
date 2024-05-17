---
title: 前端音视频经验之谈（一）
date: 2023-05-15
categories:
- media
---

## 前端音视频经验之谈（一）

### 前言

本文以 FLV 为切入点，分享笔者在前端实时音视频方面遇到并解决过的一些问题；

笔者负责过的一些业务场景：

1. 常见直播业务
推流端使用 RTMP 协议推流 -> （云端）流媒体服务器 -> CDN 分发 -> 播放端拉 http-flv, hls, webrtc

2. Web 预览相机 RTSP 流
相机 RTSP -> 流媒体（格式）转换服务（将 RTSP 转为 http-flv） -> 播放端拉 http-flv

Web 前端在上述的场景中，主要是负责播放不同协议的流媒体资源；

### 如何尽可能稳定播放？

当我们在 Web 上播放一个 MP4 视频时，我们一般是直接依赖 Html5 提供的能力，在整个播放过程中，浏览器本身会去请求数据，然后解码、渲染、播放，基本不需要开发者介入：

```html
<video src="https://demo.com/test.mp4" controls autoplay muted></video>
```

而在播放实时流（如 http-flv）时，前端就需要使用专门的播放器（如 `flv.js`, `mpegts.js`）：

```html
<script src="https://pro-cos-public.seewo.com/seewo-resources/statics/js/flvjs/1.7.12-rc.2/flv.min.js"></script>
<video id="videoEl"></video>

<script>
  if (flvjs.isSupported()) {
      const player = flvjs.createPlayer({
          isLive: true, // 直播
          type: 'flv',
          url: 'https://xxx.flv'
      });

      player.attachMediaElement(document.getElementById('videoEl'));
      player.load();
      player.play();
  }
</script>
```

在 `flv.js`, `mpegts.js` 这些库的实现中：

- flv 流的加载可以基于 [Fetch API](https://developer.mozilla.org/zh-CN/docs/Web/API/fetch) 实现
- 为了能让浏览器播放 flv 流，开发者还需要将 flv 流 解封装 -> 转封装为 fMP4（只改变了流媒体资源的封装格式）
- 转封装后的 fMP4 流媒体数据，需要利用 [MSE API](https://developer.mozilla.org/zh-CN/docs/Web/API/Media_Source_Extensions_API) 塞进原生 `<video>`
- 最终由浏览器完成对 fMP4 的解码、渲染、播放

在大多数时候，我们都是作为 `flv.js`, `mpegts.js` 这些库的使用方；



---

下面更多会介绍一些非网络因素引起的问题：

### 卡顿的可能原因？

卡顿的现象：

1、画面在 loading

2、帧率不够，出现跳帧

// TODO: 时间戳不稳定导致的卡顿

### 花屏的可能原因？

// TODO: SPS 错误导致的花屏

### 如何正确使用 flv.js 实现低延迟？
