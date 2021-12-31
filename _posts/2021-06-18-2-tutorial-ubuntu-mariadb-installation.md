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

[1] 패키지를 업데이트한다.
```
sudo apt update && sudo apt-get -y upgrade
```
<p class="code"><img src="/assets/images/21090719.png" /></p>

[2] MariaDB를 설치한다.
```
sudo apt-get install -y mariadb-server mariadb-client
```
<p class="code"><img src="/assets/images/21090720.png" /></p>

[3] MariaDB 계정과 보안을 설정한다.
```
sudo mysql_secure_installation
```
<p class="code"><img src="/assets/images/21090721.png" /></p>

현재 비밀번호를 물어보는 경우 첫 접속이므로 그냥 엔터를 치고 넘어간다.
<p class="code"><img src="/assets/images/21090722.png" /></p>

Root 비밀번호를 설정하겠냐는 질문이 나오면 Y를 입력하고 원하는 비밀번호를 입력한다.
<p class="code"><img src="/assets/images/21090723.png" /></p>

익명 접속을 허용할지 물어보는 질문이다. 지금은 익명 접속을 허용하지 않을 거니까 Y를 입력한다.
<p class="code"><img src="/assets/images/21090724.png" /></p>

원격 접속을 허용하지 않겠냐고 물어보면 원하는 대로 선택한다. 지금은 허용하기 위해 n을 입력한다.
<p class="code"><img src="/assets/images/21090725.png" /></p>

다음은 Test DB를 지울지 물어보는 질문이므로 원하는 대로 선택한다.
<p class="code"><img src="/assets/images/21090726.png" /></p>

지금 설정한 내용을 바로 적용할지 물어보면 Y를 선택한다.
<p class="code"><img src="/assets/images/21090727.png" /></p>

그러면 설정이 완료된다.
<p class="code"><img src="/assets/images/21090728.png" /></p>

[4] 아래 명령어를 입력하고 비밀번호를 입력해서 MariaDB에 접속한다.
```
sudo mysql -u root -p
```
<p class="code"><img src="/assets/images/21090729.png" /></p>

[5] root 계정은 접근이 제한적이므로 사용할 계정을 생성한다.
```
CREATE USER '아이디'@'%' IDENTIFIED BY '비밀번호';
```
<p class="code"><img src="/assets/images/21090730.png" /></p>

[6] 만든 계정에 권한을 부여한다.
```
grant all privileges on *.* to '아이디'@'%' with grant option;
```
<p class="code"><img src="/assets/images/21090731.png" /></p>

[7] 권한을 활성화시킨다.
```
flush privileges;
```
<p class="code"><img src="/assets/images/21090732.png" /></p>

이제 새로 생성한 계정으로 접속하여 사용하면 된다.
<p class="code"><img src="/assets/images/21090733.png" /></p>