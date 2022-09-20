---
title:  "[Debug][Python] 210627 Process finished with exit code -1073741819 (0xC0000005)"
excerpt: "ML 기반 챗봇 Javas 개발기6"

toc: false
toc_sticky: false

categories:
  - Debug
tags:
  - Debug
  - Python
  - Flask
  - Javas
last_modified_at: 2021-06-27T22:37:00
---

<br>
ML 기반 챗봇을 개발 중이었다.<br>
웹 프레임워크로 Python 기반의 Flask를 사용하고 있었는데 Flask 서버가 별다른 에러메시지 없이 멈추는 이슈가 발생했다.<br>
로컬에서 돌려보자 아래와 같은 에러 메시지와 함께 종료되는 것을 확인했다.<br>

<p class="error_msg">Process finished with exit code -1073741819 (0xC0000005)</p>

추가했던 코드는 채팅 메시지를 실시간으로 형태소 분석하여 워드클라우드를 생성하는 코드였는데 웹과 별도로 실행했을 때는 문제 없이 실행되는 것을 확인했다. 하지만 웹에 결합시키면 오류가 발생하는 것이었다.<br>

### 1차 시도 PyQt compatible 비활성화 > 실패

<a href="https://stackoverflow.com/questions/33582766/process-finished-with-exit-code-1073741515-0xc0000135">링크</a>를 참고해서 PyQt compatible을 비활성화 했지만 해결되지 않았다.

### 2차 시도 time.sleep(1) 코드 추가 > 실패
한 번에 너무 많은 데이터가 유입되면서 발생한 오류인가 하는 생각에 time.sleep(1) 코드를 삽입하여 속도를 조절했지만 해결되지 않았다.

### 3차 시도 __pycache__폴더 비우기 > 실패
__pycache__폴더에 너무 많은 데이터가 쌓여서 생긴 문제인가 하는 생각에 폴더를 비워줬지만 해결되지 않았다

### 4차 시도 가상 메모리 크기 수정 > 실패

> 0xC0000005 : access violation<br>
> 엑세스 위반(Access Violation)은, 프로세스가 접근할 권한이 없는 메모리 영역에 접근하고자 했을 때 발생합니다. 이런 경우는 대부분 메모리 할당이 되지 않은 포인터에 값을 넣었거나 할당치를 초과하여 데이터가 입력되었을 때 입니다.<br>
> (참고 : <a href="https://playlyun.tistory.com/88">https://playlyun.tistory.com/88</a>)

메모리 부족이 원인일 수 있다고 생각하여 가상 메모리 크기를 수정하였으나 해결되지 않았다. 지금와서 생각해보면 나 같은 경우 사용하는 메모리가 지나치게 커서 해결되지 않은 것일 뿐 보통 이 방법으로 해결 될 것 같다.

### 5차 시도 토큰화 모듈 비교 분석 > 실패
메모리 부족이 어느 부분에서 발생하는 지 발견하기 위해 주석 처리하면서 테스트한 결과 아래 코드에서 오류가 발생하는 것을 발견했다.
```python
wordcloud_lst.extend(ct.noun_tokenize(message.value['chat_text']))
```
토큰화 모듈인 okt를 사용하는 부분에서 메모리 부족 문제가 발생한 것이었다.<br>
다른 모듈을 시도해봤지만 모든 모듈에서 동일한 문제가 발생했다. 모듈을 바꾸는 걸로는 해결하기 어려워보였다.

### 6차 시도 코드 구조 변경 > 성공
세개의 프로세스가 동시에 돌아가는 멀티 프로세스 환경이었는데 머신러닝을 위해 스크레이핑한 채팅 메시지를 토큰화하여 Kafka로 넘기는 프로세스와 
실시간 워드클라우드 생성을 위해 채팅 메시지를 토큰화하는 프로세스, 두 군데서 모두 메모리 소모가 큰 토큰화 모듈을 사용하다보니 메모리가 넘친 것으로 추측되었다.

채팅 메시지를 토큰화하여 Kafka로 넘기는 프로세스에서 워드클라우드용 토큰화도 함께 진행하여 워드클라우드가 실행되는 부분에서는 Kafka의 메시지를 받는 방식으로 수정하자 문제가 해결되었다.

> 에러 메시지 없이 멈출 때 대응하기 위해 logging 기능도 구현하였다.