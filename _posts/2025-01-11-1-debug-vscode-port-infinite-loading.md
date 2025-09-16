---
title: "[VScode] Visual Studio Code에서 개발 서버를 실행했을 때 무한 로딩 이슈 해결"
excerpt: "Visual Studio Code에서 npm start로 localhost:3000에서 애플리케이션을 실행했을 때 무한 로딩되며 해당 포트로 접속이 되지 않는 문제 해결"

toc: false
toc_sticky: false

categories:
  - Debug
tags:
  - Debug
  - Visual Studio Code
  - VScode
last_modified_at: 2025-1-11T18:08:00
---

Visual Studio Code를 이용해서 웹 페이지를 개발 중입니다. npm start로 개발 서버를 실행했을 때 무한 로딩되며 해당 포트로 접속이 되지 않는 오류가 발생했습니다. 이때는 아예 해당 창을 끄고 접속하면 정상적으로 접속이 가능했지만 매번 그렇게 재접속하기는 번거로웠습니다. 해당 문제는 이전에 해당 포트를 사용하던 애플리케이션이 정상적으로 종료되지 않았을 때 발생했습니다. 그래서 Visual Studio Code에서 확인은 되지 않지만 해당 프로세스가 여전히 해당 포트를 점유하고 있을 것이라고 추측했습니다. 그래서 아래 방법으로 포트 자체를 초기화 하여 문제를 해결했습니다.

우선 Visual Studio Code에서 Ports 창에 접속합니다. 환경 설정에 따라 다르겠지만 저의 경우에는 하단 터미널창에서 확인할 수 있었습니다. 터미널 창이 보이지 않는다면 상단의 메뉴에서 [Terminal] - [New Terminal]을 누르면 확인할 수 있습니다. 해당 창에서 현재 무한 로딩되어 접속할 수 없는 포트 번호 우측에 있는 X 버튼을 클릭합니다.

<p><img src="/assets/images/25011101/01.png" /></p>

그러면 아래처럼 포트가 삭제됩니다. 저의 경우에는 포트가 해당 포트 하나밖에 없었기 때문에 전달된 포트가 없다는 안내 메세지가 보이지만 만약 다른 포트가 있다면 목록에서 삭제한 포트 번호만 사라집니다.

<p><img src="/assets/images/25011101/02.png" /></p>

이제 이 창에서 포트 전달 또는 다른 포트가 있다면, 포트 추가 버튼을 클릭해서 다시 포트를 추가합니다.

<p><img src="/assets/images/25011101/03.png" /></p>

그러면 포트가 초기화되며 해당 포트로 접속할 수 있게 됩니다.
