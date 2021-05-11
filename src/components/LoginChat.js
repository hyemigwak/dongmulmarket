import React from "react";
import styled from "styled-components";

const LoginChat = (props) => {
  return (
    <React.Fragment>
      <ChatView>
        <p>채팅에 먼저 참여 해주세요!</p>
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

export default LoginChat;
