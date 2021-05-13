import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as chatActions } from "../redux/modules/chat";
import { getCookie } from "../shared/Cookie";
import io from "socket.io-client";

const ChatUsers = (props) => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.chat.user_list);
  const email = getCookie("email");
  const icrId = userList.icrId;
  const socket = io.connect("http://15.165.76.76:3001/chatting", { query: `email=${email}&icrId=${icrId}` });

  useEffect(() => {
    socket.connect();
    //이전 대화 히스토리 받아오기
    socket.on("setRoom", (data) => {
      console.log("셋룸데이터", data);
      dispatch(chatActions.getUserList(data));
    });
  }, [userList]);

  // 방장은 방장 뱃지를 보여줄 것
  // const is_boss = user_list?.map((b) => (b.email === email ? true : false));

  //isBoss가 true라면 색깔을 바꿀것이다.
  return (
    <div>
      <LiveChatBox isBoss>
        {userList?.map((user, idx) => {
          return (
            <OneChatUser key={idx}>
              <LiveUser>{user.nickname}</LiveUser>
              <LiveTalkBtn>대화하기</LiveTalkBtn>
            </OneChatUser>
          );
        })}
      </LiveChatBox>
    </div>
  );
};

const LiveChatBox = styled.div`
  width: 158px;
  height: 522px;
  flex-grow: 0;
  margin-top: 44px;
  ${(props) => (props.isBoss ? "background-color:#3fbe81" : "background-color: #d9d9d9")}
  /* background-color: #d9d9d9; */
  display: block;
`;

const OneChatUser = styled.div`
  width: 158px;
  height: 47.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #b4b4b4;
  background-color: #efefef;
`;

const LiveUser = styled.div`
  flex-grow: 0;
  margin: 0px 20px 0px 0px;
  font-size: 14px;
  line-height: 1.71;
  color: #373737;
`;

const LiveTalkBtn = styled.div`
  width: 74px;
  height: 24px;
  padding: 3px 14px;
  font-size: 12px;
  border-radius: 83px;
  background-color: #a8a8a8;
  color: #ffffff;
  cursor: point;
`;

const EntranceMsg = styled.div`
  width: 270px;
  height: 24px;
  flex-grow: 0;
  margin: 14px auto;
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: center;
  color: #7d7d7d;
`;

export default ChatUsers;
