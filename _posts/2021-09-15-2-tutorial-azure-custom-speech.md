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

# [1] 음성 서비스 구독
Speaker Recognition 서비스를 사용하기 위해서는 Azure의 음성 서비스(Speech Services)를 구독해야합니다.<br>
만약 구독이 되어있는 분은 이 부분은 건너뛰셔도 됩니다.

1. Azure Portal에서 Cognitive Services를 검색한 뒤 선택합니다.<br><img src="/assets/images/21091501.png" />

2. Cognitive Services 서비스 목록에서 음성 서비스(Speech Service)를 찾아 만들기 버튼을 클릭합니다.<br><img src="/assets/images/21091502.png" />

3. 각 항목을 입력한 뒤 만들기 버튼을 클릭합니다. 다른 항목은 모두 자유롭게 설정 가능하지만 위치는 서비스 지원 지역을 확인해서 설정해야합니다. 그리고 가격 책정 계층의 경우 무료 F0이 가능하면 무료로 선택 해주세요. 
> 지원지역: 오스트레일리아 동부, 캐나다 중부, 인도 중부, 미국 동부, 미국 동부2, 미국 중북부, 북유럽, 미국 중남부, 동남아시아, 영국 남부, US Gov 애리조나, US Gov 버지니아, 서유럽, 미국 서부2 <br>

    <img src="/assets/images/21091503.png" />

<br>
<br>

# [2] CUSTOM SPEECH 프로젝트 생성

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

# [3] 학습 데이터 준비

1. 앞서 생성한 프로젝트에 들어갑니다. 프로젝트 목록은 <a href="https://speech.microsoft.com/customspeech">Speech Studio</a>의 메인 화면이나 Custom Speech 화면에서 확인할 수 있습니다. 프로젝트의 이름을 클릭하면 프로젝트로 진입합니다.

    [Speech Studio 메인 화면]
    <img src="/assets/images/21092406.png" />

    [Custom Speech 버튼을 눌렀을 때 보이는 화면]
    <img src="/assets/images/21092405.png" />

2. 데이터 업로드 버튼을 클릭합니다.<br>
<img src="/assets/images/21092407.png" />

3. 데이터 형식 선택 창에서 ‘샘플 데이터 세트 다운로드’ 버튼을 클릭합니다. 샘플 데이터는 독일어, 영어, 스페인어, 프랑스어, 이탈리아어, 일본어, 한국어, 포르투갈어, 중국어를 지원합니다.<br>
<img src="/assets/images/21092408.png" />

4. 원하는 파일을 다운로드합니다. 학습용 데이터로는 한국어의 training 폴더의 audio-and-trans.zip 파일을 사용합니다.<br>
<img src="/assets/images/21092409.png" /><br><br><img src="/assets/images/21092410.png" /><br><br><img src="/assets/images/21092411.png" />

5. 파일을 다운로드 받았다면 원래 창으로 돌아가서 데이터 형식을 선택합니다. 데이터 형식은 ‘오디오 + 휴먼 레이블 대본’과 ‘일반 텍스트’ 중에 선택할 수 있습니다. 각 항목아래 자세한 설명이 있습니다. ‘오디오 + 휴먼 레이블 대본’을 선택하고 다음 버튼을 클릭합니다.<br>
<img src="/assets/images/21092412.png" />

6. 데이터를 업로드합니다. 파일을 직접 업로드하거나 공유 위치를 설정할 수 있습니다. 아까 다운로드 받았던 파일을 드래그 앤 드롭으로 창에 올립니다. 녹색으로 표시되면 다음 버튼을 클릭합니다.<br>
<img src="/assets/images/21092413.png" />

7. 파일 이름과 설명을 설정한 뒤 다음 버튼을 클릭합니다.<br>
<img src="/assets/images/21092414.png" />

