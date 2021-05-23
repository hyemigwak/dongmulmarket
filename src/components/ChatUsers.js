import React, { memo, useState, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ChatUserButton from "./ChatUserButton";
import user from "../image/user.png";
import { useMediaQuery } from "react-responsive";

const ChatUsers = memo(({ socket }) => {
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  const userList = useSelector((state) => state.chat.user_list);
  const { email: loginEmail } = useSelector((state) => state.user.user);
  const { itemId, email, icrId } = useSelector((state) => state.post.detail_list);

  //모바일 유저창 열고 닫기
  const [userOpen, setuserOpen] = useState(false);
  const open = () => {
    if (userOpen) {
      setuserOpen(false);
    } else {
      setuserOpen(true);
    }
  };
  const close = () => setuserOpen(false);
  console.log(userOpen);
  const userListsBox = useRef();

  const handleClickOutside = ({ target }) => {
    if (userOpen) setuserOpen(false);
  };

  return (
    <Wrapping>
      <ImgBox onClick={open} src={user}></ImgBox>

      {userOpen ? (
        <>
          <LiveChatBox isBoss>
            {userList?.map((user, idx) => {
              return (
                <OneChatUser open={userOpen} close={close} ref={userListsBox} key={idx}>
                  <LiveUser>{user.nickname}</LiveUser>
                  {loginEmail === email ? <ChatUserButton itemId={itemId} socket={socket} icrId={icrId} userEmail={user.email} loginEmail={loginEmail} /> : <></>}
                </OneChatUser>
              );
            })}
          </LiveChatBox>
        </>
      ) : null}
    </Wrapping>
  );
});

const Wrapping = styled.div``;

const ImgBox = styled.img`
  position: relative;
  bottom: 30px;
  right: 30px;
  @media (max-width: 767px) {
    position: absolute;
    cursor: pointer;
    top: 550px;
    left: 220px;
  }

  @media (min-width: 768px) and (max-width: 1190px) {
    position: relative;
    left: 515px;
    top: 340px;
  }
`;

const LiveChatBox = styled.div`
  width: 175px;
  height: 522px;
  flex-grow: 0;
  margin-top: 0px;
  ${(props) => (props.isBoss ? "background-color:#3fbe81" : "background-color: #d9d9d9")}

  display: block;
  position: relative;
  bottom: 20px;
  @media (max-width: 767px) {
    position: absolute;
    left: 95px;
    top: 580px;
  }
  @media (min-width: 768px) and (max-width: 1190px) {
    position: absolute;
    left: 545px;
    top: 370px;
  }
`;

const OneChatUser = styled.div`
  width: 150px;
  height: 47.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid #ffffff;
  border-radius: 20px;
  background-color: #52c41a;
`;

const LiveUser = styled.div`
  flex-grow: 0;
  margin: 0px 20px 0px 6px;
  font-size: 16px;
  line-height: 1.71;
  color: #ffffff;
`;

export default ChatUsers;
