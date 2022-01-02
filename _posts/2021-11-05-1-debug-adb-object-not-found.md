---
title:  "[Debug][Android] 211105 'adb' 용어가 cmdlet, 함수, 스크립트 파일 또는 실행할 수 있는 프로그램 이름으로 인식되지 않습니다. 이름이 정확한지 확인하고 경로가 포함된 경우 경로가 올바른지 검증한 다음 다시 시도하십시오."
excerpt: "Android 개발 중 문제 해결"

toc: false
toc_sticky: false

categories:
  - Debug
tags:
  - Debug
  - Android
  - adb
last_modified_at: 2021-11-05T18:05:00
---

Android 개발 중 연결된 기기를 확인하기 위해 "adb devices -l" 명령어를 사용했는데 아래와 같은 오류 메시지가 발생했다.
<p class="code"><img src="/assets/images/21123101.png" /></p>

adb가 path에 등록되어있지 않아서 발생한 문제였다.

adb는 Android SDK가 설치된 디렉토리의 platform-tools 디렉토리에 있다.

<p class="code"><img src="/assets/images/21123102.png" /></p>

해당 디렉토리를 path에 등록하거나 절대 경로를 사용하면 된다.

## (1) 디렉토리를 path에 등록하는 방법

(1-1) 우선 탐색창에서 고급 시스템 설정 보기를 검색해서 실행시킨다.
<p class="code"><img src="/assets/images/21123104.png" /></p>

(1-2) 우측 하단의 "환경 변수" 버튼을 클릭한다.
<p><img src="/assets/images/21123105.png" /></p>

(1-3) 시스템 변수 중에 Path를 찾아 편집 버튼을 누른다.
<p><img src="/assets/images/21123106.png" /></p>

(1-4) 우측 상단의 새로 만들기 버튼을 누른다.
<p><img src="/assets/images/21123107.png" /></p>

(1-5) 아까 확인했던 경로를 등록하고 확인 버튼을 누른다.
<p><img src="/assets/images/21123108.png" /></p>

(1-6) 환경변수는 재부팅 후에 적용되므로 재부팅한다.

(1-7) 재부팅이 완료되면 CMD 창에서 "adb devices -l" 명령어를 실행한다.<br>이번에는 잘 실행되는 것을 확인할 수 있다.
<p class="code"><img src="/assets/images/21123109.png" /></p>

## (2) 절대 경로로 사용하는 방법
<p class="code"><img src="/assets/images/21123103.png" /></p>

