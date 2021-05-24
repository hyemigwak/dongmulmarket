import React from "react";
import Fatcat from "../image/Fatcat.svg";
import styled, { keyframes } from "styled-components";

const FloatBtn = () => {
  return (
    <React.Fragment>
      <BtnArea>
        <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdS8daBSTBOcffTNGzCV47PQnMsAMD4hvbr3ZK2Wfk6ph2KZQ/viewform?usp=sf_link" rel="noreferrer">
          <img src={Fatcat} alt="고양이" />
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
    right: 50px;
    opacity: 0.4;
  }
  to {
    position: fixed;
    bottom: 55px;
    right: 50px;
    opacity: 1;
    }
`;

const BtnArea = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  cursor: pointer;
  z-index: 5000;
  background-position: center;
  background-size: 120%;

  img {
    width: 100px;

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
    left: 20%;
    cursor: pointer;
    font-size: 10px;
    font-weight: 600;
    color: #212121;
    width: 40px;
    height: 24px;
    text-align: center;
    margin: 0 auto;
    padding: 4px;
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
      left: -30%;
      opacity: 1;
      width: 120px;

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
