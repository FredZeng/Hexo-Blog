---
title: 如何分析 flv
date: 2023-09-18
categories:
- media
- flv
---

### 1. 保留现场

在定位 flv 直播问题时（由于直播场景的特殊性，出问题的流可能转瞬即逝），我们首先需要将流保存下来，以供后续的问题定位和修复验证；

我们可以在命令行中使用 `curl` 命令，将 flv 流以文件形式保存下来：

```bash
curl https://xxx.com/test.flv -o test.flv
```



### 2. 问题初判

在对保存下来的 flv 文件深入分析之前，我们可以使用如 `ffplay`, `ffprobe` 等工具初步分析/播放一下 flv 文件，看看这些工具能否给我们提供一些有用的信息：


#### 2.1 使用 ffplay

```bash
ffplay -hide_banner -autoexit -loglevel level -report -i test.flv
```

+ `-hide_banner` 在控制台中不打印 ffplay 的 banner 信息
+ `-autoexit` 播放结束后自动关闭播放窗口
+ `-loglevel level` 在控制台和日志文件输出日志时，带上日志等级（如：`[error]`, `[warning]`, `[debug]`, `[verbose]`）
+ `-report` 输出日志文件
+ `-i` 后面接视频文件的相对路径 or 绝对路径

> 更多参数：<https://ffmpeg.org/ffplay.html>



#### 2.2 使用 ffprobe

```bash
ffprobe -loglevel level -hide_banner -unit -show_frames -select_streams v -show_error -of ini -i test.flv > test.ini 2>&1
```

+ `-unit` 输出的信息中带上单位
+ `-select_streams v` 只查看视频轨（`v`）信息
+ `-show_frames` 查看每一帧信息
+ `-show_error` 打印错误
+ `-of ini` 以`.ini`格式输出结果
+ `> test.ini 2>&1` 使用管道符将结果及错误信息都输出到 `test.ini` 文件中

> 更多参数：<https://ffmpeg.org/ffprobe.html>

