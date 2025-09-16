---
title:  "[Jenkins] Jenkins에서 git fetch 해올 때 발생하는 not in a git directory 오류 해결"
excerpt: "Jenkins에서 git fetch 해올 때 발생하는 not in a git directory 오류 해결"

toc: false
toc_sticky: false

categories:
  - Debug
tags:
  - Debug
  - Jenkins
last_modified_at: 2024-11-09T20:01:00
---

Jenkins에서 프로젝트 repository의 main branch에 merge가 있을 때 자동으로 pull 해와서 build를 하는 자동 CI/CD 파이프라인을 구축했습니다. 그간 잘 되던 파이프라인이 갑자기 'not in a git directory'라는 오류를 발생시키며 작동하지 않았습니다.

<p><img src="/assets/images/241109/01.png" /></p>

검색을 통해 github credential도 바꿔보고 jenkins home의 권한도 바꿔봤지만 해결되지 않았습니다. workspace가 깨진거라서 새로 생성하면 된다는 이야기를 듣고 아래 명령어로 jenkins_home안의 workspace를 지우고 (혹시 몰라서 mv를 사용하었으나 rm을 사용해도 같은 결과를 가져올 것 같습니다.) 다시 run을 했더니 새로운 workspace 폴더가 생성되며 정상 작동하였습니다.

{% highlight shell linenos %}
mv workspace workspace2
{% endhighlight %}

<p><img src="/assets/images/241109/02.png" /></p>
