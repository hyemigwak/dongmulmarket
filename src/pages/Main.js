import React from "react";
import styled from "styled-components";
import PostList from "./PostList";
import { Container } from "../element";
import { FloatBtn, Banners } from "../components";

const Main = (props) => {
  return (
    <React.Fragment>
      <WrapMain>
        <Banners />
        <Container>
          <Title>교환을 기다리고 있어요!</Title>
          <PostList />
          <FloatBtn />
        </Container>
      </WrapMain>
    </React.Fragment>
  );
};

const WrapMain = styled.div`
  margin: 120px auto 0;
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Title = styled.h2`
  width: 100%;
  height: 24px;
  flex-grow: 0;
  margin: 0px 0 20px 100px;
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
