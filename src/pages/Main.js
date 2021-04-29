import React from "react";
import styled from "styled-components";

const Main = (props) => {
  return (
    <React.Fragment>
      <WrapMain>
        <MainC>
          <InputC>
            <Category type="text" placeholder="카테고리" />
            <Food type="text" placeholder="음식 종류" />
          </InputC>
          <BtnC>
            <ChoiceBtn>메뉴 고르기</ChoiceBtn>
          </BtnC>
          
        </MainC>
      </WrapMain>
    </React.Fragment>
  );
};

const WrapMain=styled.div`
/* 최상단과 항상 떨어져 있게 함 */
padding-top: 60px; 
display: flex;
flex-direction: column;
`;

const MainC=styled.div`
width:1080px;
margin:auto;
height:100vh;
`;

const InputC=styled.div`
width:1080px;
margin:auto;
margin-top:100px;
justify-contents:center;
align-items:center;
`;

const Category=styled.input`
width:100px;
margin-left:180px;
width: 300px;
height:40px;
border: 1px solid #DBDBDB;
border-radius: 10px;
`;

const Food=styled.input`
width:100px;
margin-left:50px;
width: 300px;
height:40px;
border: 1px solid #DBDBDB;
border-radius: 10px;
`;

const BtnC=styled.div`
width:1080px;
margin:auto;
margin-top:100px;
justify-contents:center;
align-items:center;

`;

const ChoiceBtn = styled.button`
  width: 150px;
  margin-left: 440px;
  padding: 7px 0px 7px 0px;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 600;
  margin-top: 10px;
  border: 1px solid #DBDBDB;
  cursor:pointer;
  outline: none;
  background-color: #0095f6;
  color: white;
`;
export default Main;
