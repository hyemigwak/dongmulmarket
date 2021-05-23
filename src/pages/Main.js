import React from "react";
import styled from "styled-components";
import PostList from "./PostList";
import { Container } from "../element";
import { Banners } from "../components";

const Main = (props) => {
  return (
    <React.Fragment>
      <WrapMain>
        <Banners />
        <Container>
          <PostList />
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

export default Main;
