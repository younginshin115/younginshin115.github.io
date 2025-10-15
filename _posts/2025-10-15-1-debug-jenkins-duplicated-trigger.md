---
title:  "[Jenkins] GitHub Webhook이 PR Merge 후 두 번 트리거되는 문제 해결"
excerpt: "Jenkins에서 GitHub Webhook을 사용할 때, PR Merge 후 파이프라인이 중복 실행되는 문제를 분석하고 해결한 과정"

toc: true
toc_sticky: true

categories:
  - Debug
tags:
  - Debug
  - Jenkins
  - GitHub
  - GitHub Webhook
last_modified_at: 2025-10-15T05:57:00
---

현재 Jenkins를 사용해 자동 배포 파이프라인을 구축하여 운영중입니다. Main 브랜치에 push가 발생하면 Github Webhook을 통해 Production 환경의 Jenkins 파이프라인이 자동으로 실행되어 배포가 진행됩니다. Main 브랜치는 PR을 통해서만 변경되도록 제한해 두었기 때문에, PR이 merge될 때 자동 배포가 트리거되는 구조입니다.

### 문제 정의 

그런데 PR merge 후 파이프라인이 두번 트리거가 되는 문제가 있었습니다. 아래 스크린샷과 같이 실제 변경 사항을 담고 포함한 트리거와 아무런 변경 사항이 없는 빈 트리거가 약 5-10초 간격으로 연달아 발생했습니다. 

현재 Docker build 방식을 사용해 배포하고 있기 때문에 변경 사항이 없는 두번째 파이프라인이 수행되어도 서비스에 직접적인 영향은 업었습니다. 하지만 리소스를 불필요하게 사용하고 대용량 빌드가 진행될 경우 서버 부하로 인해 예기치 못한 문제가 발생할 수 있어 원인을 분석하고 문제를 해결하기로 했습니다.

<p><img src="/assets/images/251015/01.png" /></p>

### 원인 분석

짐작되는 원인은 있었습니다. Main 브랜치에 PR이 머지가 되고 나면 Develop 브랜치를 최신으로 유지하기 위해 Main 브랜치의 변경사항을 Develop 브랜치로 자동으로 merge하는 GitHub Action을 설정해놓았습니다. 이 GitHub Action이 수행되면서 웹훅 이벤트가 발생하며 Jenkins 파이프라인을 트리거한 것이 아닐까 의심되었습니다.

레포지토리의 Settings > Webhooks로 들어가서 원하는 웹훅을 클릭하면 해당 웹훅의 Manage webhook 페이지로 연결됩니다. Manage webhook에서는 웹훅의 설정을 변경하고 수행 기록을 확인할 수 있습니다. 

<p><img src="/assets/images/251015/02.png" /></p>

여기서 Recent Deliveries 탭을 클릭하여 웹훅 호출 이력을 확인했습니다. 아래와 같이 11초의 간격을 두고 두개의 트리거가 발생한 것을 확인할 수 있었습니다. 

<p><img src="/assets/images/251015/03.png" /></p>

두번째 수행기록을 열어보니 아니나 다를까 pusher가 GitHub Action bot이었습니다. 짐작했던 원인이 맞았습니다.

<p><img src="/assets/images/251015/04.png" /></p>

### 문제 해결 1 - Jenkins Pipeline Option 설정

우선 Jenkins 파이프라인의 옵션을 설정했습니다.

```
pipeline {
    agent any
    options {
        // Prevent duplicate triggers within a short interval
        disableConcurrentBuilds()
        quietPeriod(15)
    }
…
}
```

첫번째 `disableConcurrentBuilds()` 옵션은 파이프라인의 동시 실행을 방지하는 옵션입니다. 두번째 `quietPeriod()` 옵션은 지정된 시간(초) 내로 들어오는 여러 요청을 하나의 요청으로 합쳐 처리하겠다는 옵션입니다. 저는 15초로 설정했습니다.

이제 이렇게 기본적인 안전 장치를 마련해두었으니, 실제 원인을 해결해보겠습니다.

### 문제 해결 2 - GitHub Webhook 설정 변경 (실패)

Manage webhook 페이지를 확인하니 `Which events would you like to trigger this webhook?` 섹션에서 웹훅 이벤트가 발생하는 조건을 설정할 수 있었습니다. 

<p><img src="/assets/images/251015/05.png" /></p>

해당 섹션의 모든 옵션을 확인했지만, 안타깝게도 PR merge만 특정할 수 있는 옵션이 없었습니다. 웹훅 설정만으로는 문제를 해결할 수 없었으므로 Jenkins 파이프라인 단에서 조건을 제어하는 방향으로 전환하기로 했습니다.

### 문제 해결 3 - Jenkins Pipeline When 조건 설정

실제 변경사항이 담긴 트리거와 빈 트리거를 비교하기 위해서는 구분할 수 있는 조건이 필요했습니다.

다시 Manage webhook의 Recent Deliveries로 돌아와서 두 수행 내역의 Payload를 비교했습니다. GitHub Webhook Payload에는 `ref`라는 항목이 있습니다. 해당 커밋이 어디서 벌어졌는가를 나타냅니다. 첫번째 웹훅 이벤트 (실제 변경 사항 포함)의 `ref`는 main 브랜치였습니다.

<p><img src="/assets/images/251015/06.png" /></p>

두번째 웹훅 이벤트 (빈 이벤트)의 `ref`는 develop 브랜치였습니다. 

<p><img src="/assets/images/251015/07.png" /></p>

그렇다면 이 브랜치를 기준으로 Jenkins 파이프라인에서 분기 처리를 하면 되겠다는 생각을 했습니다. 다행히 Jenkins에는 [when](https://www.jenkins.io/doc/book/pipeline/syntax/#when)이라는 옵션이 있습니다. 각 스테이지에 `when { branch 'main' }`을 선언하면, 트리거는 발생하더라도 main 브랜치가 아닐 경우 빌드는 실행되지 않습니다.

<p><img src="/assets/images/251015/08.png" /></p>

### 결론

`disableConcurrentBuilds()`와 `quietPeriod()` 옵션으로 혹시 모를 중복 실행을 방지하고, `when { branch 'main' }` 조건을 통해 main 브랜치가 아닐 경우 빌드가 수행되지 않도록 설정했습니다. 앞서 정의했던 반복된 빌드로 인한 불필요한 리소스 사용과 서버 부하 위험이 모두 해소되었고, 설정 이후 파이프라인이 안정적으로 동작하는 것도 확인했습니다.