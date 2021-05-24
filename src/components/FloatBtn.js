import React from "react";
import Fatcat from "../image/Fatcat.svg";
import dongmum3 from "../image/dongmum3.png";
import styled, { keyframes } from "styled-components";

const FloatBtn = () => {
  return (
    <React.Fragment>
      <BtnArea>
        <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdS8daBSTBOcffTNGzCV47PQnMsAMD4hvbr3ZK2Wfk6ph2KZQ/viewform?usp=sf_link" rel="noreferrer">
          <img src={dongmum3} alt="동멈이" />
        </a>
        <div className="survey">설문조사 부탁드려용🧡</div>
      </BtnArea>
    </React.Fragment>
  );
};

const moveToTop = keyframes`
  from { 
    position: fixed;
    bottom: 50px;
    right: 70px;
    opacity: 0.4;
  }
  to {
    position: fixed;
    bottom: 55px;
    right: 70px;
    opacity: 1;
    }
`;

const BtnArea = styled.div`
  position: fixed;
  bottom: 50px;
  right: 70px;
  cursor: pointer;
  z-index: 5000;
  background-position: center;
  background-size: 120%;

  img {
    width: 120px;
    border-radius: 50%;

    @media (max-width: 767px) {
      width: 80px;
    }

    @media (min-width: 768px) and (max-width: 1199px) {
      right: 15%;
    }
  }

  .survey {
    z-index: 5000;
    opacity: 0;
    position: absolute;
    z-index: 5000;
    bottom: 100%;
    cursor: pointer;
    font-size: 12px;
    font-weight: 600;
    color: #212121;
    width: 80px;
    height: 24px;
    text-align: center;
    margin: 0 auto;
    padding: 4px 5px;
    background-color: #212121;
    border-radius: 12px;
    color: #ffffff;

    @media (max-width: 767px) {
      font-size: 0px;
    }

    @media (min-width: 768px) and (max-width: 1199px) {
      font-size: 0px;
    }
  }

  :hover {
    animation: ${moveToTop} 800ms;

    @media (max-width: 767px) {
      width: 60px;
    }

    @media (min-width: 768px) and (max-width: 1199px) {
      width: 80px;
    }

    .survey {
      position: absolute;
      right: -3px;
      opacity: 1;
      width: 140px;
      padding: 4px 10px;

      @media (max-width: 767px) {
        display: none;
      }

      @media (min-width: 768px) and (max-width: 1199px) {
        display: none;
      }
    }
  }
`;

export default FloatBtn;