8. 설정한 내용을 확인한 뒤 이상이 없다면 저장 후 닫기 버튼을 클릭합니다.<br>
<img src="/assets/images/21092415.png" /><br><br>업로드 후 잠시 동안은 상태가 처리하는 중으로 표시됩니다.<br>
<img src="/assets/images/21092416.png" /><br><br>일정 시간이 지나면 상태 란에 성공 여부가 표시되며 상태가 성공으로 나타나면 데이터 준비가 완료된 것입니다.<br>
<img src="/assets/images/21092417.png" /><br><br>데이터 이름을 클릭하면 등록된 파일과 레이블 등 데이터의 상세정보를 확인할 수 있습니다.<br>
<img src="/assets/images/21092418.png" />

<br>
<br>

# [4] 사용자 지정 모델 학습

1. 메뉴에서 사용자 지정 모델 학습을 선택합니다.

2. 새 모델 학습 버튼을 클릭합니다.<br>
<img src="/assets/images/21092419.png" />

3. 시나리오와 기준 모델을 선택한 뒤 다음 버튼을 클릭합니다<br>
<img src="/assets/images/21092420.png" />

4. 모델을 만드는 데 사용할 데이터를 선택하는 창입니다. 앞서 업로드했던 데이터를 선택하고 다음 버튼을 클릭합니다.<br>
<img src="/assets/images/21092421.png" />

5. 모델의 이름과 설명을 작성한 후 다음 버튼을 클릭합니다.<br>
<img src="/assets/images/21092422.png" />

6. 설정한 내용을 확인한 뒤 이상이 없다면 저장 후 닫기 버튼을 클릭합니다.<br>
<img src="/assets/images/21092423.png" /><br><br>업로드 후 잠시 동안은 상태가 처리하는 중으로 표시됩니다.<br>
<img src="/assets/images/21092424.png" /><br><br>일정 시간이 지나면 상태 란에 성공 여부가 표시되며 상태가 성공으로 나타나면 학습이 완료된 것입니다.<br>
<img src="/assets/images/21092425.png" /><br><br>모델 이름을 클릭하면 모델 학습에 사용한 데이터 등 상세 정보를 확인할 수 있습니다.<br>
<img src="/assets/images/21092426.png" />

<br>
<br>

# [5] 품질 검사 데이터 준비

1. 메뉴에서 음성 데이터 세트를 선택합니다.

2. 데이터 업로드 버튼을 클릭합니다.<br>
<img src="/assets/images/21092407.png" />

3. 데이터 형식 선택 창에서 ‘샘플 데이터 세트 다운로드’ 버튼을 클릭합니다. 샘플 데이터는 독일어, 영어, 스페인어, 프랑스어, 이탈리아어, 일본어, 한국어, 포르투갈어, 중국어를 지원합니다.<br>
<img src="/assets/images/21092408.png" />

4. 원하는 파일을 다운로드합니다. 테스트용 데이터로는 한국어의 testing 폴더의 audio-and-trans.zip 파일과 audio.zip 파일을 사용합니다.<br>
<img src="/assets/images/21092409.png" /><br><br><img src="/assets/images/21092410.png" /><br><br><img src="/assets/images/21092427.png" />

5. 파일을 다운로드 받았다면 원래 창으로 돌아가서 데이터 종류를 선택합니다. ‘데이터를 테스트하는 중’을 클릭하면 테스트용 데이터 형식을 선택할 수 있습니다.<br>
<img src="/assets/images/21092428.png" />

6. 데이터 형식을 선택합니다. 데이터 형식은 ‘오디오 + 휴먼 레이블 대본’과 ‘오디오’, ‘음성 텍스트(자동 오디오 합성)’ 중에 선택할 수 있습니다. 각 항목아래 자세한 설명이 있습니다. ‘오디오’를 선택하고 다음 버튼을 클릭합니다.<br>
<img src="/assets/images/21092429.png" />

7. 데이터를 업로드합니다. 파일을 직접 업로드하거나 공유 위치를 설정할 수 있습니다. 아까 다운로드 받았던 파일을 드래그 앤 드롭으로 창에 올립니다. 녹색으로 표시되면 다음 버튼을 클릭합니다.<br>
<img src="/assets/images/21092430.png" />

