import React from "react";
import { Setting } from "./index";
import styled from "styled-components";

const SettingPage = () => {
  return (
    <Container>
      <SettingContainer>
        <Setting />
      </SettingContainer>
      <SettingInfo>
        <p>반경 몇 km 이내의 음식점을 검색할까요?</p>
        <input type="number" min="1" max="10" defaultValue="1" />
        <p>몇일 전 까지의 메뉴를 제외할까요?</p>
        <input type="number" min="1" max="30" defaultValue="3" />
      </SettingInfo>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const SettingInfo = styled.div`
  position: relative;
  top: 180px;
  left: 400px;
`;

const SettingContainer = styled.div`
  position: relative;
  top: 200px;
`;

export default SettingPage;
