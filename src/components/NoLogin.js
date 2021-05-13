import React from "react";
import styled from "styled-components";

const NoLogin = (props) => {
  return (
    <React.Fragment>
      <ChatView>
        <Text>
          로그인하셔야
          <br /> 채팅 참여가 가능합니다.
        </Text>
        <ChatInput placeholder="채팅에 참여하실 수 없습니다" disabled />
      </ChatView>
    </React.Fragment>
  );
};

const ChatView = styled.div`
  background: #d0d0d0;
  width: 723px;
  height: 522px;
  text-align: center;
  line-height: 1.5;

  margin-left:30px;
  display: table-cell;
  vertical-align: middle;

  font-size: 36px;
  font-weight: 600;
  color: #ffffff;

  div {
    height: 1.5;
  }
`;

const Text=styled.div`
height: 108px;
font-size: 36px;
font-weight: 600;
margin-top:190px;
line-height: 1.5;
letter-spacing: normal;
text-align: center;
color: #ffffff;
`;

const ChatInput = styled.input`
  width: 724px;
  height: 74px;
  flex-grow: 0;
  margin-top: 220px;
  border: solid 2px #6fcea1;
  background-color: #ffffff;

  ::placeholder {
    padding: 0px 20px;
    font-size: 18px;
  }

  // position: relative;
  // top: 245px;
`;

export default NoLogin;
