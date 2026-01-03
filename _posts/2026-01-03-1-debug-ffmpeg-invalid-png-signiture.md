---
title:  "[FFmpeg] 오디오 처리 이슈 노트 (1) - Invalid PNG signature"
excerpt: "FFmpeg으로 오디오 파일 변환할 때 파일에 포함된 앨범 커버 이미지로 인해 발생한 Invalid PNG signature 문제 해결"

toc: false
toc_sticky: false

categories:
  - Debug
tags:
  - Debug
  - ffmpeg
  - audio
last_modified_at: 2026-01-03T09:21:00
---

저는 사운드 AI를 만드는 회사에 재직 중이라 오디오 데이터를 다룰 일이 많습니다. 오디오 데이터의 경우 비정형 데이터이기도 하고, 자주 접하지 않는 포맷이기 때문에 상상하지도 못한 이슈가 발생하는 경우가 종종 있습니다. 그 중 기억에 남았던 몇가지를 공유하고자 합니다.

FFmpeg을 사용해 오디오를 변환하던 중, 특정 파일에서 아래와 같은 오류가 발생했습니다.

<p class="error_msg">
Traceback (most recent call last): raise Exception(f'ffmpeg error: {error.decode()}') Exception: ffmpeg error: [png @ 0x561d8b00d440] Invalid PNG signature 0xFFD8FFE000104A46. [png @ 0x561d8b00fd00] Invalid PNG signature 0xFFD8FFE000104A46. Error while decoding stream #0:1: Invalid data found when processing input Too many packets buffered for output stream 0:1. command = [ 'ffmpeg', '-loglevel', 'error', '-i', '-', '-ss', str(timedelta(seconds=segment[0])), '-to', str(timedelta(seconds=segment[1])), '-f', ext, '-' ]
</p>

처음에는 오디오 파일을 변환하는 과정에서 PNG 오류가 발생한다는 점이 의아했습니다. 그런데 찾아보니 mp3나 m4a같은 오디오 파일에는 순수한 오디오 스트림뿐만 아니라 제목, 가사, 앨범 커버 이미지와 같은 메타데이터 스트림이 함께 포함될 수 있다는 점을 알게 되었습니다. 저희가 mp3 파일을 받아서 재생할 때 자동으로 노출되는 앨범 커버 이미지가 바로 오디오 데이터에 포함되어있던 메타데이터였던 것이죠.

문제의 원인은 바로 이 앨범 커버 이미지 데이터였습니다. 해당 파일에는 앨범 커버 이미지가 JPEG 형식으로 포함되어 있었는데, ffmpeg이 이를 PNG 스트림으로 해석하려다 실패하면서 `Invalid PNG signature` 오류가 발생한 것입니다. 제가 처리하려고 했던 건 오디오 데이터 뿐이었는데 이미지 데이터도 같이 처리하려다가 문제가 발생한 것이죠.

해결 방법은 비교적 단순했습니다. 비디오/이미지 스트림을 명시적으로 제외하거나 오디오 스트림만 처리하겠다고 명시하면 됩니다. 저는 아래와 같은 옵션을 추가하여 문제를 해결했습니다.

```bash
ffmpeg -i input.m4a -vn -map 0:a:0 -c:a copy output.m4a
```

- `-vn` : video/이미지 스트림 제거
- `-map 0:a:0` : 첫 번째 오디오 스트림만 선택
