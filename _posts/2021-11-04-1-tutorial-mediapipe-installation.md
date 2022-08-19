---
title:  "[Tutorial][Bazel-MediaPipe] 211104 Windows에 MediaPipe 설치하기"
excerpt: Android에 머신러닝 탑재하기(3)

toc: true
toc_sticky: true

categories:
  - Tutorial
tags:
  - Tutorial
  - Android
  - MediaPipe
  - Windows
  - Bazel
last_modified_at: 2021-11-04T17:05:00
---

Android에 머신러닝 기능을 탑재하기 위해 MediaPipe 설치하는 과정을 담았다.
MediaPipe 공식 홈페이지에 기재된 튜토리얼을 따라 진행한 내용임을 미리 밝힌다.
MediaPipe 공식 홈페이지 튜토리얼: <a href="https://google.github.io/mediapipe/getting_started/install.html#installing-on-windows">https://google.github.io/mediapipe/getting_started/install.html#installing-on-windows</a>

## (1) MSYS2 설치 및 환경변수 등록

MSYS2는 윈도우에서 C/C++ 컴파일을 위해 필요한 빌드툴이다.

(1-1) 아래 설치 링크에 접속한다.
링크: <a href="https://www.msys2.org/">https://www.msys2.org/</a>

(1-2) 노란색으로 하이라이트 표시한 버튼을 눌러 설치 파일을 다운로드 받는다.

<p><img src="/assets/images/22010101.png" /></p>

(1-3) 다운로드가 완료되면 설치 파일을 클릭하여 실행한다.

(1-4) 팝업창이 뜨면 Next 버튼을 누른다.

<p><img src="/assets/images/22010102.png" /></p>

(1-5) 설치 경로를 선택하고 Next 버튼을 누른다.

<p><img src="/assets/images/22010103.png" /></p>

(1-6) 시작 메뉴에 등록할 이름을 선택하는 창이다. 수정 없이 Next 버튼을 누른다.

<p><img src="/assets/images/22010104.png" /></p>

(1-7) 설치가 완료되면 Next 버튼을 누른다.

<p><img src="/assets/images/22010105.png" /></p>

(1-8) 체크박스를 해제하지 않은 채로 Finish 버튼을 눌러 설치를 완료한다.

<p><img src="/assets/images/22010106.png" /></p>

(1-9) 실행 파일이 모여있는 폴더를 환경 변수로 등록할 예정이다. 실행 파일 경로는 1-5번에서 선택했던 설치 경로에 /usr/bin 경로를 추가하면 된다.

<p><img src="/assets/images/22010107.png" /></p>

(1-10) 검색 창에 고급 시스템 설정 보기를 검색한다.

<p><img src="/assets/images/21123104.png" /></p>

(1-11) 우측 하단의 환경 변수 버튼을 클릭한다.

<p><img src="/assets/images/21123105.png" /></p>

(1-12) 시스템 변수에서 Path를 찾아 편집 버튼을 누른다.

<p><img src="/assets/images/21123106.png" /></p>

(1-13) 우측 상단의 새로 만들기 버튼을 누른다.

<p><img src="/assets/images/21123107.png" /></p>

(1-14) 아까 확인했던 경로를 등록한 뒤 확인 버튼을 눌러 빠져나온다.

<p><img src="/assets/images/22010108.png" /></p>

(1-15) 환경변수는 재부팅을 해야 활성화 되므로 컴퓨터 재부팅을 한다.

(1-16) CMD 창에 아래 명령어를 입력하여 필요 패키지를 다운로드 받는다.

{% highlight shell linenos %}
pacman -S git patch unzip
{% endhighlight %}

(1-17) 설치를 계속할지 물어보면 "Y"를 입력하여 설치를 완료한다.

<p><img src="/assets/images/22010109.png" /></p>

## (2) Python 설치 및 환경변수 등록

Python은 이미 설치되어있다는 전제하에 작성하지 않았다.<br>
필요한 경우 Google에 검색하면 관련 포스트를 많이 찾을 수 있다.

## (3) Visual C++ Build Tool 2021 설치

(3-1) 아래 설치 링크로 접속한다.
링크: <a href="https://visualstudio.microsoft.com/ko/visual-cpp-build-tools/">https://visualstudio.microsoft.com/ko/visual-cpp-build-tools/</a>

(3-2) Build Tools 다운로드 버튼을 누른다.

<p><img src="/assets/images/22010110.png" /></p>

(3-3) 설치 파일 다운로드가 완료되면 클릭하여 실행한다.

(3-4) 팝업창이 뜨면 계속 버튼을 누른다.

<p><img src="/assets/images/22010111.png" /></p>

(3-5) 워크로드를 선택하는 창이 뜨면 우리에게 필요한 "C++를 사용한 데스크톱 개발"을 선택한뒤 Install 버튼을 누른다.

<p><img src="/assets/images/22010112.png" /></p>

(3-6) 설치가 완료되었다.

<p><img src="/assets/images/22010113.png" /></p>

