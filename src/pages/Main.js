import React from "react";
import styled from "styled-components";

import PostList from "./PostList";
const Main = (props) => {
  return (
    <React.Fragment>
      <WrapMain>
        <h2>교환 경매중인 물건!</h2>
        <PostList/>
      </WrapMain>
    </React.Fragment>
  );
};

const WrapMain = styled.div`
  /* 최상단과 항상 떨어져 있게 함 */
  padding-top: 60px; 
  display: flex;
  flex-direction: column;
  /* @media (max-width: 1000px){
    heigth: 
  } */
`;

const Post=styled.div`
height:200px;
width:150px;
background:#eee;
`;
export default Main;
