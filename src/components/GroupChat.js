import React, { memo } from "react";
import styled from "styled-components";

const GroupChat = memo(({ me, ...props }) => {
  const is_me = me === props.email ? true : false;
  const ChatTime = props.createdDt;
  const ChatTimeP = ChatTime.split("T")[1].substring(0, 5);

  if (is_me) {
    return (
      <>
        {/* 판매자는 오른쪽에 위치해야합니다. */}
        {props.msgType === "in" ? (
          <EntranceMsg>{props.nickname}님이 입장하셨습니다.</EntranceMsg>
        ) : (
          <>
            {props.msgType === "out" ? (
              <EntranceMsg>{props.nickname}님이 퇴장하셨습니다.</EntranceMsg>
            ) : (
              <>
                <MySpeech>
                  <MyNameTag>{props.nickname}</MyNameTag>
                  <FlexGroup>
                    <ChattingTime>{ChatTimeP}</ChattingTime>
                    <MyBubble>
                      <ChatText>{props.chatMsg}</ChatText>
                    </MyBubble>
                    <MyBubbleTri></MyBubbleTri>
                  </FlexGroup>
                </MySpeech>
              </>
            )}
          </>
        )}
      </>
    );
  } else {
    return (
      <>
        {/* 구매자는 왼쪽에 위치해야합니다. */}
        {props.msgType === "in" ? (
          <EntranceMsg>{props.nickname}님이 입장하셨습니다.</EntranceMsg>
        ) : (
          <>
            {props.msgType === "out" ? (
              <EntranceMsg>{props.nickname}님이 퇴장하셨습니다.</EntranceMsg>
            ) : (
              <OtherSpeech>
                <OtherNameTag>{props.nickname}</OtherNameTag>
                <FlexGroup1>
                  <BubbleTri></BubbleTri>
                  <OtherBubble>
                    <ChatText>{props.chatMsg}</ChatText>
                  </OtherBubble>
                  <ChattingTimeP>{ChatTimeP}</ChattingTimeP>
                </FlexGroup1>
              </OtherSpeech>
            )}
          </>
        )}
      </>
    );
  }
});

const EntranceMsg = styled.div`
  width: 270px;
  height: 24px;
  flex-grow: 0;
  margin: 12px auto 4px auto;
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
  margin-left: 280px;
  margin-bottom: 20px;
`;

const OtherSpeech = styled.div``;

const MyNameTag = styled.div`
  color: #4c4c4c;
  flex-grow: 0;
  width: 110px;
  margin: 0 0px 6px 187px;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;

`;

const FlexGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
  align-items: center;
`;

const FlexGroup1 = styled.div`
  display: flex;
  margin-left: 10px;
  align-items: center;
`;

const ChattingTime = styled.div`
  font-size: 12px;
  color: #7d7d7d;
  height: 100%;
  margin-right: 10px;
`;

const ChattingTimeP = styled.div`
  font-size: 12px;
  color: #7d7d7d;
  margin-left: 10px;
  height: 100%;
`;

const OtherNameTag = styled.div`
  color: #4c4c4c;
  flex-grow: 0;
  margin: 0 366px 6px 28px;
  font-size: 14px;
  font-weight: 500;
  text-align: left;

  @media (max-width: 767px) {
   margin-right:0px;
  }
`;

const MyBubble = styled.div`
  height: 100%;
  max-width: 300px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 18px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: #a8a8a8;
`;

const BubbleTri = styled.div`
  width: 0;
  height: 0;
  border-top: 7px solid transparent;
  border-right: 9px solid #3fbe81;
  border-bottom: 7px solid transparent;
`;

const MyBubbleTri = styled.div`
  width: 0;
  height: 0;
  border-top: 7px solid transparent;
  border-left: 9px solid #a8a8a8;
  border-bottom: 7px solid transparent;
`;

const OtherBubble = styled.div`
  height: 100%;
  max-width: 300px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 4px 18px;
  border-radius: 10px;
  background-color: #3fbe81;
`;

const ChatText = styled.div`
  margin: 6px auto;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.6;
  text-align: left;
  color: #ffffff;
`;

export default GroupChat;
