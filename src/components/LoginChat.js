import React from "react";
import styled from "styled-components";

const LoginChat = (props) => {
  return (
    <React.Fragment>
      <ChatView>
        <Text>
        채팅에 참여해서 판매자와
        <br /> 대화하여 물품을 교환해보세요.
        </Text>

      </ChatView>
    </React.Fragment>
  );
};

const ChatView = styled.div`
background:#3fbe81;
border-radius:20px;
box-shadow: 3px 3px 3px 3px gray;
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
color: #ffffff;
`;

export default LoginChat;
