import React, { useEffect, useCallback, memo } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import userX from "../image/userX.png";
import userCheck from "../image/userCheck.png";

import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as chatActions } from "../redux/modules/chat";

const ChatUserButton = memo(({ itemId, socket, icrId, userEmail, loginEmail }) => {
  const dispatch = useDispatch();

  //유저 물품 교환하는 기능
  const exchangeUser = useCallback((email) => {
    dispatch(postActions.exchangeUserList(socket, { itemId, email, icrId, loginEmail }));
  }, []);

  //유저 강퇴하는 기능
  const kickUser = useCallback((email) => {
    dispatch(postActions.kickUserList(socket, { itemId, email, icrId }));
  }, []);

  return (
    <>
      {userEmail === loginEmail ? null : (
        <>
          <OkBox
            onClick={() => exchangeUser(userEmail)}
            src={userCheck}
            style={{
              marginRight: "10px",
              width: "20px",
              cursor: "pointer",
            }}
          />
          <KickBox onClick={() => kickUser(userEmail)} src={userX} style={{ width: "20px", cursor: "pointer" }} />
        </>
      )}
    </>
  );
});

const OkBox = styled.img``;

const KickBox = styled.img``;
export default ChatUserButton;
