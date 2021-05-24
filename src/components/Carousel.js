import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import SalesDetails from "../pages/SalesDetails";
import { Previous, Next } from "../image/Arrow";

const Carousel = (props) => {
  const dispatch = useDispatch();

  const SalesList = props.SalesList;

  const slide_content = SalesList;
  const lastIndex = Math.ceil(SalesList?.length / 4);
  const slide_temp = new Array(lastIndex).fill(0);

  const slider_container = React.useRef();
  const prev = React.useRef();
  const next = React.useRef();
  const [current_index, setCurrentIndex] = React.useState(0); // 현                                                                  재 보여지는 슬라이더

  const ipadView = window.matchMedia("(min-width: 768px) and (max-width: 1190px)");

  const ProductSlide = (index) => {
    let slider = slider_container.current;
    slider.style.left = -100 * index + "%"; // 좌측으로 이동
    setCurrentIndex(index);

    // 버튼 활성화 설정
    if (index === lastIndex - 1) {
      next.current.style.display = "flex"; //none
      prev.current.style.display = "flex";
    } else if (index === 0) {
      next.current.style.display = "flex";
      prev.current.style.display = "flex"; //none
    } else {
      next.current.style.display = "flex";
      prev.current.style.display = "flex";
    }
  };

  React.useEffect(() => {
    if (slide_content.length < 5) {
      next.current.style.display = "none";
    }
    prev.current.style.display = "none";
  }, []);

  return (
    <CarouselContainer>
      <PrevContainer
        ref={prev}
        onClick={() => {
          ProductSlide(current_index - 1);
        }}
      >
        <Previous style={{ zindex: "1000", color: "#fff" }} />
      </PrevContainer>
      <NextContainer
        ref={next}
        onClick={() => {
          ProductSlide(current_index + 1);
        }}
      >
        <Next />
      </NextContainer>
      <SliderContainer ref={slider_container}>
        {slide_temp.map((val, index) => {
          let value = index * 100;
          const slide_style = {
            left: `${value}%`,
          };

          let start = index * 4;
          let end = start + 4;

          let temp_arr = slide_content.slice(start, end);

          return (
            <Slider key={index} style={slide_style}>
              <ListWrapper>
                {temp_arr.map((myProduct, idx) => (
                  <SalesDetails {...myProduct} key={idx} />
                ))}
              </ListWrapper>
            </Slider>
          );
        })}
      </SliderContainer>
    </CarouselContainer>
  );
};

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 24.815rem;
  overflow: hidden;
  margin: 1rem 0;
  background-size: cover;
`;

const SliderContainer = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  transition: left 0.5s ease-in;
`;

const Slider = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
`;

const ListWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

//이전버튼
const PrevContainer = styled.div`
  z-index: 1;
  position: absolute;
  top: 40%;
  left: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3fbe81;
  border-radius: 30px;
  opacity: 0;
  transition: opacity 0.3s;
  & svg {
    fill: #fff;
    width: 1.5rem;
    height: 1.5rem;
  }
  ${CarouselContainer}:hover & {
    opacity: 1;
  }
`;

const NextContainer = styled.div`
  z-index: 1;
  position: absolute;
  top: 40%;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3fbe81;
  border-radius: 30px;
  opacity: 0;
  transition: opacity 0.3s;
  & svg {
    fill: #fff;
    width: 1.5rem;
    height: 1.5rem;
  }
  ${CarouselContainer}:hover & {
    opacity: 1;
  }
`;

export default Carousel;
