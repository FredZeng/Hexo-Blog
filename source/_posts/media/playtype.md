---
title: Media PlayType Support Detect
date: 2021-12-28
categories:
- media
---

[online demo](https://fredzeng.github.io/demo/playtype.html)

### Support built-in HLS

Based on [flv.js](https://github.com/bilibili/flv.js/blob/master/src/core/features.js#L43).

```typescript
function supportNativeMediaPlayback(mimeType: string) {
    const videoElement = window.document.createElement('video');
    let canPlay = videoElement.canPlayType(mimeType);
    return canPlay === 'probably' || canPlay == 'maybe';
}

console.log('Support built-in HLS:', supportNativeMediaPlayback('application/vnd.apple.mpegurl'));
```

### Support [MSE](https://developer.mozilla.org/en-US/docs/Web/API/MediaSource) H264

Based on [hls.js](https://github.com/video-dev/hls.js/blob/master/src/is-supported.ts#L8).

```typescript
// check MediaSource support
function getMediaSource(): typeof MediaSource | undefined {
  return self.MediaSource || ((self as any).WebKitMediaSource as MediaSource);
}

// check SourceBuffer support
function getSourceBuffer(): typeof self.SourceBuffer {
  return self.SourceBuffer || (self as any).WebKitSourceBuffer;
}

function isSupported(): boolean {
  const mediaSource = getMediaSource();
  if (!mediaSource) {
    return false;
  }
  const sourceBuffer = getSourceBuffer();
  // Check H264 support
  const isTypeSupported =
    mediaSource &&
    typeof mediaSource.isTypeSupported === 'function' &&
    mediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');

  // if SourceBuffer is exposed ensure its API is valid
  // safari and old version of Chrome doe not expose SourceBuffer globally so checking SourceBuffer.prototype is impossible
  const sourceBufferValidAPI =
    !sourceBuffer ||
    (sourceBuffer.prototype &&
      typeof sourceBuffer.prototype.appendBuffer === 'function' &&
      typeof sourceBuffer.prototype.remove === 'function');
  return !!isTypeSupported && !!sourceBufferValidAPI;
}

console.log('Support MediaSource:', !!getMediaSource());
console.log('Support SourceBuffer:', !!getSourceBuffer());
console.log('Support MSE & H264:', !!isSupported());
```
