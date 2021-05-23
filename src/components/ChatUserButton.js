import React, { useEffect, useCallback, memo } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

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
    console.log(email);
    dispatch(postActions.kickUserList(socket, { itemId, email, icrId }));
  }, []);

  return (
    <>
      <CheckCircleOutlineIcon
        onClick={() => exchangeUser(userEmail)}
        style={{
          color: "green",
          marginRight: "10px",
          width: "20px",
          cursor: "pointer",
        }}
      />
      <HighlightOffIcon onClick={() => kickUser(userEmail)} style={{ color: "gray", width: "20px", cursor: "pointer" }} />
    </>
  );
});

export default ChatUserButton;
