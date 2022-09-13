---
title:  "[Tutorial][Airflow] 220913 Kubernetes Dashboard 연결"
excerpt: "Kubernetes Web UI Dashboard 연결"

toc: false
toc_sticky: false

categories:
  - Tutorial
tags:
  - Tutorial
  - Kubernetes
  - Dashboard
last_modified_at: 2022-07-19T19:39:00
---

Kubernetes Web UI Dashboard를 연결합니다. Kubernetes 공식 홈페이지의 튜토리얼 <a href="https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/" target="_blank">Deploy and Access the Kubernetes Dashboard</a>와 공식 Github 문서 <a href="https://github.com/kubernetes/dashboard/blob/master/docs/user/access-control/creating-sample-user.md" target="_blank">creating-sample-user</a>를 참고했습니다.

이 튜토리얼을 따라하기 위해서는 두가지가 필요합니다. 두가지 모두 설치되어 있고 실행 중이라는 가정하에 진행하겠습니다.
1. Docker
2. Kubernetes

<br/>
Kubernetes의 Web UI Dashboard는 기본으로 제공되지 않으므로 사용하기 위해서는 따로 설정해야합니다. 아래 명령어로 Kubernetes에 Dashboard를 적용합니다.

{% highlight bash linenos %}
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.6.1/aio/deploy/recommended.yaml
{% endhighlight %}

<p><img src="/assets/images/22091301.png" /></p>

<br/>
샘플 유저를 생성합니다. Kubernetes-dashboard 네임스페이스에 Service Account를 등록하기 위해 dashboard-adminuser.yaml 파일을 생성합니다.
{% highlight bash linenos %}
vi dashboard-adminuser.yaml
{% endhighlight %}

<p><img src="/assets/images/22091302.png" /></p>

<br/>
안의 내용은 아래와 같이 적습니다.
{% highlight yaml linenos %}
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard
{% endhighlight %}

<p><img src="/assets/images/22091308.png" /></p>

<br/>
이제 이 파일을 kubernetes에 적용합니다.
{% highlight bash linenos %}
kubectl apply -f dashboard-adminuser.yaml
{% endhighlight %}

<p><img src="/assets/images/22091303.png" /></p>

<br/>
다음으로 생성한 유저의 역할을 설정합니다. 그러기 위해 아까 생성했던 파일을 수정하겠습니다.
>샘플 유저는 모든 권한을 갖고 있으므로 실제 서비스에 사용할 때는 보안을 위해 추후 필요한 권한만 가진 새로운 계정을 생성하는 것을 권장합니다.
{% highlight bash linenos %}
vi dashboard-adminuser.yaml
{% endhighlight %}

<p><img src="/assets/images/22091302.png" /></p>

<br />
파일의 내용을 아래와 같이 수정합니다.
{% highlight yaml linenos %}
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kubernetes-dashboard
{% endhighlight %}

<p><img src="/assets/images/22091307.png" /></p>

<br />
수정한 파일의 내용을 Kubernetes에 적용합니다.

{% highlight bash linenos %}
kubectl apply -f dashboard-adminuser.yaml
{% endhighlight %}

<p><img src="/assets/images/22091304.png" /></p>

<br />
계정 생성과 역할 부여를 모두 마쳤으면 Bearer Token을 발급받습니다. 이 Token은 Dashboard에 접근할 때 사용합니다.

{% highlight bash linenos %}
kubectl -n kubernetes-dashboard create token admin-user
{% endhighlight %}

<p><img src="/assets/images/22091309.png" /></p>

<br />
이제 Dashboard를 활성화합니다.

{% highlight bash linenos %}
kubectl proxy
{% endhighlight %}

<br />
이제 http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/ 주소로 접속하면 
아래와 같이 Token을 입력하는 창이 나타납니다.

<p><img src="/assets/images/22091306.png" /></p>

<br />
옵션 중 Token을 선택하고 아까 발급받았던 Token을 입력하면 Kubernetes Dashboard에 접속할 수 있습니다.

<p><img src="/assets/images/22091310.png" /></p>
