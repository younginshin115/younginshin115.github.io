---
title: "[GCS] Google Cloud Storage에서 1depth 디렉토리만 가져오기"
excerpt: "디렉토리 구조가 아닌 Object Storage, Google Cloud Storage에서 prefix랑 delimiter를 이용해서 1depth 디렉토리만 가져오는 방법"

toc: true
toc_sticky: true

categories:
  - Tutorial
tags:
  - Tutorial
  - Google Cloud Storage
  - GCS
  - Python
last_modified_at: 2025-11-13T05:46:00
---

현재 데이터 저장소로 Google Cloud Storage (GCS)를 사용하고 있습니다. 현재 운영하고 있는 플랫폼이 데이터, 모델 관리 플랫폼이다 보니 유저에게 폴더 선택 옵션을 주거나, 파일 트리를 구성하거나, 데이터 처리 파이프라인에서 데이터 집계를 할 때 상위 폴더 단위로 묶어야 하는 상황이 종종 발생합니다. 

만약 리눅스와 같은 전통적인 디렉터리 구조라면 `ls -al`과 같은 명령어로 손 쉽게 1 depth 디렉토리 목록을 가져올 수 있습니다. 하지만 GCS에서는 불가능합니다. GCS는 전통적인 디렉토리 구조가 아니기 때문입니다.

GCS는 오브젝트 스토리지입니다. 편의상 디렉토리처럼 표시하고 있을 뿐 '/' 문자를 포함한 여러 오브젝트가 flat하게 존재하는 스토리지입니다. 그러다보니까 같은 레벨의 디렉토리라는 개념 자체가 존재하지 않습니다. 모든 오브젝트가 같은 레벨에 존재하고 있기 때문이죠.

하지만 `prefix`와 `delimiter`를 사용하면 GCS도 디렉토리 구조처럼 활용하여 1 depth의 디렉토리명만 가져올 수 있습니다.

## prefix와 delimiter 작동 원리

`prefix`를 사용하면 오브젝트의 이름이 해당 문자열로 시작하는 오브젝트를 나열할 수 있습니다.

```python
from google.cloud import storage

client = storage.Client()
bucket = client.get_bucket("my-bucket")

for blob in bucket.list_blobs(prefix="data/"):
    print(blob.name)
```

위와 같이 `data/`를 prefix로 오브젝트를 나열하면 아래와 같은 결과를 얻을 수 있습니다.

```bash
data/a.csv
data/raw/b.csv
data/raw/c.csv
data/processed/d.csv
```

이처럼 `prefix`가 어디서부터 탐색할지를 정한다면 `delimiter`는 탐색 범위를 무엇으로 볼 지를 정합니다. 예를 들어 `prefix`를 아까와 같이 `data/`로 정하고 `delimiter`를 기본 값인 `/`로 정하면 `data/` 이후 가장 처음 만나는 `/`까지를 한 단위로 봅니다. 그래서 `data/` 바로 아래의 파일만 출력하고 다음 만나는 `/`까지를 하위 디렉토리처럼 구분합니다.

```python
from google.cloud import storage

client = storage.Client()
bucket = client.get_bucket("my-bucket")

blobs = bucket.list_blobs(prefix="data/", delimiter="/")

print("===== data/ 하위 파일 =====")
for blob in blobs:
    print("file:", blob.name)

print("===== data/ 하위 디렉토리 =====")
for prefix in blobs.prefixes:
    print("prefix:", prefix)
```

위 코드의 결과값은 아래와 같이 나옵니다.

```bash
===== data/ 하위 파일 =====
file: data/a.csv
===== data/ 하위 디렉토리 =====
prefix: data/raw/
prefix: data/processed/
```

이처럼 두 옵션을 함께 사용하면 GCS의 flat한 object 구조를 폴더 계층처럼 탐색할 수 있습니다.

## Python을 사용해서 1depth 디렉토리만 불러오기

앞서 살펴본 `prefix`와 `delimiter`를 사용해서 1depth 디렉토리만 불러오는 함수를 직접 코드로 구현해보겠습니다. 제가 실제로 유틸로 구현해놓고 사용하고 있는 함수입니다. 

```python
from google.cloud import storage

def list_1depth_directories(bucket_name, prefix=None):
    """
    List only 1-depth directories under the given prefix in a GCS bucket.

    Args:
        bucket_name (str): GCS bucket name
        prefix (str, optional): Directory prefix (e.g., 'data/'). Default is None.

    Returns:
        list[str]: List of top-level directory prefixes (ending with '/')
    """
    client = storage.Client()
    bucket = client.bucket(bucket_name)
    blobs = bucket.list_blobs(prefix=prefix, delimiter='/')

    directories = set()  # avoid duplicates
    for page in blobs.pages:
        directories.update(page.prefixes)  # collect prefixes from all pages

    return sorted(directories)


# Example usage
bucket_name = "my-bucket"
dirs = list_1depth_directories(bucket_name, prefix="data/")
print(dirs)
```

예를 들어 위의 `my-bucket`이 아래와 같은 구조를 가졌다고 가정해봅시다.
```bash
data/raw/a.csv
data/processed/b.csv
data/processed/sub/c.csv
logs/app.log
```

그렇다면 호출 결과는 아래와 같이 나옵니다.

```bash
['data/processed/', 'data/raw/']
```

이렇게 `prefix`와 `delimiter`를 잘 조합해서 사용하면 GCS와 같은 오브젝트 기반의 스토리지에서도 디렉토리 단위로 데이터를 탐색하거나 집계할 수 있습니다.