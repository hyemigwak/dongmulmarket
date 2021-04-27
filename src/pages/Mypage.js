import React from "react";
import styled from "styled-components";
import { Setting, Calendar } from "../components";

const Mypage = () => {
  return (
    <Container>
      <Setting />
      <Calendar />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export default Mypage;
