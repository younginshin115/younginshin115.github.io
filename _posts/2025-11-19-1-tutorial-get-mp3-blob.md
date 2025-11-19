---
title: "[개발자도구] Blob 형태의 mp3 파일을 개발자 도구에서 바로 다운로드하는 방법"
excerpt: "디버깅 과정에서 개발자 도구의 콘솔을 사용하여 Blob 데이터를 직접 다운로드하는 임시 조치 공유유"

toc: false
toc_sticky: false

categories:
  - Tutorial
tags:
  - Blob
  - DevTools
  - JavaScript
last_modified_at: 2025-11-19T17:29:00
---

현재 운영하고 있는 플랫폼에서는 다양한 오디오 파일 형식을 지원합니다. 다만 처리 파이프라인의 일관성을 위해 모든 파일을 mp3로 변환하여 함께 저장합니다. 이 과정은 유저에게 노출되지 않고 내부적으로 처리됩니다.

그런데 바로 이 mp3 파일을 검증해야 하는 상황이 발생했습니다. UI에 mp3 다운로드 버튼을 추가해서 다운로드 하는 방법도 있었지만, 빠르고 또 간단하게 해결하고 싶었습니다. 

그러다가 API 응답으로 전달된 mp3 Blob 데이터를 바로 다운받을 수 있다면 간단하게 검증할 수 있지 않을까? 하는 생각이 들었습니다. 여러가지 방법을 시도한 끝에 개발자 도구에서 자바스크립트를 사용하면 임시로 다운받을 수 있다는 것을 확인하였습니다. 저와 비슷한 상황을 겪고 계실 분들께 도움이 될까 싶어 과정 전체를 정리해봅니다.

## 1. 개발자 도구에서 응답 확인

우선 개발자 도구로 들어갑니다.

<p><img src="/assets/images/251119/01.png" /></p>

`Network` 탭에서 `audio/mp3` 파일로 도착한 응답을 확인합니다.

<p><img src="/assets/images/251119/02.png" /></p>

해당 응답의 `Response` 탭으로 들어가 미리보기 형식을 `Base64`로 바꿉니다.

<p><img src="/assets/images/251119/03.png" /></p>

그리고 복사 버튼을 눌러 해당 데이터를 복사합니다.

## 2. 콘솔에서 Base64 데이터를 mp3 파일로 변환

이제 개발자 도구의 `Console` 탭으로 갑니다.
콘솔 창에서 복사한 Base64 문자열을 아래와 같이 변수로 선언합니다.

```javascript
const base64Data = "{복사한 Base64 데이터}"; 
```

<p><img src="/assets/images/251119/04.png" /></p>

아래 코드를 통해 변수에 할당된 Base64 데이터를 mp3 파일로 변환하여 다운로드 합니다.

```javascript
const link = document.createElement('a');
link.href = 'data:audio/mpeg;base64,' + base64Data;
link.download = 'download.mp3';
link.click();
```

<p><img src="/assets/images/251119/05.png" /></p>

그럼 아래 스크린샷과 같이 mp3 파일이 바로 다운로드 되는 것을 확인할 수 있습니다.

<p><img src="/assets/images/251119/06.png" /></p>

물론 이 방법은 빠르게 확인하기 위한 임시적인 우회 방법에 가깝습니다. 그럼에도 UI 변경이나 별도 스크립트 배포 없이, 개발자 도구만으로 문제를 빠르게 검증할 수 있어서 실제 운영 중 꽤 유용하게 활용했습니다.

필요한 분들에게도 도움이 되길 바랍니다.