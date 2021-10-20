---
title:  "[튜토리얼][Azure Custom Speech] 211005 Azure Custom Speech 학습을 위한 데이터 준비"
excerpt: "Azure Custom Speech 튜토리얼"

toc: True
toc_sticky: True

categories:
  - Tutorial
tags:
  - Tutorial
  - Azure
  - Custom Speech
  - Python
last_modified_at: 2021-10-05T20:59:00
---

Azure에서 제공하는 <a href="https://docs.microsoft.com/ko-kr/azure/cognitive-services/speech-service/custom-speech-overview/">Custom Speech</a>을 위한 데이터 준비 튜토리얼입니다.

Custom Speech는 아래와 같은 데이터 사양을 요구합니다.

|속성|값|
|:---:|:---:|
|파일형식|RIFF(WAV)|
|채널|1(mono)|
|오디오 당 최대 길이|2시간(테스트)/60초(학습)|
|샘플 속도|8,000Hz 또는 16,000Hz|

<br>

# MP4(영상) 파일을 WAV(음성) 파일로 바꾸기

```python
import os
import subprocess

command = "ffmpeg -i {} -ab 160k -ac 2 -ar 44100 -vn {}".format("{변환하려는 파일명(경로포함)}", os.path.join("{내보내려는 파일경로}", "{저장할 파일명}"))
    
subprocess.call(command, shell=True)
```

<br>

# Multi 채널을 Mono 채널로 바꾸기

```
pip install pydub
```

```python
from pydub import AudioSegment
sound = AudioSegment.from_wav('{변환하려는 파일명(경로포함)}')
sound = sound.set_channels(1)
sound.export('{내보내려는 파일명(경로포함)}', format='wav')
```

<br>

# 파일 길이 자르기

```python
import os
import librosa
import numpy as np

def trim_audio_data(audio_file, save_file):
    sr = 96000 # 파일 길이
    sec = 60
    
    y, sr = librosa.load(audio_file, sr=sr)
    my = y[:sr*sec]
    
    librosa.output.write_wav(save_file+'.wav', my, sr)
    
trim_audio_data("{변환하려는 파일명(경로포함)}", "{내보내려는 파일경로}")
```

<br>

# 44100Hz WAV 파일 16000Hz로 변환하기

```python
import librosa

y, s = librosa.load("{변환하려는 파일명(경로포함)}", sr=16000)
```

<br>

# WAV 파일 주파수와 채널 확인하기

```python
import librosa
import wave

def frame_rate_channel(audio_file_name):
    print(audio_file_name)
    with wave.open(audio_file_name, "rb") as wave_file:
        frame_rate = wave_file.getframerate()
        channels = wave_file.getnchannels()
        return frame_rate,channels

path = "{확인하려는 WAV 파일 경로}"
files = glob.glob(path + '/*')

for f in files:
    print(frame_rate_channel(f))
```