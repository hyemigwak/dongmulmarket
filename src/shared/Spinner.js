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
  margin: 269px 344px 24px;
  font-size: 40px;
  font-weight: bold;
  line-height: 1.5;
  text-align: center;
  color: #676767;
`;

const WaitMsg = styled.div`
  margin: 24px 453px 34px;
  color: #676767;
  font-size: 24px;
  line-height: 0.83;
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
  animation: ${rotatespin} 800ms infinite linear;
`;

export default Spinner;
