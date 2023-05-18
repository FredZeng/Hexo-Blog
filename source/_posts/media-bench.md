---
title: 如何压测流媒体服务器？
date: 2023-05-18
---

介绍一些用于压测流媒体服务器的工具：

### st-load

[SRS](https://ossrs.net/lts/zh-cn/)是一个开源的实时视频服务器，它可以支持RTMP、WebRTC、HLS、HTTP-FLV、SRT等多种实时流媒体协议；

SRS的作者为了能更好的验证SRS服务器的流媒体转发性能，同时提供了专门的测试套件 [st-load](https://github.com/ossrs/srs-bench/tree/master)

该套件中提供了：

- sb_hls_load 支持HLS点播和直播
- sb_http_load 支持HTTP负载测试，所有并发重复下载一个http文件
- sb_rtmp_load 支持RTMP流播放测试，一个进程支持5k并发
- sb_rtmp_publish 支持RTMP流推流测试，一个进程支持500个并发

该套件需要在 linux 下运行，它会模拟客户端行为拉流。

#### 使用方法

Build from source, then run RTMP benchmark:

```
git clone https://github.com/ossrs/srs-bench.git &&
cd srs-bench && ./configure && make &&
./objs/sb_rtmp_load -c 1 -r rtmp://127.0.0.1:1935/live/livestream
```

Or directly by docker:

```bash
docker run --rm -it --network=host --name sb ossrs/srs:sb \
    ./objs/sb_rtmp_load -c 1 -r rtmp://127.0.0.1:1935/live/livestream
```

For HTTP-FLV benchmark:

```bash
docker run --rm -it --network=host --name sb ossrs/srs:sb \
    ./objs/sb_http_load -c 1 -r http://127.0.0.1:8080/live/livestream.flv
```

For HLS benchmark:

```bash
docker run --rm -it --network=host --name sb ossrs/srs:sb \
    ./objs/sb_hls_load -c 1 -r http://127.0.0.1:8080/live/livestream.m3u8
```

Or from Aliyun mirror:

```bash
docker run --rm -it --network=host --name sb \
    registry.cn-hangzhou.aliyuncs.com/ossrs/srs:sb \
    ./objs/sb_rtmp_load -c 1 -r rtmp://127.0.0.1:1935/live/livestream
```

> Note: Please use `docker kill sb` to stop it.

使用 `./objs/sb_rtmp_load` or `./objs/sb_hls_load` or `./objs/sb_http_load` 去拉不同协议的流，`-c` 表示负载数



### flazr

flazr 是 RTMP 的一个 java 实现，这个项目提供了一个流媒体服务器和相关的工具类；

该工具可以在 windows 上运行，我们可以使用它来压测 rtmp 拉流；

下载地址：https://sourceforge.net/projects/flazr/files/flazr/



### JMeter

使用 JMeter 的BlazeMeter-HLS Plugin，可以压测 hls 播放

参考：https://zhuanlan.zhihu.com/p/624834220
