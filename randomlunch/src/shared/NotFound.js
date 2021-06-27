import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import logo1 from "../image/logo1.png";

const NotFound = () => {
  return (
    <React.Fragment>
      <Box>
        <img src={logo1} alt="로고이미지" />
        <NoPage>페이지를 찾을 수 없습니다.</NoPage>
        <NoPage2>링크를 잘못 입력하셨거나 페이지가 삭제/이동되었을 수 있습니다.</NoPage2>
        <MoveBtn
          onClick={() => {
            history.push("/");
          }}
        >
          메인화면으로 이동하기
        </MoveBtn>
      </Box>
    </React.Fragment>
  );
};

const Box = styled.div`
  width: 600px;
  margin: 260px auto 0px;
  text-align: center;
`;

const NoPage = styled.div`
  font-size: 36px;
  font-weight: 600;
  margin: 15px auto;
`;

const NoPage2 = styled.div`
  font-size: 18px;
  margin: 10px auto;
`;

const MoveBtn = styled.div`
  cursor: pointer;
  background-color: #3fbe81;
  border-radius: 8px;
  padding: 9px 25px;
  width: 240px;
  height: 50px;
  color: #ffffff;
  font-weight: 600;
  font-size: 20px;
  margin: 40px auto 0px;
`;

export default NotFound;
