import React from "react";
import styled,  { keyframes } from "styled-components";
import Cat from "../image/Cat.png";
import Heart from "../image/Heart.png";


const LoginChat = (props) => {
  return (
    <React.Fragment>
      <ChatView>
     
      <HeartBox className="heartUp" src={Heart}/>
      
      <ImgBox src={Cat}/>
        <Text>
        채팅에 참여해서 판매자와
        <br /> 대화하여 물품을 교환해보세요.
        </Text>
      </ChatView>
    </React.Fragment>
  );
};

const ChatView = styled.div`
border-radius:20px;
box-shadow: 3px 3px 3px 3px gray;
border: 2px solid #3fbe81;
  width: 723px;
  height: 522px;
  text-align: center;
  line-height: 1.5;

  display: table-cell;
  vertical-align: middle;

  font-size: 36px;
  font-weight: 600;
  color: #ffffff;
  z-index: 1000;

  div {
    height: 1.5;
  }

  @media (max-width: 767px) {
      position: relative;
      top:590px;
      width: 285px;
      height: 830px;
      text-align: center;
       line-height: 1.5;
      right:70px;
   
      }

  
`;


const HeartBox=styled.img`

position:relative;
bottom:120px;
left:70px;



@media (max-width: 767px) {
  position: relative;
  bottom:120px;      
  }


@media (min-width: 768px) and (max-width: 1190px) {
 
  position: relative;
  
  left:80px;
  bottom:120px;
  
}
`;

const ImgBox=styled.img`

position:relative;
bottom:10px;
right:10px;

@media (max-width: 767px) {
  position: relative;
  bottom:10px;     
  }


@media (min-width: 768px) and (max-width: 1190px) {
 
  position: relative;
  
  left:0px;
  bottom:10px;
  
}
`;

const Text=styled.div`

flex-grow: 0;
margin: 0 0 50px;
font-family: NotoSans;
font-size: 24px;
font-weight: bold;
font-stretch: normal;
font-style: normal;
line-height: 1.42;
letter-spacing: normal;
text-align: center;
color: #3fbe81;


@media (max-width: 767px) {
  font-size: 20px;

  }
`;

export default LoginChat;
