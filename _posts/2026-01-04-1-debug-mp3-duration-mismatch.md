---
title:  "오디오 처리 이슈 노트 (3) - 같은 파일이 플레이어에 따라 재생 시간이 다르게 표시되는 이슈"
excerpt: "같은 파일이 플레이어나 도구에 따라 재생 시간이 다르게 표시되는 문제를 실제 디코딩된 오디오 길이와 메타데이터, 비트스트림 기반 재생 시간 계산 방식의 차이를 비교하여 해결"

toc: false
toc_sticky: false

categories:
  - Debug
tags:
  - Debug
  - ffmpeg
  - audio
  - mp3
last_modified_at: 2026-01-04T20:53:00
---

저는 사운드 AI를 만드는 회사에 재직 중이라 오디오 데이터를 다룰 일이 많습니다. 오디오 데이터의 경우 비정형 데이터이기도 하고, 자주 접하지 않는 포맷이기 때문에 상상하지도 못한 이슈가 발생하는 경우가 종종 있습니다. 그 중 기억에 남았던 몇가지를 공유하고자 합니다.

---

## 문제 정의

현재 운영 중인 플랫폼에서는 간단하게 전체 파일을 들어볼 수 있는 플레이어와, 라벨링 된 특정 구간을 크롭해서 웨이브폼 형태로 보여주는 두가지 오디오 플레이어를 지원하고 있습니다. 그런데 두 플레이어에서 같은 구간을 재생했는데 다른 소리가 들린다는 제보를 받았습니다. 

두 플레이어에서 확인해 보니 구간 뿐만 아니라 총 재생 시간도 달랐습니다. 특히 **h5-audio-player**에서 총 재생 길이가 오디오 수집시 확인했던 실제 파일 길이 **5분 36초**보다 긴 **6분 16초**로 표시되고 있었습니다. 

## 원인 분석

앞선 문제와 마찬가지로 재생 로직이나 플레이어 구조의 문제가 아닌 오디오 파일 자체에 문제가 있는 것으로 보였습니다. 파일 자체에 문제가 있어, 이를 해석하는 과정에서 문제가 발생했을 것으로 추정했습니다. 원인을 정확히 파악하기 위해 각기 다른 방식으로 재생 시간을 계산하는 세가지 툴을 사용하여 해당 MP3 파일의 재생 시간을 확인했습니다. 

1. **pydub**: 디코딩된 오디오 데이터를 기준으로, 사람이 실제로 재생해 들을 수 있는 오디오 길이를 확인합니다.
2. **mutagen**: 파일 메타데이터를 기준으로 오디오 길이를 확인합니다. 만약 **mutagen**에서 6분 16초로 나온다면, 메타데이터나 헤더 자체에 문제가 있을 가능성이 큽니다.
3. **ffmpeg**: 전체 비트스트림(파일 크기)을 기준으로 재생 시간을 추정합니다. 만약 **ffmpeg**에서 6분 16초로 나온다면, 인코딩 시점에 오디오와 직접적인 관련이 없는 불필요한 데이터가 포함되었을 가능성이 있습니다.

각각 아래 코드를 사용해서 오디오의 재생 길이를 확인했습니다.

### pydub

```python
from pydub import AudioSegment

audio = AudioSegment.from_file(original_path)
duration_sec = len(audio) / 1000  # milliseconds to seconds
print(f"Decoded duration: {duration_sec:.2f} seconds")
```

### mutagen

```python
from mutagen.mp3 import MP3

audio = MP3(original_path)
print(f"Duration from metadata: {audio.info.length:.2f} seconds")
```

### ffmpeg

```python
import subprocess

def get_ffmpeg_duration(filepath):
    result = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", filepath],
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
    )
    return float(result.stdout.decode().strip())

duration = get_ffmpeg_duration(original_path)
print(f"FFmpeg-reported duration: {duration:.2f} seconds")
```

각 코드를 사용해서 확인한 오디오 길이는 아래와 같습니다.

| 도구 | 재생 시간 |
| --- | --- |
| **pydub** | 5분 36초 (340초) |
| **mutagen** | 5분 36초 (340초) |
| **ffmpeg** | 6분 16초 (378초) |

<p><img src="/assets/images/260104/01.png" /></p>

ffmpeg에서만 길이가 다르게 나왔으므로 처음 세웠던 가설대로, 오디오 파일에 실제 재생과 무관한 데이터가 포함되어 있었을 가능성이 높아졌습니다. 실제로 오디오 파일을 재생해서 확인한 결과 4분 15초부터 4분 53초 구간에 소리가 없었습니다. 이 구간의 길이는 pydub과 ffmpeg에서 확인된 재생 시간 차이인 약 38초와도 일치했습니다. 또한, 해당 구간은 특정 플레이어에서는 아예 재생도 불가능했습니다.

## 문제 해결

제가 선택할 수 있는 방법은 두가지가 있었습니다. 

첫번째는 문제가 발생한 4분 15초 이후 구간을 잘라내는 것입니다. 이 경우에는 정상적인 구간을 음질 손상 없이 보존할 수 있습니다. 다만 15초 이후의 데이터가 유실됩니다. 
두번째는 ffmpeg으로 디코딩 후 재인코딩하는 방식입니다. 이렇게 하면 파일을 처음부터 재 정리하는 효과를 가져와 내부의 불필요한 데이터를 제거하고 VBR 헤더도 정리할 수 있습니다. 다만 음질이 변형될 수 있고 느리다는 단점이 있습니다. 

저는 4분 15초 이후의 구간까지 포함하여 데이터의 전 구간을 보존하고 싶었기 때문에 두번째 방식을 택했습니다. 

아래 코드를 사용해 재인코딩을 진행했습니다. 

```python
def clean_mp3(input_path, output_path, bitrate_kbps=192):
    """
    Clean MP3 file by decoding and re-encoding using libmp3lame.
    Removes bad blocks, header issues, trailing garbage.
    """
    command = [
        "ffmpeg", "-y",
        "-i", input_path,
        "-acodec", "libmp3lame",
        "-b:a", f"{bitrate_kbps}k",
        output_path
    ]
    subprocess.run(command, check=True)
    print(f"Cleaned MP3 saved to: {output_path}")

# 사용 예시
clean_mp3(original_path, clean_path)
```

<p><img src="/assets/images/260104/02.png" /></p>

재 인코딩을 한 후 다시 ffmpeg 코드로 확인해보니 이제는 ffmpeg에서도 오디오 재생 길이가 5분 36초로 정상적으로 표시되었습니다. 모든 오디오 플레이어에서도 동일한 길이로 보이며 문제가 있었던 구간도 정상적으로 재생되는 것을 확인할 수 있었습니다.

<p><img src="/assets/images/260104/03.png" /></p>

|재인코딩 전|재인코딩 후|
| --- | --- |
|<img src="/assets/images/260104/04.png" />|<img src="/assets/images/260104/05.png" />|

## 정리

앞선 사례와 이번 사례를 통해 정상적으로 재생되는 MP3 파일이라도 내부적으로 문제가 있을 수 있다는 사실을 알게 되었습니다. 이슈 해결 이후 오디오 수집 파이프라인에 검증 프로세스와 필요한 경우 재인코딩을 하는 절차를 추가하여 같은 사례가 재발되는 것을 방지했습니다.