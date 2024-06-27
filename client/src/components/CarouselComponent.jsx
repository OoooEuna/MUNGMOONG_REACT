import React from 'react';
import { Carousel } from 'react-bootstrap';

// 이미지 슬라이더
const CarouselComponent = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src="img/main/slide_01.png" alt="Slide 1" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="img/main/slide_02.png" alt="Slide 2" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="img/main/slide_03.png" alt="Slide 3" />
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselComponent;
