import React from "react";
import styled from "styled-components";

const OneChat = (props) => {
  const { open, close } = props;

  return (
    <>
      {open ? (
        <>
          <ChatView></ChatView>
          <ChatInput placeholder="내용을 입력하세요." />
        </>
      ) : null}
    </>
  );
};

const ChatView = styled.div`
  background: #dce1df;
  width: 723px;
  height: 522px;

  border: 1px solid #eee;
  text-align: center;
`;

const ChatInput = styled.input`
  width: 724px;
  height: 74px;
  flex-grow: 0;

  border: solid 2px #6fcea1;
  background-color: #ffffff;
  ::placeholder {
    padding: 0px 20px;
    font-size: 18px;
  }

  position: relative;
`;

const ChatBtn = styled.button`
  position: absolute;
  bottom: 95px;
  left: 745px;
  width: 102px;
  height: 38px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 21px;
  margin: 0 0 0 305px;
  padding: 7px 14px 6px;
  border-radius: 4px;
  background-color: #c4c4c4;
  border: solid 1px #c4c4c4;
`;

const SendText = styled.div`
  flex-grow: 0;
  font-family: Roboto;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #ffffff;
`;
export default OneChat;
