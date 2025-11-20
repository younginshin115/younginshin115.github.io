---
title:  "[Unzip] bad zipfile offset (local header sig) 문제 해결"
excerpt: "zip, z01, z02등 여러 파일로 분할 압축된 파일을 unzip할 때 bad zipfile offset (local header sig) 오류 메세지가 뜨면서 정상적으로 압축 해제가 되지 않는 문제 해결"

toc: false
toc_sticky: false

categories:
  - Debug
tags:
  - Debug
  - Unzip
  - Linux
last_modified_at: 2025-11-20T06:06:00
---

팀에서 공개 데이터셋을 사용할 일이 있었습니다. 해당 데이터셋은 크기가 크다보니 zip, z01, z02 등 분할 압축되어있었는데 해당 데이터셋을 압축해제하던 팀원분께서 제게 SOS를 보내셨습니다. 모든 파일을 정상적으로 다운로드받고 압축해제를 하려고 하는데 파일이 정상적으로 해제되지 않는 다는 말이었습니다.

제가 파일을 전달 받아 `unzip`으로 풀어보니 아래와 같은 에러 메세지가 발생했습니다.

```bash
file #1: bad zipfile offset (local header sig): 4
```

<p><img src="/assets/images/251120/01.png" /></p>

zip 파일 내부의 목차 정보가 깨져있어서 발생한 오류였습니다. zip 파일에는 기본적으로 다음 두 메타정보를 포함하고 있습니다. 바로 각 파일의 식별자인 `Local file header`와 `Central directory`, 즉 이 식별자를 모아둔 목차입니다. unzip할 때는 보통 zip 끝 부분에서 `Central directory`(목차)를 읽고 그 목차에 적힌 offset 위치로 이동해 해당 파일의 식별자, `Local file header`를 찾습니다. 그리고 거기서 부터 실제 데이터를 읽기 시작하는 것입니다. 

그런데 이 파일은 unzip 과정에서 읽어드린 offset 위치에서 원하는 헤더를 찾을 수 없었기 때문에 오류가 발생한 것입니다. 쉽게 말해서 파일이 깨진것이죠. 

이럴때 문제는 간단합니다. 파일을 복구 옵션인 `-F`(`--fix`)와 함께 다시 압축하면 문제를 해결할 수 있습니다. 이 옵션을 사용하면 기존 zip 파일에 있던 `Central directory`는 무시하고 파일 전체를 쭉 스캔하여 실제 `local header`의 위치를 찾아 그 목차를 갖고 있는 새로운 zip 파일을 생성하는 것입니다. `--out` 뒤에는 새로운 zip 파일의 이름을 적는데, 어떤 이름도 상관 없습니다. 저는 편의 상 `-large`라는 surfix를 붙여 생성했습니다.

```bash
zip -F DS1_cam2.zip --out DS1_cam2-large.zip
```

<p><img src="/assets/images/251120/02.png" /></p>

이렇게 생성된 zip 파일을 해제하면 이번에는 정상적으로 해제되는 것을 확인할 수 있습니다. 

<p><img src="/assets/images/251120/03.png" /></p>
<p><img src="/assets/images/251120/04.png" /></p>


팀원분께도 이 명령어를 공유드렸고, 정상적으로 압축을 해제하여 데이터를 사용할 수 있었습니다. 간단한 옵션인데 익숙하지 않으면 떠올리기 어려운 옵션이라서 같은 문제를 겪고 있는 분들께 공유하고자 포스트를 작성합니다.
