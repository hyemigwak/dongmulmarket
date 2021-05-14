import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as chatActions } from "../redux/modules/chat";
import { getCookie } from "../shared/Cookie";
import io from "socket.io-client";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const ChatUsers = (props) => {
  const dispatch = useDispatch();
  const token = getCookie("user_login");
  const userList = useSelector((state) => state.chat.user_list);
  console.log(userList);
  const email = getCookie("email");
  // const icrId = userList.icrId;
  const itemId = props.itemId;

  // const socket = io.connect("http://15.165.76.76:3001/chatting", { query: `email=${email}&icrId=${icrId}` });

  // useEffect(() => {
  //   socket.connect();

  //   //athenticate 인증하고, 강퇴 사용자 받아오기
  //   socket.emit(
  //     "authenticate",
  //     {
  //       token: token,
  //     },
  //     (data) => {
  //       if (data["msg"] === "success") {
  //         console.log("msg가 성공이라면 if문");
  //         const data = {
  //           email: email,
  //           itemId: itemId,
  //           icrId: icrId,
  //         };
  //         //버튼 누르면 누가 나갔는지 서버에 보내준다
  //         socket.emit("kickUser", data);
  //         //서버에서 내려준 참여자 목록을 저장해서 화면에 보여준다
  //         socket.on("kickUser", (kickData) => {
  //           console.log("강퇴된 사용자는 누구?", kickData);
  //           dispatch(chatActions.removeUserList(kickData));
  //         });
  //       }
  //     }
  //   );
  //   //이전 대화 히스토리 받아오기
  //   // socket.on("setRoom", (data) => {
  //   //   console.log("셋룸데이터", data);
  //   //   dispatch(chatActions.getAllChatList(data));
  //   // });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  // 방장은 방장 뱃지를 보여줄 것

  //유저 강퇴하는 기능
  const kickUser = () => {};

  return (
    <div>
      <LiveChatBox isBoss>
        {userList?.map((user, idx) => {
          return (
            <OneChatUser key={idx}>
              <LiveUser>{user.nickname}</LiveUser>
              <LiveTalkBtn>대화하기</LiveTalkBtn>
              <HighlightOffIcon onClick={kickUser} style={{ color: "gray", marginRight: "5px", width: "16px", cursor: "pointer" }} />
            </OneChatUser>
          );
        })}
      </LiveChatBox>
    </div>
  );
};

const LiveChatBox = styled.div`
  width: 175px;
  height: 522px;
  flex-grow: 0;
  margin-top: 44px;
  ${(props) => (props.isBoss ? "background-color:#3fbe81" : "background-color: #d9d9d9")}
  /* background-color: #d9d9d9; */
  display: block;
`;

const OneChatUser = styled.div`
  width: 175px;
  height: 47.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #b4b4b4;
  background-color: #efefef;
`;

const LiveUser = styled.div`
  flex-grow: 0;
  margin: 0px 20px 0px 6px;
  font-size: 14px;
  line-height: 1.71;
  color: #373737;
`;

const LiveTalkBtn = styled.div`
  width: 68px;
  height: 24px;
  padding: 3px 11px;
  font-size: 12px;
  border-radius: 83px;
  background-color: #a8a8a8;
  color: #ffffff;
  cursor: point;
  margin-right: 8px;
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
