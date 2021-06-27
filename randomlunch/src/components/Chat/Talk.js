import React from "react";
import styled from "styled-components";

const Talk = (props) => {
  const { msg, nickname } = props;

  if (nickname === "곽혜미") {
    return (
      <div>
        <MyNick>{nickname}</MyNick>
        <MyChat>{msg}</MyChat>
      </div>
    );
  } else {
    return (
      <div>
        <YourNick>{nickname}</YourNick>
        <Yourchat>{msg}</Yourchat>
      </div>
    );
  }
};

const YourNick = styled.div`
  margin: 4px 8px 4px 10px;
  font-weight: 600;
`;
const Yourchat = styled.div`
  width: 200px;
  background-color: #ffffff;
  border-radius: 16px;
  margin: 4px 8px;
  padding: 9px 12px;
  word-break: normal;
`;

const MyNick = styled.div`
  margin: 10px 0px 0px 540px;
  font-weight: 600;
`;
const MyChat = styled.div`
  width: 200px;
  background-color: #3fbe81;
  color: white;
  border-radius: 16px;
  padding: 9px 12px;
  margin: 4px 8px 4px 380px;
  word-break: normal;
`;

export default Talk;
