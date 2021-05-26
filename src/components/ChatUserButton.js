import React, { useEffect, useCallback, memo } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import userX from "../image/userX.png";
import userCheck from "../image/userCheck.png";

import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as chatActions } from "../redux/modules/chat";

const ChatUserButton = memo(({ itemId, socket, icrId, userEmail, loginEmail }) => {
  const dispatch = useDispatch();

  //유저 물품 교환하는 기능
  const exchangeUser = useCallback((email) => {
    Swal.fire({
      title: "교환을 진행 하시겠습니까?",
      showCancelButton: true,
      confirmButtonColor: "#3fbe81",
      cancelButtonColor: "#d6d6d6",
      confirmButtonText: "교환",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(postActions.exchangeUserList(socket, { itemId, email, icrId, loginEmail }));
        Swal.fire({
          title: "교환 완료되었습니다",
          confirmButtonColor: "#3fbe81",
          confirmButtonText: "확인",
        });
      }
    });
  }, []);

  //유저 강퇴하는 기능
  const kickUser = useCallback((email) => {
    Swal.fire({
      title: "정말 강퇴하시겠습니까?",
      showCancelButton: true,
      confirmButtonColor: "#3fbe81",
      cancelButtonColor: "#d6d6d6",
      confirmButtonText: "강퇴",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(postActions.kickUserList(socket, { itemId, email, icrId }));
        Swal.fire({
          title: "강퇴했습니다",
          confirmButtonColor: "#3fbe81",
          confirmButtonText: "확인",
        });
      }
    });
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
