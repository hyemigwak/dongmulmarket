import React, { memo } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { actionCreators as chatActions } from "../redux/modules/chat";
import ChatUserButton from "./ChatUserButton";

const ChatUsers = memo(({ socket }) => {
  const userList = useSelector((state) => state.chat.user_list);
  const { email: loginEmail } = useSelector((state) => state.user.user);
  const { itemId, email, icrId } = useSelector(
    (state) => state.post.detail_list
  );

  return (
    <Wrapping>
      <LiveChatBtn>실시간 대화 참여</LiveChatBtn>
      <LiveChatBox isBoss>
        {userList?.map((user, idx) => {
          return (
            <OneChatUser key={idx}>
              <LiveUser>{user.nickname}</LiveUser>

              {loginEmail === email ? (
                <ChatUserButton
                  itemId={itemId}
                  socket={socket}
                  icrId={icrId}
                  userEmail={user.email}
                />
              ) : (
                <></>
              )}
            </OneChatUser>
          );
        })}
      </LiveChatBox>
    </Wrapping>
  );
});

const Wrapping = styled.div``;

const LiveChatBtn = styled.div`
  width: 158px;
  height: 24px;
  flex-grow: 0;
  margin-left: 25px;
  font-size: 18px;
  line-height: 1.33;
  text-align: left;
  color: #7d7d7d;
  cursor: pointer;
  position: absolute;
  top: 225px;
`;

const LiveChatBox = styled.div`
  width: 175px;
  height: 522px;
  flex-grow: 0;
  margin-top: 0px;
  ${(props) =>
    props.isBoss ? "background-color:#3fbe81" : "background-color: #d9d9d9"}
  /* background-color: #d9d9d9; */
  display: block;
  position: relative;
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
  font-size: 16px;
  line-height: 1.71;
  color: #373737;
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