## (4) WinSDK 설치

(4-1) 아래 설치 링크로 접속한다.
링크: <a href="https://developer.microsoft.com/ko-kr/windows/downloads/windows-sdk/">https://developer.microsoft.com/ko-kr/windows/downloads/windows-sdk/</a>

(4-2) 우측 하단의 설치 관리자 다운로드 버튼을 누른다.

<p><img src="/assets/images/22010114.png" /></p>

(4-3) 설치 파일이 다운로드 완료되면 클릭하여 실행한다.

(4-4) 팝업창이 뜨면 Next 버튼을 누른다.

<p><img src="/assets/images/22010115.png" /></p>

(4-5) Microsoft가 정보를 수집하는 것을 허용할지 선택한 후 Next 버튼을 누른다.

<p><img src="/assets/images/22010116.png" /></p>

(4-6) 라이선스에 동의하는 내용이 뜨면 Accept 버튼을 눌러 동의한다.

<p><img src="/assets/images/22010117.png" /></p>

(4-7) Install 버튼을 눌러 설치한다.

<p><img src="/assets/images/22010118.png" /></p>

(4-8) 설치가 완료되면 Close 버튼을 눌러 빠져나온다.

<p><img src="/assets/images/22010119.png" /></p>

## (5) Bazel 설치

Bazel 설치 법은 이전 포스트에서 다뤘으므로 <a href="/tutorial/1-tutorial-bazel-windows-installation/">링크</a>로 대신한다.

## (6) Bazel 환경변수 등록하기

(6-1) CMD 창으로 아래 4개의 환경 변수를 등록한다.

{% highlight shell linenos %}
set BAZEL_VS="C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools"
set BAZEL_VC="C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools\VC"
set BAZEL_VC_FULL_VERSION={Visual Studio Build Tools 버전}
set BAZEL_WINSDK_FULL_VERSION={WinSDK 버전}
{% endhighlight %}

<p class="code"><img src="/assets/images/22010120.png" /></p>

## (7) MediaPipe Repository Git clone

(7-1) CMD 창에서 아래 명령어로 MediaPipe Repository를 클론해온다. 위치는 자유롭게 선택하면 된다.

{% highlight shell linenos %}
git clone https://github.com/google/mediapipe.git
{% endhighlight %}

<p class="code"><img src="/assets/images/22010121.png" /></p>

## (8) OpenCV 설치

(8-1) 아래 설치 링크로 접속한다.
링크: <a href="https://opencv.org/releases/">https://opencv.org/releases/</a>

(8-2) Windows용 설치파일을 다운로드 받는다.

<p><img src="/assets/images/22010122.png" /></p>

(8-3) 다운로드가 완료되면 설치 파일을 눌러 실행한다.

(8-4) 설치경로를 선택하고 Extract 버튼을 누른다. 환경변수로 등록할 예정이므로 경로는 짧을 수록 좋다.

<p><img src="/assets/images/22010123.png" /></p>

(8-5) 설치가 완료되면 8-4에서 선택한 설치경로에 opencv 폴더가 생긴 것을 확인할 수 있다.

<p><img src="/assets/images/22010124.png" /></p>

(8-6) 이제 환경변수로 등록할 차례이다. 검색 창에 고급 시스템 설정 보기를 검색한다.

<p><img src="/assets/images/21123104.png" /></p>

(8-7) 우측 하단의 환경 변수 버튼을 클릭한다.

<p><img src="/assets/images/21123105.png" /></p>

(8-8) 시스템 변수에서 Path를 찾아 편집 버튼을 누른다.

<p><img src="/assets/images/21123106.png" /></p>

(8-9) 우측 상단의 새로 만들기 버튼을 누른다.

<p><img src="/assets/images/21123107.png" /></p>

(8-10) OpenCV 폴더에서 DLL 파일이 들어있는 경로를 등록한다. 아까 확인했던 opencv 폴더에서 /build/x64/vc15/bin으로 들어가면 확인할 수 있다.<br>경로를 등록한 뒤 확인 버튼을 눌러 빠져나온다.

<p><img src="/assets/images/22010125.png" /></p>

## (9) Mediapipe 설치 확인

(9-1) Mediapipe가 제대로 설치되었는 지 확인하는 절차이다.<br>
CMD 창으로 들어가 7-1에서 MediaPipe Repository를 clone한 폴더로 이동한다.

(9-2) 아래 명령어를 차례대로 입력하여 MediaPipe가 제대로 설치되었는 지 확인한다. 아래 스크린샷처럼 나타난다면 설치가 완료된 것이다.

{% highlight shell linenos %}
bazel build -c opt --define MEDIAPIPE_DISABLE_GPU=1 --action_env PYTHON_BIN_PATH="{Python이 설치된 경로}" mediapipe/examples/desktop/hello_world
set GLOG_logtostderr=1
bazel-bin\mediapipe\examples\desktop\hello_world\hello_world.exe
{% endhighlight%}

<p><img src="/assets/images/22010130.png" /></p>