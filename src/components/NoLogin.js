import React from "react";
import styled from "styled-components";
import { Container } from "../element";
import { history } from "../redux/configureStore";
import { useMediaQuery } from "react-responsive";
import Cat from "../image/Cat.png";

const NoLogin = (props) => {
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  return (
    <React.Fragment>
    
          <ChatView>
            <ImgBox src={Cat}/>
                <Text>
                  로그인하셔야
                  <br /> 채팅 참여가 가능합니다.
                </Text>
                <LoginBtn  onClick={() => {
                    history.replace("/login")
                }}>로그인하러 가기</LoginBtn>
                {/* {isMobile? null: (
                    <ChatInput placeholder="채팅에 참여하실 수 없습니다" disabled />
                )} */}
                
            </ChatView> 
       
    </React.Fragment>
  );
};



const ChatView = styled.div`
  
  border-radius:20px;
  justify-content:center;
  align-items:center;
  
  width: 723px;
  height: 522px;
  text-align: center;
  line-height: 1.5;
  
  margin-left: 30px;
  display: table-cell;
  vertical-align: middle;
  border: 2px solid #3fbe81;
  font-size: 36px;
  font-weight: 600;
 

  div {
    height: 1.5;
  }

  @media (max-width: 767px) {
    position: absolute;
    top:840px;
    width: 285px;
    height: 830px;
    text-align: center;
     line-height: 1.5;
     margin-left:-40px;
     
   

    }
  

  @media (min-width: 768px) and (max-width: 1190px) {
   
    position: absolute;
    left:-17px;
    right: 50px;
    top:650px;
    
  }
`;

const ImgBox=styled.img`

position:relative;
top:100px;

@media (max-width: 767px) {
  position: relative;
  top:200px;     
  }


@media (min-width: 768px) and (max-width: 1190px) {
 
  position: relative;
  
  left:10px;
  top:90px;
  
}
`;

const Text = styled.div`
  height: 108px;
  font-size: 24px;
  font-weight: 600;
  margin-top: 120px;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: center;
  color:#3fbe81;

  @media (max-width: 767px) {
    position: relative;
   bottom:50px;
    font-size: 26px;
    margin-top:300px;
    font-size: 20px;
   
  }

`;

const LoginBtn = styled.button`
  display: inline-block;
  width: 180px;
  height: 50px;
  padding: 10px;
  border: none;
  background-color: #3fbe81;
  border-radius: 83px;
  cursor: pointer;
  margin: 80px 30px 0px 90px;
  color: #ffffff;
  font-size: 20px;

  position: relative;
  bottom:50px;
  left: 60px;
  right: auto;
  transform: translate(-50%, -50%);
 
 
  :hover {
    background-color: #269f65;
  }

  @media (max-width: 767px) {
    position: absolute;
    top: 470px;
    left:47px;
    z-index:2000;
   
    transform: translate(-50%, -50%);
    width: 150px;
    height: 40px;
    font-size: 15px;
    }
  
`;

export default NoLogin;
