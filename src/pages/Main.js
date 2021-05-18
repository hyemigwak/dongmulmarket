import React from "react";
import styled from "styled-components";
import PostList from "./PostList";
import Banners from "../components/Banners";
const Main = (props) => {
  return (
    <React.Fragment>
      <WrapMain>
        <Banners />
        <Title>교환을 기다리고 있어요!</Title>
        <PostList />
      </WrapMain>
    </React.Fragment>
  );
};

const WrapMain = styled.div`
  margin-top: 120px;
  display: flex;
  width: 100%;
  flex-direction: column;
  /* @media (max-width: 1000px){
    heigth: 
  } */
`;

const Title = styled.h2`
  height: 24px;
  flex-grow: 0;
  margin: 0px 171px 10px 180px;
  font-size: 25px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.96;
  letter-spacing: normal;
  text-align: left;
  color: #2f2f2f;
`;

export default Main;
