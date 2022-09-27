---
title:  "[Tutorial][Bazel] 220927 WSL에 Bazel 설치하기"
excerpt: "Android에 머신러닝 탑재하기"

toc: true
toc_sticky: true

categories:
  - Tutorial
tags:
  - Tutorial
  - Bazel
  - WSL
last_modified_at: 2022-09-27T21:18:00
---

Bazel 공식 홈페이지에 나와있는 설치 튜토리얼을 그대로 따라하는 포스팅인점 참고 부탁드립니다.<br>
(참조: <a href="https://google.github.io/mediapipe/getting_started/install.html#installing-on-debian-and-ubuntu">https://google.github.io/mediapipe/getting_started/install.html#installing-on-debian-and-ubuntu</a>)

언어의 제약을 많이 받지 않는 빌드 툴인 Bazel을 WSL에 설치하는 튜토리얼입니다.

## (1) 패키지에 Bazel을 추가합니다.

{% highlight shell linenos %}
sudo apt install apt-transport-https curl gnupg
curl -fsSL https://bazel.build/bazel-release.pub.gpg | gpg --dearmor > bazel.gpg
sudo mv bazel.gpg /etc/apt/trusted.gpg.d/
echo "deb [arch=amd64] https://storage.googleapis.com/bazel-apt stable jdk1.8" | sudo tee /etc/apt/sources.list.d/bazel.list
{% endhighlight %}

## (2) Bazel을 설치합니다.

{% highlight shell linenos %}
sudo apt update && sudo apt install bazel
{% endhighlight %}

<p><img src="/assets/images/22092701.png" /></p>

## (3) 최신 버전으로 업데이트합니다.

{% highlight shell linenos %}
sudo apt update && sudo apt full-upgrade
{% endhighlight %}

<p><img src="/assets/images/22092702.png" /></p>

## (4) 설치가 완료되었다면 아래 명령어로 Bazel이 제대로 설치되었는지 확인합니다.

{% highlight shell linenos %}
bazel --version
{% endhighlight %}

<p><img src="/assets/images/22092703.png" /></p>
