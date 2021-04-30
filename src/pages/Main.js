import React from "react";
import styled from "styled-components";

import PostList from "./PostList";
const Main = (props) => {
  return (
    <React.Fragment>
      <WrapMain>
        <Title>교환 경매중인 물건!</Title>
        <PostListC>
          <PostList/>
        </PostListC>
        
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

const Title=styled.h2`
text-align:center;
margin-top:20px;
`;

const PostListC=styled.div`
width:1200px;
margin:auto;
`;
const Post=styled.div`
height:200px;
width:150px;
background:#eee;
`;
export default Main;
