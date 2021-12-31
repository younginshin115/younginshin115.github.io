---
title:  "[Tutorial][Bazel] 211103 Windows에 Bazel 설치하기"
excerpt: "Bazel Tutorial(1)"

toc: true
toc_sticky: true

categories:
  - Tutorial
tags:
  - Tutorial
  - Bazel
  - Android
last_modified_at: 2021-11-03T12:07:00
---

우선 Bazel 공식 홈페이지에 나와있는 설치 튜토리얼을 그대로 따라하면서 작성된 문서라는 것을 밝힌다.<br>
(참조: <a href="https://docs.bazel.build/versions/4.2.2/install-windows.html">https://docs.bazel.build/versions/4.2.2/install-windows.html</a>)

Android에 Tensorflow를 적용한 머신러닝 기반의 어플을 개발하게 되어<br>
다른 툴에 비해 언어에 제약을 많이 받지 않는 Bazel이라는 빌드 툴을 시도했다.<br>
그 도전기의 첫번째 시간으로 Bazel 설치 방법을 소개하고자 한다.

## (1) Visual Studio 2015용 Visual C++ 재배포 가능 패키지 설치

(1-1) 우선 아래 설치 링크에 접속한다.<br>
설치 링크: <a href="https://www.microsoft.com/ko-KR/download/details.aspx?id=48145">https://www.microsoft.com/ko-KR/download/details.aspx?id=48145</a>

(1-2) 원하는 언어를 선택하고 다운로드 버튼을 누른다.
<p><img src="/assets/images/21123110.png" /></p>

(1-3) 팝업창에서 자신에게 맞는 버전을 선택하고 다음 버튼을 클릭한다.
<p><img src="/assets/images/21123111.png" /></p>

(1-4) 다운로드가 완료되면 해당 파일을 더블클릭해서 설치한다.
<p><img src="/assets/images/21123112.png" /></p>

## (2) Bazel 실행파일 다운로드

(2-1) Bazel GitHub에서 Bazel 실행파일을 다운로드 받는다. Pre-release보다 안정화 버전을 선택하는 것을 권장한다.<br>
Bazel GitHub 링크: <a href="https://github.com/bazelbuild/bazel/releases">https://github.com/bazelbuild/bazel/releases</a>

나는 현재 시점 가장 최신 배포판인 4.2.2를 선택했다.
<p><img src="/assets/images/21123113.png" /></p>

(2-2) Assets에서 쭉 내리면 windows용 exe 파일을 발견할 수 있다. 파일명을 클릭하여 다운로드 한다.
<p><img src="/assets/images/21123114.png" /></p>

(2-3) 다운로드가 완료되면 bazel 실행파일을 원하는 위치로 옮긴다.<br>
환경 변수로 등록할 예정이므로 경로는 짧으면 짧을수록 좋다.<br>
나는 C드라이브 바로 아래에 bazel 디렉토리를 만든 후 해당 디렉토리로 이동시켰다.
<p><img src="/assets/images/21123115.png" /></p>

(2-4) 호출에 용이하도록 파일명도 bazel.exe로 변경했다.
<p><img src="/assets/images/21123116.png" /></p>

## (3) 환경변수 등록

(3-1) 탐색창에서 고급 시스템 설정보기를 검색하여 실행한다.
<p><img src="/assets/images/21123117.png" /></p>

(3-2) 우측 하단의 환경 변수 버튼을 클릭한다.
<p><img src="/assets/images/21123118.png" /></p>

(3-3) 시스템 변수 중에 path를 찾아 편집 버튼을 클릭한다.
<p><img src="/assets/images/21123119.png" /></p>

(3-4) Bazel 실행파일이 있는 경로를 등록한 뒤 확인 버튼을 클릭하여 빠져나온다.
<p><img src="/assets/images/21123120.png" /></p>

(3-5) 환경변수를 등록한 뒤에는 재부팅을 해야 적용이 된다.

## (4) 설치 확인

(4-1) 재부팅 후에 CMD 창에서 아래 명령어를 실행한다. 이미지처럼 나오면 Bazel이 정상적으로 설치된 것이다.

```
bazel --version
```

<p><img src="/assets/images/21123121.png" /></p>
