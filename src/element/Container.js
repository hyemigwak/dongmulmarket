import React from "react";
import styled from "styled-components";

const Container = ({ children }) => {
  return <ContainerBox>{children}</ContainerBox>;
};

const ContainerBox = styled.div`
  width: 1200px;
  box-sizing: border-box;
  margin: 0px auto;
  /* padding: 0px 20px; */

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (min-width: 768px) and (max-width: 1190px) {
    width: 100%;
  }
`;

export default Container;
