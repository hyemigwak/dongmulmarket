import React, { useEffect, useCallback, memo } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import { actionCreators as postActions } from "../redux/modules/post";

const ChatUserButton = memo(({ itemId, socket, icrId, userEmail }) => {
  const dispatch = useDispatch();

  //유저 물품 교환하는 기능
  const exChangeUser = useCallback(() => {}, []);
  //유저 강퇴하는 기능
  const kickUser = useCallback(
    (email) => {
      console.log("hi");
      dispatch(postActions.kickUserList(socket, { itemId, email, icrId }));
    },
    [dispatch, itemId, icrId, socket]
  );

  return (
    <>
      <CheckCircleOutlineIcon
        onClick={exChangeUser}
        style={{
          color: "green",
          marginRight: "10px",
          width: "20px",
          cursor: "pointer",
        }}
      />
      <HighlightOffIcon
        onClick={() => kickUser(userEmail)}
        style={{ color: "gray", width: "20px", cursor: "pointer" }}
      />
    </>
  );
});

export default ChatUserButton;
