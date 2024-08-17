---
title:  "[Debug][NodeJS] 240817 NodeJS 디버깅 시 VS Code Debug console에서 No debugger available, can not send 'variables' 이슈 해결"
excerpt: "Visual Studio Code에서 NodeJS 디버깅 시 Debug console dotenv에서 No debugger available, can not send 'variables' 라고 뜨며 디버깅이 진행되지 않는 이슈 해결"

toc: false
toc_sticky: false

categories:
  - Debug
tags:
  - Debug
  - Node.js
  - Visual Studio Code
last_modified_at: 2024-08-17T16:08:00
---

**Node.js 백엔드 개발자 되기**라는 책으로 Node.js로 백엔드를 작성하는 방법을 공부하고 있습니다. Visual Studio Code에서 Node.js 디버깅시 아래와 같이 No debugger available, can not send 'variables' 라는 오류가 발생했습니다.

<p><img src="/assets/images/24081701/02.png" /></p>

디버그 어댑터가 디버깅 시 출력할 콘솔을 찾지 못해서 변수를 제대로 전달하지 못하여 발생하는 오류입니다. launch.json 파일 생성 후 console 위치를 명시하여 문제를 해결했습니ㅏㄷ. 문제 해결은 다음 [링크](https://stackoverflow.com/questions/61817528/vscode-no-debug-adapter-can-not-send-variables/64934429#64934429)를 참고했습니다. 

우선 아래의 create a launch.json file 버튼을 클릭합니다.

<p><img src="/assets/images/24081701/01.png" /></p>

그러면 다음과 같이 launch.json 파일이 생성됩니다.

<p><img src="/assets/images/24081701/03.png" /></p>

해당 파일에 `"console": "integratedTerminal"` 를 추가하여 출력을 전달할 콘솔을 명시합니다.

<p><img src="/assets/images/24081701/04.png" /></p>

이후 디버깅을 다시 시도하면 아래와 같이 디버깅이 정상적으로 이뤄지는 것을 확인할 수 있습니다.

<p><img src="/assets/images/24081701/05.png" /></p>
