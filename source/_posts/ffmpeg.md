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

3. 抽取音视频文件中的 AAC 音频流

```bash
ffmpeg -i input.mp4 -vn -acodec copy output.aac
```

- `-vn` 忽略视频流
- `-an` 忽略音频流

4. 拉取 HTTP 中的流录制 FLV

```bash
ffmpeg -i http://xxx.com/live.flv -c copy -f flv output.flv
```