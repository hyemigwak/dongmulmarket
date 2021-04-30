import React from "react";
import styled from "styled-components";

export const ContactChat = () => {
  return (
    <div>
      <ContactContainer>
        <Content>
          <div>구매자: 곽곽이</div>
          <div>구매자 주소: 서울시 동작구 동작 2동</div>
          <div>전화번호: 010-0000-0000</div>
          <div>채팅영역입니다</div>
          <button>구매확정</button>
        </Content>
      </ContactContainer>
    </div>
  );
};

const ContactContainer = styled.div`
  width: 25rem;
  height: 25rem;
  background-color: #eeeeee;
  border-radius: 14px;
  margin: 10% auto;
`;

const Content = styled.div`
  position: relative;
  top: 110px;
  left: 70px;
  div {
    font-size: 18px;
  }
`;

export default ContactChat;
