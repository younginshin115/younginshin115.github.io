---
title:  "[nvidia-smi] nvidia-smi 실시간 모니터링"
excerpt: "watch와 nvidia-smi 명령어를 결합시켜 실시간으로 GPU 사용량 모니터링 하기"

toc: false
toc_sticky: false

categories:
  - Tutorial
tags:
  - Tutorial
  - Ubuntu
  - GPU
last_modified_at: 2024-12-15T08:56:00
---

Ubuntu에서 GPU를 사용해서 inference 하는 프로세스를 돌리고 있었는데 배치 사이즈를 늘려 전체 프로세스의 속도를 줄일 수 있는 방법이 있을 지 찾고 있었습니다. inference가 특정 시점에 짧은 시간에 이뤄졌기 때문에 GPU 사용량을 실시간으로 모니터링 하는 방법이 필요했습니다. 기존에 하던 대로 로그를 읽어와 모니터링 대시보드를 만들 수도 있었지만 사양이 좋은 서버가 아니라서 무거운 작업은 피하고 싶었고, 단 한번만 필요한 일회성 작업이기 때문에 커맨드 라인에 처리하고 싶었습니다.

아래처럼 watch 명령어와 nvidia-smi를 결합하여 실시간으로 GPU 사용량을 모니터링 할 수 있었습니다. 

{% highlight bash linenos %}
watch -n 1 nvidia-smi
{% endhighlight %}

명령어를 사용하게 되면 아래와 같이 GPU를 실시간으로 모니터링 할 수 있습니다. 모니터링을 중지하려면 `Ctrl + c`를 누르세요.

<video controls width="640">
  <source src="/assets/images/24121501/01.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

<br />
-n 옵션은 모니터링 주기를 설정하는 옵션이기 때문에 이 뒤의 숫자를 조정하면 원하는 주기로 모니터링 할 수 있습니다. 위 영상을 보시면 GPU가 사용되는 시간이 정말 짧기 떄문에 저는 1초로 설정했습니다.

모니터링 결과, GPU 사용에는 여유가 있었지만 메모리가 거의 full에 가깝게 사용되고 있었기 때문에 배치를 추가로 늘리지는 않았습니다.