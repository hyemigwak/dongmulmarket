import React, { memo, useState, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ChatUserButton from "./ChatUserButton";
import { useMediaQuery } from "react-responsive";

import user from "../../image/user.png";
import down from "../../image/down.png";

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

  const userListsBox = useRef();
  const userListBtn = useRef();

  const handleClickOutside = ({ target }) => {
    if (userOpen) setuserOpen(false);
  };

  return (
    <Wrapping>
      {isMobile ? (
        <ImgBox onClick={open} src={user}></ImgBox>
      ) : (
        <WrapBtns>
          <LiveTitleText>실시간 대화참여</LiveTitleText>
          <ArrowBox onClick={open} src={down} ref={userListBtn} />
        </WrapBtns>
      )}

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
    cursor: pointer;
    position: relative;
    top: 15px;
  }

  @media (min-width: 768px) and (max-width: 1190px) {
  }
`;

const WrapBtns = styled.div`
  display: flex;
  position: relative;
  bottom: -15px;
  left: 15px;

  @media (min-width: 768px) and (max-width: 1190px) {
  }
`;

const LiveTitleText = styled.div`
  width: 120px;
  height: 24px;
  font-size: 16px;
  line-height: 1.33;
  text-align: left;
  color: #7d7d7d;
`;

const ArrowBox = styled.img`
  width: 24px;
  height: 24px;
`;

const LiveChatBox = styled.div`
  width: 190px;
  height: 522px;
  flex-grow: 0;

  margin-left: 10px;
  ${(props) => (props.isBoss ? "background-color:#3fbe81" : "background-color: #d9d9d9")}

  display: block;
  position: relative;
  bottom: -20px;

  @media (max-width: 767px) {
    position: absolute;
    top: 840px;
    left: 45%;
  }
`;

const OneChatUser = styled.div`
  width: 180px;
  height: 47.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #52d094;
  border-radius: 10px;
  background-color: #ffffff;
  margin-bottom: 5px;
  padding-right: 8px;

  @media (max-width: 767px) {
    width: 130px;
    height: 40px;
  }
`;

const LiveUser = styled.div`
  flex-grow: 0;
  margin: 0px 15px 0px 13px;
  font-size: 16px;
  line-height: 1.71;
  color: #373737;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export default ChatUsers;
