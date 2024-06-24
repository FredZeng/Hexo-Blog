---
title: 移动端音视频开发踩过的坑
---

## 移动端音视频开发踩过的坑

### 1、DOM 同时监听 `touchend` 和 `mousedown` 会依次触发 `touchend -> mousedown`

最小复现 Demo:

```html
<!DOCTYPE html>
<html>
  <body>
    <div style="width: 100px; height: 100px; background-color: red;"></div>
    <script>
      var div = document.querySelector('div');

      function onClick(evt) {
        console.log(evt.type);
      }

      div.addEventListener('mousedown', onClick);
      div.addEventListener('touchend', onClick);
    </script>
  </body>
</html>
```

在最开始的设想中，是希望 `<div>` 在 PC 端点击时，仅触发 `mousedown` 的回调；在移动端点击时，仅触发 `touchend` 的回调；

但实际上，在移动端，如果 `<div>` 同时监听了 `touchend` 和 `mousedown` 事件，点击时会依次执行 `touchend` 和 `mousedown` 的回调函数；

想要在移动端点击时**仅**触发 `touchend`，我们需要在 `touchend` 的回调中调用 `e.preventDefault()`，来阻止浏览器的默认行为:

```js
function onClick(evt) {
  evt.preventDefault();
  console.log(evt.type);
}

div.addEventListener('touchend', onClick);
```


### 2、`HTMLMediaElement.fastSeek()` 和 `HTMLMediaElement.currentTime` 精度不一致

在使用 `<video>` 播放点播视频时，我们可以通过 `HTMLMediaElement.currentTime` 来改变播放进度，其使用方式一般为：`video.currentTime = 10.5`；

除此之外，Safari 和 Firefox 还提供了 [HTMLMediaElement.fastSeek()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/fastSeek) 方式来快速跳转进度，其使用方式为：`video.fastSeek(10.5)`；

`HTMLMediaElement.fastSeek()` 和 `HTMLMediaElement.currentTime` 两者的区别在于：`HTMLMediaElement.fastSeek()` 在跳转进度时并不是严格跳转到所设置的时间点（该 API 为了能快速改变播放进度，跳转的时候可能会丢失一些精度），如：

```js
video.addEventListener('seeked', () => {
  console.log(video.currentTime) // 跳转后的 currentTime 可能是 10.000
});

video.fastSeek(10.320); // 期望跳到 10.320
```

关于 `HTMLMediaElement.fastSeek()` 的跳转精度问题，MDN 文档中是这样描述的：

> The `HTMLMediaElement.fastSeek()` method quickly seeks the media to the new time with **precision tradeoff**.

`HTMLMediaElement.fastSeek()` 并不是我们常用的改变播放进度的方式，之所以提到它，是因为在 video.js 的实现中，如果是在 Safari 下拖动播放器进度条，[Html5 Tech](https://github.com/videojs/video.js/blob/v8.16.1/src/js/tech/html5.js#L561) 就会使用 `HTMLMediaElement.fastSeek()` 方式来设置播放进度；

正如上面的例子所示，使用 `HTMLMediaElement.fastSeek()` 设置播放进度，由于精度可能会被丢弃，播放器的进度条在显示的时候可能会出现"**回跳**"的现象。


### 3、Safari - Element 级别的自动播放策略

原文：<https://webkit.org/blog/7734/auto-play-policy-changes-for-macos/>

> Auto-play restrictions are granted on a per-element basis. Change the source of the media element instead of creating multiple media elements if you want to play multiple videos back to back (or play a pre-roll ad with sound, followed by the main video).

我们可能知道，想要在 Chrome 有声音的去自动播放一个有音轨的视频，一般要求用户先和页面进行交互（比如用户点击过页面），然后我们才可以愉快的调用 `video.play()`；

而且，只要用户和页面（Document）交互过，后续我们动态创建的媒体元素（`<video autoplay>` 和 `<audio autoplay>`）就都可以自动播放；

因此，我们可以认为，Chrome 的这种交互后才能自动播放的策略是页面（Document）级别的 —— 只要和页面交互过，后续该页面的所有媒体元素就都可以自动播放；

然而，Safari 的自动播放策略则是针对**单个媒体元素**生效的（元素级别）：

- 用户和一个媒体元素有过交互后，该媒体元素后续无论如何改变播放源（src），都可以自动播放；

- 但如果再新创建一个媒体元素，该媒体元素还是无法自动播放，仍需要用户交互；

这就意味着，如果我们想要在 Safari 中连续/切换播放多个视频时保持自动播放，我们就应该尽可能复用同一个媒体元素（`<video>`、`<audio>`），而不是不断去替换媒体元素 ———— 在使用 React 或 Vue 开发时我们应该注意这一点。


### 4、iOS Safari 不支持设置音量

在 iOS Safari 中是无法通过 `HTMLMediaElement.volume` 来设置音量大小的，该表现在 [MDN文档](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/volume) 中也有所描述：

![](/images/media-volume.png)

> iOS Safari 通过 `HTMLMediaElement.volume` 设置的音量大小并不会在媒体元素上生效
>
> iOS Safari 通过 `HTMLMediaElement.volume` 获取到的音量大小值永远是 1

在 iOS Safari 中，我们能修改的是 `HTMLMediaElement.muted`，切换媒体元素的静音状态。

最小复现 Demo（在 iOS 中打开）:

```html
<!DOCTYPE html>
<html>
  <body>
    <video controls autoplay></video>
    <script>
      var video = document.querySelector('video');
      video.src = '';

      video.addEventListener('play', () => {
        setTimeout(() => {
          video.volume = 0.2; // 3s 后尝试将音量大小修改为 0.2
        }, 3000);

        setTimeout(() => {
          console.log('volume:', video.volume); // 5s 后打印当前音量大小，返回的应该还是 1
        }, 5000);
      });
    </script>
  </body>
</html>
```
