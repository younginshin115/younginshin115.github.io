---
title:  "[Python] The client is using an unsupported version of the Socket.IO or Engine.IO protocols Error"
excerpt: "ML 기반 챗봇 Javas 개발기5"

toc: false
toc_sticky: false

categories:
  - Debug
tags:
  - Debug
  - Python
  - pip
  - Javas
last_modified_at: 2021-06-24T01:53:00
---

<br>
ML 기반 챗봇을 개발 중이었습니다.
웹 프레임워크로는 Python 기반의 Flask를 선택하였고 SocketIO를 설치하자 아래와 같은 오류 메시지가 발생하였습니다.

<p class="error_msg">The client is using an unsupported version of the Socket.IO or Engine.IO protocols Error</p>

아래 참고 링크에 따라 각 패키지를 호환되는 버전으로 재 설치해주니 문제가 해결되었습니다.

{% highlight shell linenos %}
pip install --upgrade python-socketio==4.6.0
pip install --upgrade python-engineio==3.13.2
pip install --upgrade Flask-SocketIO==4.3.1
{% endhighlight %}

참고 : <a href="https://stackoverflow.com/questions/66069215/the-client-is-using-an-unsupported-version-of-the-socket-io-or-engine-io-protoco">https://stackoverflow.com/questions/66069215/the-client-is-using-an-unsupported-version-of-the-socket-io-or-engine-io-protoco</a>