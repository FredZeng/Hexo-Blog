---
title: ffmpeg 速记
date: 2021-11-08
---

[flv.js Demo](http://bilibili.github.io/flv.js/demo/)

### 视频

1. 将视频转为浏览器可以播放的 mp4 视频

```bash
ffmpeg -i input.MP4 -c:v libx264 -c:a aac -s:v 1280x720 -movflags faststart output.mp4
```

- `-c:v libx264` 视频采用 h264 编码
- `-c:a aac` 音频采用 aac(LC) 编码
- `-s:v 1280x720` 视频分辨率调整为 1280x720（可选）

2. 将 `ts` 文件合并为 `mp4`

```bash
ffmpeg -i index.m3u8 -c copy output.mp4
```

3. 将 `mp4` 的 `moov` 前移

```bash
ffmpeg -i input.mp4 -c copy -movflags faststart output.mp4
```

4. 以文件的形式保存 flv （直播）流

```bash
ffmpeg -i http://xxx.com/live.flv -c copy -f flv output.flv
```

5. 以 CSV 格式输出视频流的帧信息

```bash
ffprobe -show_frames -select_streams v -of csv abc.flv > abc.csv
```

- `-show_frames` 查看每一帧信息
- `-select_streams` 可以只查看音频（`a`）、视频（`v`）、字幕（`s`）的信息
- `-of` 输出格式，包括 XML、INI、JSON、CSV、FLAT 等

**frame 字段说明**

| 属性 | 说明 | 值 |
|---|---|---|
| media_type | 帧的类型（视频、音频、字幕等） | video |
| stream_index | 帧所在的索引区域 | 0 |
| key_frame | 是否为关键帧 | 1 |
| pkt_pts | Frame 包的 pts | 0 |
| pkt_pts_time | Frame 包的 pts 的时间显示 | 0.080000 |
| pkt_dts | Frame 包的 dts | 80 |
| pkt_dts_time | Frame 包的 dts 的时间显示 | 0.080000 |
| pkt_duration | Frame 包的时长 | N/A |
| pkt_duration_time | Frame 包的时长时间显示 | N/A |
| pkt_pos | Frame 包所在文件的偏移位置 | 344 |
| width | 帧显示的宽度 | 1280 |
| height | 帧显示的高度 | 714 |
| pix_fmt | 帧的图像色彩格式 | yuv420p |
| pict_type | 帧类型（如：I、P、B） | I |

IDR frame: pict_type=I 且 key_frame=1 时，表示这是 IDR frame.

### 音频

1. 抽取音视频文件中的 AAC 音频流

```bash
ffmpeg -i input.mp4 -vn -acodec copy output.aac
```

- `-vn` 忽略视频流
- `-an` 忽略音频流

2. 将 m4a 转为 mp3

```bash
ffmpeg -i abc.m4a -y -c:a libmp3lame -aq 0 abc.mp3
```

批量转换脚本：

```bash
#!/bin/bash

for i in *.m4a ; do
  ffmpeg -i "$i" -y -c:a libmp3lame -aq 0 "${i%.*}.mp3"
done
```

3. 将 mp3 转为 ogg

```bash
ffmpeg -i abc.mp3 -y -c:a libvorbis abc.ogg
```

批量转换脚本：

```bash
#!/bin/bash

for i in *.mp3 ; do
  ffmpeg -i "$i" -y -c:a libvorbis "${i%.*}.ogg"
done
```

4. 增大/减小 MP4 的音量

将 input.mp4 文件的音量调大 10dB，输出到 output.mp4 文件中。

```bash
ffmpeg -i input.mp4 -vcodec copy -af "volume=10dB" output.mp4
```
