import React from "react";
import styled from "styled-components";
import PostList from "./PostList";
import Banners from "../components/Banners";
import { Container } from "../element";

const Main = (props) => {
  return (
    <React.Fragment>
      <Container>
        <WrapMain>
          <Banners />
          <Title>교환을 기다리고 있어요!</Title>
          <PostList />
        </WrapMain>
      </Container>
    </React.Fragment>
  );
};

const WrapMain = styled.div`
  margin-top: 120px;
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Title = styled.h2`
  height: 24px;
  flex-grow: 0;
  margin: 0px 150px 20px 0px;
  font-size: 25px;
  font-weight: bold;
  line-height: 0.96;
  text-align: left;
  color: #2f2f2f;

  @media (min-width: 768px) and (max-width: 1199px) {
    margin: 100px 30px 0px 50px;
  }

  @media (max-width: 767px) {
    margin: 60px auto 0px;
    font-size: 20px;
  }
`;

export default Main;
