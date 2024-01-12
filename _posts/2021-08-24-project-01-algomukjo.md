---
title:  "[Project] 머신러닝 기반 웹서비스 '알고먹조' 개발 프로젝트"
excerpt: "한양대학교 SW융합교육원 PBL 빅데이터 전문가 양성 과정 중간 프로젝트"

toc: true
toc_sticky: true

categories:
  - Project
tags:
  - Profile
last_modified_at: 2021-08-24T19:23:00
---

<br>

# 머신러닝 기반 웹서비스 '알고먹조' 개발

## 프로젝트 개요

<img src="/assets/images/projects/1.jpg" />

### 기간
2021.5.31~2021.6.4

### 인원
5명

### 설명
이미지와 식품 영양 정보 DB를 구축하고 이미지 데이터를 학습한 머신러닝 API와 DB를 웹에 연결하여 사진이나 키워드로 영양정보를 손쉽게 검색하는 웹서비스 ‘알고먹조’ 개발하는 프로젝트입니다.

### 서비스 소개

|이미지 검색 기능|범위 검색 기능|키워드 검색 기능|
|:---:|:---:|:---:|
|<img src="/assets/images/projects/mini1.GIF" />|<img src="/assets/images/projects/mini2.GIF" />|<img src="/assets/images/projects/mini3.GIF" />|
|이미지를 업로드하면 ML 분석하여 식품 영양 정보 제공|영양 성분 종류를 선택하고 범위를 지정하면 조건에 맞는 식품 영양 정보 제공|제품명, 제조사, 종류 등 키워드를 입력하면 조건에 맞는 식품 영양 정보 제공|

## 담당 역할
PM, 실시간 데이터 파이프라인 구축, ML 학습, 웹개발

### 역할1 실시간 데이터 파이프라인 구축
---
머신러닝에 사용할 이미지 URL 데이터를 Selenium으로 스크레이핑 후 Kafka를 통해 Spark에 전송해 Spark Streaming으로 전처리 하여 MariaDB에 적재하는 실시간 데이터 파이프라인을 구축했습니다.

<img src = "/assets/images/projects/3.png" />

<b>코드 보기(Github)</b>

- [스크레이핑하여 Kafka에 전송하는 Python 코드](https://github.com/younginshin115/21_hyu_algomeokjo/blob/master/scraping.ipynb)
- [Kafka를 통해 전송된 데이터를 Spark Streaming으로 MariaDB에 적재하는 Scala 코드](https://github.com/younginshin115/21_hyu_algomeokjo/blob/master/StreamingSpark.scala)

### 역할2 ML 학습
---
MariaDB에 적재된 이미지 URL 데이터를 이용해 Azure Custom Vision 모델을 학습시켰습니다.

<b>코드 보기(Github)</b>

- [Azure Custom Vision 모델 학습하는 Python 코드](https://github.com/younginshin115/21_hyu_algomeokjo/blob/master/Custom_vision.ipynb)

### 역할3 웹개발
---
Python Flask로 세가지 검색 기능을 포함한 웹 서비스를 개발했습니다. 프론트엔드와 백엔드를 모두 담당했습니다.
- 식품 사진을 업로드하면 학습된 Azure Custom Vision API를 사용하여 사진 분석 후 예측된 식품명을 기반으로 MariaDB에 적재된 식품 영양 정보를 불러오는 사진 검색 기능
- 영양 성분 종류를 선택하고 범위를 지정하면 조건에 맞는 식품 영양 정보를 불러오는 범위 검색 기능
- 제품명, 제조사, 종류 등 키워드를 입력하면 조건에 맞는 식품 영양 정보를 불러오는 키워드 검색 기능

<b>코드 보기(Github)</b>

- [Flask Web 코드](https://github.com/younginshin115/21_hyu_algomeokjo/tree/master/Web)

## 저장소
<a href="https://github.com/younginshin115/21_hyu_algomeokjo">https://github.com/younginshin115/21_hyu_algomeokjo</a>

## 문제 해결, 개선 사례

### 1. 학습용 이미지 데이터 수집 시 저장소 부족 문제 해결
 
Azure의 Custom Vision을 학습시킬 때 보편적으로 학습에 필요한 이미지를 다운로드 받은 후 파일시스템으로 불러와 사용합니다. 하지만 단 한 번 이뤄지는 학습을 위해 이미지를 저장하는 과정이 불필요하다고 느꼈고 태그 수가 늘어날 경우 저장소 부족으로 이어질 수 있다고 생각했습니다. 그래서 이미지가 아닌 URL을 사용해서 학습하는 방법은 없는지 탐색했습니다. 그 결과 공식 홈페이지에서 관련 모듈을 발견할 수 있었습니다. 다만 모듈의 사용 방법이 공식 홈페이지 뿐만 아니라 어디에도 나와있지 않아 모듈을 사용할 때 어려움이 있었지만 매개변수의 이름으로 추측하여 여러가지 방법을 시도한 결과 URL로 학습하는 데 성공할 수 있었습니다.

### 2. 기타 문제

- 검색할 때 Header와 별개로 위의 검색바를 계속 유지하고 싶었습니다. 검색을 통해 발견한 템플릿 상속(Extends, block contents, endblock) 기능을 사용하여 해결했습니다.
- 데이터 스크레이핑 후 Kafka로 전송할 때 지나치게 시간이 많이 소요되는 문제가 발생했습니다. 분석결과 한글인 태그의 encoding에 시간이 많이 소요되는 것을 발견했습니다. 한글인 태그를 숫자인 인덱스로 대체하여 Kafka 전송 시간을 단축시켰습니다.
