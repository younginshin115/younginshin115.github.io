---
title:  "[튜토리얼][Azure Custom Speech] 210915 Azure Custom Speech 튜토리얼"
excerpt: "Azure Custom Speech 튜토리얼"

toc: True
toc_sticky: True

categories:
  - Tutorial
tags:
  - Tutorial
  - Azure
  - Custom Speech
last_modified_at: 2021-09-15T20:52:00
---

Azure에서 제공하는 <a href="https://docs.microsoft.com/ko-kr/azure/cognitive-services/speech-service/custom-speech-overview/">Custom Speech</a>를 사용하는 튜토리얼입니다.

# 01 음성 서비스 구독
Speaker Recognition 서비스를 사용하기 위해서는 Azure의 음성 서비스(Speech Services)를 구독해야합니다.<br>
만약 구독이 되어있는 분은 이 부분은 건너뛰셔도 됩니다.

1. Azure Portal에서 Cognitive Services를 검색한 뒤 선택합니다.<br><img src="/assets/images/21091501.png" />

2. Cognitive Services 서비스 목록에서 음성 서비스(Speech Service)를 찾아 만들기 버튼을 클릭합니다.<br><img src="/assets/images/21091502.png" />

3. 각 항목을 입력한 뒤 만들기 버튼을 클릭합니다. 다른 항목은 모두 자유롭게 설정 가능하지만 위치는 서비스 지원 지역을 확인해서 설정해야합니다. 그리고 가격 책정 계층의 경우 무료 F0이 가능하면 무료로 선택 해주세요. 
> 지원지역: 오스트레일리아 동부, 캐나다 중부, 인도 중부, 미국 동부, 미국 동부2, 미국 중북부, 북유럽, 미국 중남부, 동남아시아, 영국 남부, US Gov 애리조나, US Gov 버지니아, 서유럽, 미국 서부2 <br>

    <img src="/assets/images/21091503.png" />

<br>
<br>

# 02 CUSTOM SPEECH 프로젝트 생성

1. <a href="https://speech.microsoft.com/customspeech">Speech Studio</a>에 접속합니다.

2. Custom Speech의 프로젝트 시작 버튼을 클릭합니다.<br>
<img src="/assets/images/21092401.png" />

3. 구독과 리소스를 선택하고 리소스 사용 버튼을 클릭합니다<br>
<img src="/assets/images/21092402.png" width="500px" />

4. 새 프로젝트 만들기 버튼을 클릭합니다. <br>
<img src="/assets/images/21092403.png" width="500px" />

5. 프로젝트 이름과 언어를 설정하고 만들기 버튼을 클릭합니다. 테스트 및 학습에 사용할 데이터와 일치해야 합니다. <br>
<img src="/assets/images/21092404.png" />

6. 프로젝트가 생성되었습니다. 프로젝트 이름을 클릭하면 해당 프로젝트로 진입할 수 있습니다.<br>
<img src="/assets/images/21092405.png" />

<br>
<br>

# 03 학습 데이터 준비

1. 앞서 생성한 프로젝트에 들어갑니다. 프로젝트 목록은 <a href="https://speech.microsoft.com/customspeech">Speech Studio</a>의 메인 화면이나 Custom Speech 화면에서 확인할 수 있습니다. 프로젝트의 이름을 클릭하면 프로젝트로 진입합니다.

    [Speech Studio 메인 화면]
    <img src="/assets/images/21092406.png" />

    [Custom Speech 버튼을 눌렀을 때 보이는 화면]
    <img src="/assets/images/21092405.png" />

2. 데이터 업로드 버튼을 클릭합니다.<br>
<img src="/assets/images/21092407.png" />

3. 데이터 형식 선택 창에서 ‘샘플 데이터 세트 다운로드’ 버튼을 클릭합니다. 샘플 데이터는 독일어, 영어, 스페인어, 프랑스어, 이탈리아어, 일본어, 한국어, 포르투갈어, 중국어를 지원합니다.<br>
<img src="/assets/images/21092408.png" width="500px" />

4. 원하는 파일을 다운로드합니다. 학습용 데이터로는 한국어의 training 폴더의 audio-and-trans.zip 파일을 사용합니다.<br>
<img src="/assets/images/21092409.png" /><br><br><img src="/assets/images/21092410.png" /><br><br><img src="/assets/images/21092411.png" />

5. 파일을 다운로드 받았다면 원래 창으로 돌아가서 데이터 형식을 선택합니다. 데이터 형식은 ‘오디오 + 휴먼 레이블 대본’과 ‘일반 텍스트’ 중에 선택할 수 있습니다. 각 항목아래 자세한 설명이 있습니다. ‘오디오 + 휴먼 레이블 대본’을 선택하고 다음 버튼을 클릭합니다.<br>
<img src="/assets/images/21092412.png" width="600px" />

6. 데이터를 업로드합니다. 파일을 직접 업로드하거나 공유 위치를 설정할 수 있습니다. 아까 다운로드 받았던 파일을 드래그 앤 드롭으로 창에 올립니다. 녹색으로 표시되면 다음 버튼을 클릭합니다.<br>
<img src="/assets/images/21092413.png" width="600px" />

7. 파일 이름과 설명을 설정한 뒤 다음 버튼을 클릭합니다.<br>
<img src="/assets/images/21092414.png" width="600px" />

8. 설정한 내용을 확인한 뒤 이상이 없다면 저장 후 닫기 버튼을 클릭합니다.<br>
<img src="/assets/images/21092415.png" width="600px" /><br><br>업로드 후 잠시 동안은 상태가 처리하는 중으로 표시됩니다.<br>
<img src="/assets/images/21092416.png" /><br><br>일정 시간이 지나면 상태 란에 성공 여부가 표시되며 상태가 성공으로 나타나면 데이터 준비가 완료된 것입니다.<br>
<img src="/assets/images/21092417.png" />