---
title:  "[튜토리얼][Kafka] 210623 VirtualBox 내의 Kafka에 접속하기"
excerpt: "VirtualBox 내의 Kafka에 접속하기"

toc: false
toc_sticky: false

categories:
  - Tutorial
tags:
  - Tutorial
  - Kafka
  - Linux
  - VirtualBox
last_modified_at: 2021-06-23T17:02:00
---

Linux 환경에서 바로 개발하기 어려워 Windows 환경에서 선개발 후 Linux 서버로 이동하는 방식을 사용했다.
VirtualBox 안에 구축된 Kafka로 접속하는 방법에 대해 적어보고자 한다.

## 포트 열기
[1] VirtualBox에서 [파일]-[호스트 네트워크 관리자]를 선택한다.<br>
<p><img src="/assets/images/21091901.png" width="600px" /></p>

[2] IPv4 주소를 확인한다. 이후 포트를 열 때 호스트IP로 사용한다.<br>
<p><img src="/assets/images/21091902.png" width="600px" /></p>

[3] Linux에서 ifconfig 명령어를 사용해 내부IP를 확인한다. 이후 포트를 열 때 게스트IP로 사용한다.<br>
<p><img src="/assets/images/21091903.png" width="600px" /></p>

[4] VirtualBox에서 원하는 VM을 선택하고 설정을 클릭한다.<br>
<p><img src="/assets/images/21091904.png" width="600px" /></p>

[5] [네트워크]-[고급]을 클릭한다.<br>
<p><img src="/assets/images/21091905.png" width="600px" /></p>

[6] [포트 포워딩]을 클릭한다.<br>
<p><img src="/assets/images/21091906.png" width="600px" /></p>

[7] 앞서 알아둔 호스트IP와 게스트IP, 그리고 Kafka의 IP인 9092를 사용해 포트를 열어준다.<br>
<p><img src="/assets/images/21091907.png" width="600px" /></p>

## Kafka 내부 설정하기
[1] Linux에 접속해서 Kafka 폴더로 이동한다.<br>

[2] conf 디렉토리의 server.properties에서 advertised.listeners의 주석을 풀고 주소를 호스트IP:9092로 수정한다.<br>
<p><img src="/assets/images/21091908.jpg" width="600px" /></p>

<br>
<br>
이제 Windows에서 호스트IP:9092로 VirtualBox 내의 Kafka에 접속할 수 있다.<br>
<p><img src="/assets/images/21091909.png" width="600px" /></p>