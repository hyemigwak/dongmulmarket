import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

const EditAddress = (props) => {
  const dispatch = useDispatch();
  const { open, close } = props;
  const [newAddress, setNewAddress] = useState("");
  const onChangeNewAddress = useCallback((e) => setNewAddress(e.target.value), []);

  const editMyAddress = () => {
    //디스패치하기(주소 수정해서 서버로 보내주기, 마이페이지 주소설정도 바뀌어야함)
    window.alert("주소를 수정했습니다!");
    close();
  };

  return (
    <React.Fragment>
      {open ? (
        <div>
          <NewAddress>새로운 주소를 적어주세요!</NewAddress>
          <Input type="text" value={newAddress} onChange={onChangeNewAddress} />
          <Btn onClick={editMyAddress}>수정</Btn>
          <Btn onClick={close}>뒤로</Btn>
        </div>
      ) : null}
    </React.Fragment>
  );
};

const Input = styled.input`
  width: 200px;
  height: 2.5rem;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.07);
  border: none;
  border-radius: 16px;
  margin: 1rem 1rem;
`;

const NewAddress = styled.div`
  margin-top: 10px;
`;

const Btn = styled.button`
  width: 60px;
  height: 30px;
  border-radius: 16px;
  background: #ffc149;
  border: none;
  color: white;
  font-weight: 600;
  margin: 1rem 0.2rem;
`;

export default EditAddress;
