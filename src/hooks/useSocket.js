import { useEffect, useRef } from "react";
import io from "socket.io-client";
import { useDispatch } from "react-redux";

import { actionCreators as chatActions } from "../redux/modules/chat";
import { actionCreators as postActions } from "../redux/modules/post";

const useSocket = (serverUrl, email, icrId, chatJoinYn) => {
  const dispatch = useDispatch();
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect(serverUrl, {
      query: `email=${email}&icrId=${icrId}`,
    });
    dispatch(chatActions.getAllChatList(socketRef.current));

    return () => {
      socketRef.current.disconnect();
      dispatch(chatActions.clearOne());
      dispatch(postActions.clearPost());
      console.log("연결해제");
    };
  }, [serverUrl, email, icrId]);

  useEffect(() => {
    if (!chatJoinYn) {
      dispatch(chatActions.addChatList(socketRef.current));
      dispatch(chatActions.addUserList(socketRef.current, { email, icrId }));
    }
  }, [chatJoinYn]);

  return socketRef.current;
};

export default useSocket;
