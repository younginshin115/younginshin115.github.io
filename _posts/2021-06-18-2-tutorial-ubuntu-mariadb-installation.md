---
title:  "[Tutorial][MariaDB] Ubuntu에 MariaDB 설치하기"
excerpt: "Ubuntu에 MariaDB 설치하기"

toc: false
toc_sticky: false

categories:
  - Tutorial
tags:
  - Tutorial
  - Ubuntu
  - MariaDB
last_modified_at: 2021-06-18T16:33:00
---

[1] 패키지를 업데이트합니다.
{% highlight shell linenos %}
sudo apt update && sudo apt-get -y upgrade
{% endhighlight %}
<p class="code_img"><img src="/assets/images/21090719.png" /></p>

[2] MariaDB를 설치합니다.
{% highlight shell linenos %}
sudo apt-get install -y mariadb-server mariadb-client
{% endhighlight %}
<p class="code_img"><img src="/assets/images/21090720.png" /></p>

[3] MariaDB 계정과 보안을 설정합니다.
{% highlight shell linenos %}
sudo mysql_secure_installation
{% endhighlight %}
<p class="code_img"><img src="/assets/images/21090721.png" /></p>

현재 비밀번호를 물어보는 경우 첫 접속이므로 그냥 엔터를 치고 넘어갑니다.
<p class="code_img"><img src="/assets/images/21090722.png" /></p>

Root 비밀번호를 설정하겠냐는 질문이 나오면 Y를 입력하고 원하는 비밀번호를 입력합니다.
<p class="code_img"><img src="/assets/images/21090723.png" /></p>

익명 접속을 허용할지 물어보는 질문입니다. 이번 설치 때는 익명 접속을 허용하지 않을 예정이므로 Y를 입력했습니다.
<p class="code_img"><img src="/assets/images/21090724.png" /></p>

원격 접속을 허용할지 물어보는 질문입니다. 이번 설치때는 허용하기 위해 n을 입력했습니다.
<p class="code_img"><img src="/assets/images/21090725.png" /></p>

다음은 Test DB를 지울지 물어보는 질문입니다. 원하는 대로 선택합니다.
<p class="code_img"><img src="/assets/images/21090726.png" /></p>

지금 설정한 내용을 바로 적용할지 물어보는 질문입니다. Y를 선택합니다.
<p class="code_img"><img src="/assets/images/21090727.png" /></p>

그러면 설정이 완료됩니다.
<p class="code_img"><img src="/assets/images/21090728.png" /></p>

[4] 아래 명령어를 입력하고 비밀번호를 입력해서 MariaDB에 접속합니다.
{% highlight shell linenos %}
sudo mysql -u root -p
{% endhighlight %}
<p class="code_img"><img src="/assets/images/21090729.png" /></p>

[5] root 계정은 접근이 제한적이므로 사용할 계정을 생성합니다.
{% highlight sql linenos %}
CREATE USER '아이디'@'%' IDENTIFIED BY '비밀번호';
{% endhighlight %}
<p class="code_img"><img src="/assets/images/21090730.png" /></p>

[6] 만든 계정에 권한을 부여합니다.
{% highlight sql linenos %}
GRANT ALL PRIVILEGES ON *.* TO '아이디'@'%' WITH GRANT OPTION;
{% endhighlight %}
<p class="code_img"><img src="/assets/images/21090731.png" /></p>

[7] 권한을 활성화합니다.
{% highlight sql linenos %}
FLUSH PRIVILEGES;
{% endhighlight %}
<p class="code_img"><img src="/assets/images/21090732.png" /></p>

이제 새로 생성한 계정으로 접속하면 사용할 수 있습니다.
<p class="code_img"><img src="/assets/images/21090733.png" /></p>