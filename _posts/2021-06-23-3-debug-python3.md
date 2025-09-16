---
title:  "[Python] OSError: cannot open resource"
excerpt: "ML 기반 챗봇 Javas 개발기3"

toc: false
toc_sticky: false

categories:
  - Debug
tags:
  - Debug
  - Python
  - Flask
  - Javas
last_modified_at: 2021-06-23T14:16:00
---

<br>
ML 기반 챗봇을 개발 중이었습니다.
웹 프레임워크로는 Python 기반의 Flask를 선택하였고 모듈식으로 개발 중이었습니다.
워드클라우드 모듈을 사용할 때 아래와 같은 오류가 발생하였습니다.

<p class="error_msg">OSError: cannot open resource</p>
<img src="/assets/images/21091306.png" width="600px" />

### 문제의 원인
Font의 경로를 모듈 파일을 기준으로 작성했는데 이것이 문제였습니다.<br>
모듈을 import한 파일 위치를 기준으로 실행되기 때문에 Font를 찾을 수 없어서 오류가 발생한 것이었습니다.<br>
import한 파일을 기준으로 코드를 재작성하였더니 해결되었습니다.

### 수정 전
module 파일, c_wordcloud.py 파일 기준으로 상위 파일로 올라가서 static 폴더로 들어가는 방식으로 작성하였습니다.

<img src="/assets/images/21091307.png" />

### 수정 후
이 모듈을 import 해서 사용하는 chatbot.py 파일 기준으로 현재 경로에서 static 폴더로 들어가는 방식으로 수정하였습니다.

<img src="/assets/images/21091308.png" />
