import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import SettingsIcon from "@material-ui/icons/Settings";

const Setting = (props) => {
  return (
    <Container>
      <SettingTitle>
        <SettingsIcon />
        설정
      </SettingTitle>
      <SettingInfo>
        <p
          onClick={() => {
            history.push("/settingpage");
          }}
        >
          기본 설정
        </p>
        <p
          onClick={() => {
            history.push("/mypage");
          }}
        >
          식사 내역 확인
        </p>
      </SettingInfo>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  top: 0px;
  left: 50px;
  width: 10rem;
`;

const SettingTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

const SettingInfo = styled.div`
  border-right: 1px solid #212121;
  border-top: 1px solid #212121;
  height: 15rem;
  p {
    cursor: pointer;
  }
`;

export default Setting;
