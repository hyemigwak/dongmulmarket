import React from "react";
import Fatcat from "../image/Fatcat.svg";
import styled from "styled-components";

const FloatBtn = () => {
  return (
    <React.Fragment>
      <BtnArea>
        <a target="_blank" href="https://github.com/hyemigwak" rel="noreferrer">
          <img src={Fatcat} alt="고양이" />
        </a>
        <div className="survey">설문하고 선물받자옹~🧡</div>
      </BtnArea>
    </React.Fragment>
  );
};

const BtnArea = styled.div`
  position: fixed;
  z-index: 5000;
  bottom: 34%;
  right: 12%;
  cursor: pointer;

  img {
    @media (max-width: 767px) {
      width: 80px;
      right: 15%;
    }

    @media (min-width: 768px) and (max-width: 1199px) {
      width: 90px;
      right: 15%;
    }
  }

  .survey {
    z-index: 5000;
    opacity: 0;
    position: absolute;
    bottom: 100%;
    right: 3%;
    font-size: 10px;
    font-weight: 600;
    color: #212121;
    width: 100%;

    @media (max-width: 767px) {
      font-size: 0px;
    }

    @media (min-width: 768px) and (max-width: 1199px) {
      font-size: 0px;
    }
  }

  :hover {
    width: 150px;

    @media (max-width: 767px) {
      width: 60px;
    }

    @media (min-width: 768px) and (max-width: 1199px) {
      width: 80px;
    }

    .survey {
      opacity: 1;
    }
  }
`;

export default FloatBtn;
