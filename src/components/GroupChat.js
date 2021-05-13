import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

const GroupChat = (props) => {
  const email = localStorage.getItem("email");
  const is_me = email === props.email ? true : false;

  if (is_me) {
    return (
      <>
      <ChatView>
        {/* 판매자는 오른쪽에 위치해야합니다. */}
        <>{props.status === "in" && <EntranceMsg>{props.nickname}님이 입장하셨습니다.</EntranceMsg>}</>
        <MySpeech>
          <MyNameTag>{props.nickname}</MyNameTag>
          <MyBubble>
            <ChatText>{props.chatMsg}</ChatText>
          </MyBubble>
        </MySpeech>
      </ChatView>
      </>
    );
  } else {
    return (
      <>
      <ChatView>
          {/* 구매자는 왼쪽에 위치해야합니다. */}
          <OtherSpeech>
          <OtherNameTag>{props.nickname}</OtherNameTag>
          <OtherBubble>
            <ChatText>{props.chatMsg}</ChatText>
          </OtherBubble>
        </OtherSpeech>
      </ChatView>
      
      </>
    );
  }
};

const EntranceMsg = styled.div`
  width: 270px;
  height: 24px;
  flex-grow: 0;
  margin: 0 auto 8px auto;
  font-family: NotoSans;
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: center;
  color: #7d7d7d;
`;

const MySpeech = styled.div`
  align-items: right;
  margin-left: 350px;
`;

const OtherSpeech = styled.div``;

const MyNameTag = styled.div`
  color: #4c4c4c;
  flex-grow: 0;
  width: 90px;
  margin: 0 0px 6px 187px;
  font-family: NotoSans;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
`;

const OtherNameTag = styled.div`
  color: #4c4c4c;
  flex-grow: 0;
  margin: 0 396px 6px 12px;
  font-family: NotoSans;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
`;

const MyBubble = styled.div`
  width: 300px;
  height: 49px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;

  padding: 12px 16px;
  border-radius: 10px;
  background-color: #a8a8a8;
`;

const OtherBubble = styled.div`
  width: 300px;
  height: 49px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  margin: 0 0 0 12px;
  padding: 12px 16px;
  border-radius: 10px;
  background-color: #3fbe81;
`;

const ChatText = styled.div`
  margin: 9px 35px 10px 0;
  font-family: NotoSans;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: #ffffff;
`;

export default GroupChat;
