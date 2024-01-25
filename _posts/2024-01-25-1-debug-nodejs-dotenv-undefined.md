---
title:  "[Debug][NodeJS] 240126 Node.js에서 dotenv 패키지를 사용하여 환경 변수를 불러올 때 발생한 TypeError: Cannot read properties of undefined 이슈 해결"
excerpt: "NodeJS에서 dotenv 패키지를 사용하여 환경 변수를 불러올 때 발생한 TypeError: Cannot read properties of undefined 이슈 해결"

toc: false
toc_sticky: false

categories:
  - Debug
tags:
  - Debug
  - Node.js
  - dotenv
  - Windows
last_modified_at: 2024-01-25T06:08:00
---

최근에는 **Node.js 백엔드 개발자 되기**라는 책으로 Node.js로 백엔드를 작성하는 방법을 공부하고 있습니다. Node.js에서 MongoDB에 연결하는 예제코드를 실행하던 중 아래와 같은 오류가 발생했습니다.

<p><img src="/assets/images/24012601.png" /></p>

<p class="error_msg">
  C:\Program Files\nodejs\node.exe .\24_nodejs_backend\chapter6\try-mongo\test-connection.js
  Uncaught TypeError TypeError: Cannot read properties of undefined (reading 'startsWith')
</p>

기초 단계의 예제 코드였기 때문에 책에서는 MongoDB 연결 URL을 인라인으로 명시 후 사용하였으나 해당 URL에 계정 정보가 포함되어있었기 때문에 저는 예제 코드를 .env 파일을 사용하는 방식으로 변경하여 진행하면서 발생한 문제였습니다. 제가 수정한 코드중 오류가 발생한 부분은 다음과 같습니다.

{% highlight javascript linenos %}
require('dotenv').config()

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
{% endhighlight %}

.env 파일이 프로젝트 폴더의 root 경로에 있었지만 읽어오지 못해서 발생하는 오류였습니다. 다음 [링크](https://stackoverflow.com/a/54167614)를 참고하여 .env 파일의 경로를 명시했더니 문제가 해결되었습니다. 

<p><img src="/assets/images/24012602.png" /></p>

아래는 수정한 코드입니다.

{% highlight javascript linenos %}
const path = require("path")
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB;

// 아래는 동일
{% endhighlight %}

