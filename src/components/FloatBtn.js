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
  bottom: 34%;
  right: 5%;
  cursor: pointer;

  @media (max-width: 767px) {
    transform: scale(0.6);
  }

  @media (min-width: 768px) and (max-width: 1199px) {
  }

  .survey {
    z-index: 3500;
    opacity: 0;
    position: absolute;
    bottom: 100%;
    right: 3%;
    font-size: 10px;
    font-weight: 600;
    color: #212121;
    width: 100%;
  }

  :hover {
    transform: scale(1.2);
    .survey {
      opacity: 1;
    }
  }
`;

export default FloatBtn;
