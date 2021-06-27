import React from "react";
import styled from "styled-components";
import { Container } from "../element";
import { Banners, PostList } from "../components";
import { useMediaQuery } from "react-responsive";

const Main = (props) => {
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });
  return (
    <React.Fragment>
      <WrapMain>
        <Banners />
        {isMobile ? (
          <Mobile>
            동물마켓은 웹 최적화 사이트로 <span>pc이용</span>을 권장합니다.
          </Mobile>
        ) : null}
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

const Mobile = styled.div`
  margin: 40px auto 0px;
  width: 310px;
  span {
    font-weight: bold;
  }
`;

export default Main;
