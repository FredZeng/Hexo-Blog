---
title: ffmpeg 速记
---

## ffmpeg 速记

1. 将 `ts` 文件合并为 `mp4`

```bash
ffmpeg -i index.m3u8 -c copy output.mp4
```

2. 将 `mp4` 的 `moov` 前移

```bash
ffmpeg -i input.mp4 -c copy -movflags faststart output.mp4
```
