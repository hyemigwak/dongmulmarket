import React from "react";
import styled from "styled-components";

const OneChat = (props) => {
  const { open, close } = props;

  return (
    <>
      {open ? (
        <>
          <ChatView></ChatView>
          <ChatInputC>
            <ChatInput placeholder="내용을 입력하세요." />
            <ChatBtn>전송</ChatBtn>
          </ChatInputC>
        </>
      ) : null}
    </>
  );
};

const ChatView = styled.div`
  background: #dce1df;
  height: 500px;
  width: 500px;

  border: 1px solid #eee;
  text-align: center;
`;

const ChatInputC = styled.div`
  justify-content: center;
`;

const ChatInput = styled.input`
  height: 88px;
  width: 500px;
  border: 1px solid #6fcea1;
  background: #ffffff;
  ::placeholder {
    padding: 0px 20px;
    font-size: 18px;
  }
`;

const ChatBtn = styled.button`
  width: 80px;
  height: 34px;
  padding: 5px 0px;
  border-radius: 80px;
  font-size: 15px;
  display: inline-block;
  position: relative;
  bottom: 60px;
  left: 180px;

  cursor: pointer;
  border: none;
  background-color: #c0c0c0;
  color: #ffffff;
`;

export default OneChat;