8. 파일 이름과 설명을 설정한 뒤 다음 버튼을 클릭합니다.<br>
<img src="/assets/images/21092431.png" />

9. 설정한 내용을 확인한 뒤 이상이 없다면 저장 후 닫기 버튼을 클릭합니다.<br>
<img src="/assets/images/21092432.png" /><br><br>업로드 후 잠시 동안은 상태가 처리하는 중으로 표시됩니다.<br>
<img src="/assets/images/21092433.png" /><br><br>일정 시간이 지나면 상태 란에 성공 여부가 표시되며 상태가 성공으로 나타나면 데이터 준비가 완료된 것입니다.<br>
<img src="/assets/images/21092434.png" /><br><br>데이터 이름을 클릭하면 데이터의 상세정보를 확인할 수 있습니다.<br>
<img src="/assets/images/21092435.png" />

<br>
<br>

# [6] 모델 테스트 – 품질 검사

1. 메뉴에서 테스트 모델을 선택합니다.

2. 새 테스트 만들기를 선택합니다.<br>
<img src="/assets/images/21092436.png" />

3. 테스트 형식을 선택하는 창입니다. 품질 검사(오디오 전용 데이터)를 선택하고 다음 버튼을 클릭합니다.<br>
<img src="/assets/images/21092437.png" />

4. 앞서 업로드했던 품질 검사용 데이터를 선택한 뒤 다음 버튼을 클릭합니다.<br>
<img src="/assets/images/21092438.png" />

5. 평가할 모델을 선택한 뒤 다음 버튼을 클릭합니다.<br>
<img src="/assets/images/21092439.png" />

6. 테스트의 이름과 설명을 작성한 후 다음 버튼을 클릭합니다.<br>
<img src="/assets/images/21092440.png" />

7. 설정한 내용을 확인한 뒤 이상이 없다면 저장 후 닫기 버튼을 클릭합니다.<br>
<img src="/assets/images/21092441.png" /><br><br>업로드 후 잠시 동안은 상태가 처리하는 중으로 표시됩니다.<br>
<img src="/assets/images/21092442.png" /><br><br>일정 시간이 지나면 상태 란에 성공 여부가 표시되며 상태가 성공으로 나타나면 테스트가 완료된 것입니다.<br>
<img src="/assets/images/21092443.png" />

8. 테스트 이름을 클릭하여 테스트 결과를 확인합니다.<br>
<img src="/assets/images/21092444.png" />

<br>
<br>

# [7] 정확도 평가 데이터 준비

1. 메뉴에서 음성 데이터 세트를 선택합니다.

2. 데이터 업로드 버튼을 클릭합니다.<br>
<img src="/assets/images/21092407.png" />

3. 데이터 형식 선택 창에서 ‘샘플 데이터 세트 다운로드’ 버튼을 클릭합니다. 샘플 데이터는 독일어, 영어, 스페인어, 프랑스어, 이탈리아어, 일본어, 한국어, 포르투갈어, 중국어를 지원합니다.<br>
<img src="/assets/images/21092408.png" />

4. 원하는 파일을 다운로드합니다. 테스트용 데이터로는 한국어의 testing 폴더의 audio-and-trans.zip 파일과 audio.zip 파일을 사용합니다.<br>
<img src="/assets/images/21092409.png" /><br><br><img src="/assets/images/21092410.png" /><br><br><img src="/assets/images/21092427.png" />

5. 파일을 다운로드 받았다면 원래 창으로 돌아가서 데이터 종류를 선택합니다. ‘데이터를 테스트하는 중’을 클릭하면 테스트용 데이터 형식을 선택할 수 있습니다.<br>
<img src="/assets/images/21092428.png" />

