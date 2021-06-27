import React from "react";
import styled, { keyframes } from "styled-components";
import SP1 from "../image/SP1.png";

const Spinner = (props) => {
  return (
    <React.Fragment>
      <SpinnerArea>
        <LoadMsg>열심히 로딩중입니다😣</LoadMsg>
        <WaitMsg>잠시만 기다려주세요!</WaitMsg>
        <Spin>
          <img src={SP1} alt="스피너" />
        </Spin>
      </SpinnerArea>
    </React.Fragment>
  );
};

const SpinnerArea = styled.div`
  text-align: center;
  height: 700px;
  overflow: hidden;
`;

const LoadMsg = styled.div`
  margin: 269px auto 24px;
  width: 100%;
  font-size: 40px;
  font-weight: bold;
  line-height: 1.5;
  text-align: center;
  color: #676767;

  @media (min-width: 768px) and (max-width: 1199px) {
    font-size: 28px;
  }

  @media (max-width: 767px) {
    font-size: 15px;
  }
`;

const WaitMsg = styled.div`
  margin: 24px auto 34px;
  width: 100%;
  color: #676767;
  font-size: 24px;
  line-height: 0.83;

  @media (min-width: 768px) and (max-width: 1199px) {
    font-size: 20px;
  }

  @media (max-width: 767px) {
    font-size: 12px;
  }
`;

const rotatespin = keyframes`
  from {
    transform: rotate(0deg);
    position: relative;
    top: 15px;
  }
  to {
    transform: rotate(360deg);
    position: relative;
    top: 0px;
  }
`;

const Spin = styled.div`
  width: 100%;
  margin: auto;
  animation: ${rotatespin} 800ms infinite linear;

  @media (min-width: 768px) and (max-width: 1199px) {
    img {
      width: 90px;
    }
  }

  @media (max-width: 767px) {
    img {
      width: 70px;
    }
  }
`;

export default Spinner;
