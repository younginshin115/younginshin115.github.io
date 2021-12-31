---
title:  "[Tutorial][Docker] Ubuntu에 Docker 설치하기"
excerpt: "Ubuntu에 Docker 설치하기"

toc: false
toc_sticky: false

categories:
  - Tutorial
tags:
  - Tutorial
  - Ubuntu
  - Docker
last_modified_at: 2021-06-18T8:58:00
---

도커 설치 방법에는 세 가지 방법이 있다.
1. Repository와 apt-get으로 설치(대중적인 방법)
2. DEB package를 다운로드 받아 수동으로 설치
3. convenience script로 설치

여기서는 대중적인 방법으로 진행한다. 다른 방법은 <a href="https://docs.docker.com/engine/install/ubuntu/">공식홈페이지의 도커 설치 방법</a>에서 확인할 수 있다.

[1] 혹시라도 Docker가 설치되어 있는 경우 오류가 발생할 수 있으므로 기존에 설치된 Docker를 삭제하는 명령어를 입력한다.
```
sudo apt-get remove docker docker-engine docker.io containerd runc
```
<p class="code"><img src="/assets/images/21090710.png" /></p>

[2] apt 패키지를 업데이트한다.
```
sudo apt-get update
```
<p class="code"><img src="/assets/images/21090711.png" /></p>

[3] Docker 설치에 필요한 패키지를 설치한다.
```
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```
<p class="code"><img src="/assets/images/21090712.png" /></p>

[4] GPG key를 추가한다.
```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```
<p class="code"><img src="/assets/images/21090713.png" /></p>

[5] 저장소를 설정한다.
```
echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```
<p class="code"><img src="/assets/images/21090714.png" /></p>

[6] 패키지를 업데이트한다. 설정한 저장소에 맞게 패키지가 업데이트 된다.
```
sudo apt-get update
```
<p class="code"><img src="/assets/images/21090715.png" /></p>

[7] 이제 Docker를 설치한다.
```
sudo apt-get install docker-ce docker-ce-cli containerd.io
```
<p class="code"><img src="/assets/images/21090716.png" /></p>

[8] 설치가 완료되었다면 Docker가 제대로 설치되었는지 확인한다.
우선 설치된 버전을 확인해보자.
```
sudo docker -v
```
<p class="code"><img src="/assets/images/21090717.png" /></p>

그리고 테스트 코드를 실행한다.
```
sudo docker run hello-world
```
<p class="code"><img src="/assets/images/21090718.png" /></p>

[참고] Docker 삭제하기
```
sudo apt-get purge docker-ce docker-ce-cli containerd.io
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
```

참고 : <a href="https://docs.docker.com/engine/install/ubuntu/">https://docs.docker.com/engine/install/ubuntu/</a>