6. 데이터 형식을 선택합니다. 데이터 형식은 ‘오디오 + 휴먼 레이블 대본’과 ‘오디오’, ‘음성 텍스트(자동 오디오 합성)’ 중에 선택할 수 있습니다. 각 항목아래 자세한 설명이 있습니다. ‘오디오 + 휴먼 레이블 대본’을 선택하고 다음 버튼을 클릭합니다.<br>
<img src="/assets/images/21092445.png" />

7. 데이터를 업로드합니다. 파일을 직접 업로드하거나 공유 위치를 설정할 수 있습니다. Testing 폴더에 있던 audio-and-trans.zip 파일을 드래그 앤 드롭으로 창에 올립니다. 녹색으로 표시되면 다음 버튼을 클릭합니다.<br>
<img src="/assets/images/21092446.png" />

8. 파일 이름과 설명을 설정한 뒤 다음 버튼을 클릭합니다.<br>
<img src="/assets/images/21092447.png" />

9. 설정한 내용을 확인한 뒤 이상이 없다면 저장 후 닫기 버튼을 클릭합니다.<br>
<img src="/assets/images/21092448.png" /><br><br>업로드 후 잠시 동안은 상태가 처리하는 중으로 표시됩니다.<br>
<img src="/assets/images/21092449.png" /><br><br>일정 시간이 지나면 상태 란에 성공 여부가 표시되며 상태가 성공으로 나타나면 데이터 준비가 완료된 것입니다.<br>
<img src="/assets/images/21092450.png" /><br><br>데이터 이름을 클릭하면 데이터의 상세정보를 확인할 수 있습니다.<br>
<img src="/assets/images/21092451.png" />

<br>
<br>

# [8] 모델 테스트 – 정확도 평가

1. 메뉴에서 테스트 모델을 선택합니다.

2. 새 테스트 만들기를 선택합니다.<br>
<img src="/assets/images/21092436.png" />

3. 테스트 형식을 선택하는 창입니다. 품질 검사(오디오 전용 데이터)를 선택하고 다음 버튼을 클릭합니다.<br>
<img src="/assets/images/21092452.png" />

4. 앞서 업로드했던 정확도 평가용 데이터를 선택한 뒤 다음 버튼을 클릭합니다.<br>
<img src="/assets/images/21092453.png" />

5. 평가할 모델을 선택한 뒤 다음 버튼을 클릭합니다.<br>
<img src="/assets/images/21092454.png" />

6. 테스트의 이름과 설명을 작성한 후 다음 버튼을 클릭합니다.<br>
<img src="/assets/images/21092455.png" />

7. 설정한 내용을 확인한 뒤 이상이 없다면 저장 후 닫기 버튼을 클릭합니다.<br>
<img src="/assets/images/21092456.png" /><br><br>업로드 후 잠시 동안은 상태가 처리하는 중으로 표시됩니다.<br>
<img src="/assets/images/21092457.png" /><br><br>일정 시간이 지나면 상태 란에 성공 여부가 표시되며 상태가 성공으로 나타나면 테스트가 완료된 것입니다.<br>
<img src="/assets/images/21092458.png" />

8. 테스트 이름을 클릭하여 테스트 결과를 확인합니다.<br>
<img src="/assets/images/21092459.png" />

<br>
<br>

# [9] 모델 배포

1. 메뉴에서 모델 배포를 선택합니다.

2. 모델 배포 버튼을 클릭합니다.<br>
<img src="/assets/images/21092460.png" />

3. 이름과 모델을 설정하고 사용 약관에 동의한 뒤 추가 버튼을 클릭합니다.<br>
<img src="/assets/images/21092461.png" /><br><br>업로드 후 잠시 동안은 상태가 처리하는 중으로 표시됩니다.<br>
<img src="/assets/images/21092462.png" /><br><br>일정 시간이 지나면 상태 란에 성공 여부가 표시되며 상태가 성공으로 나타나면 배포가 완료된 것입니다.<br>
<img src="/assets/images/21092463.png" />

4. 배포된 모델 이름을 클릭하면 구독 키나 SDK와 같은 정보를 확인할 수 있습니다.<br>
<img src="/assets/images/21092464.png" />
