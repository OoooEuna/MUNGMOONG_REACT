import React from 'react';
import CarouselComponent from '../components/CarouselComponent';
import FeaturetteComponent from '../components/FeaturetteComponent';

function App() {
  return (
    <div>
      <CarouselComponent />
      <FeaturetteComponent
        heading="펫시터가 집으로"
        text="굳이 맡기러 오지 않아도 펫시터가 집으로 직접 찾아와요"
        
        imgSrc="img/main/main1.png"
      />
      <FeaturetteComponent
        heading="숙련된 트레이너"
        text="자격증, 경력 등 멍뭉이 하나하나 확인하여 검증된 훈련사만 등록되어 있어 체계적으로 강아지들을 돌봐줘요"
        imgSrc="img/main/main2.png"
        reverse
        bgColor="#CEECF5"
      />
      <FeaturetteComponent
        heading="산책도 가능!"
        text="돌봐주는 것 뿐만 아니라 산책도"
        imgSrc="img/main/main3.png"
      />
      <FeaturetteComponent
        heading="훈련 영상!"
        text="저희 훈련사의 훈련영상입니다."
        mediaSrc="video/trainer.mp4"
        reverse
        bgColor="#E6E6E6"
      />
    </div>
  );
}

export default App;
