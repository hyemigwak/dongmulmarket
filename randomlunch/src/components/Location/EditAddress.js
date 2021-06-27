import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import DaumPostcode from "react-daum-postcode";
import Swal from "sweetalert2";

const EditAddress = (props) => {
  const dispatch = useDispatch();
  const { open, close } = props;

  const editMyAddress = () => {
    //디스패치하기(주소 수정해서 서버로 보내주기, 마이페이지 주소설정도 바뀌어야함)
    Swal.fire({
      title: "주소를 수정했습니다!",
      confirmButtonColor: "#3fbe81",
      confirmButtonText: "확인",
    });
    close();
  };

  // 주소 검색 한 것 받음
  const [isZoneCode, setIsZoneCode] = useState();
  const [isAddress, setIsAddress] = useState();
  const [MyAddress, setMyAddress] = useState();

  const [isPostOpen, setIsPostOpen] = useState(false); // 주소창 열고 닫기

  // 상세주소
  const [isAddressPlus, setIsAddressPlus] = useState("");
  const onChangeAddressPlus = useCallback((e) => setIsAddressPlus(e.target.value), []);

  // 우편번호 / 주소 찾기
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setIsZoneCode(data.zonecode);
    setIsAddress(fullAddress);
    setIsPostOpen(false);
  };

  return (
    <React.Fragment>
      {open ? (
        <Container>
          <Btn
            onClick={() => {
              setIsPostOpen(true);
            }}
          >
            주소찾기
          </Btn>
          {isPostOpen && <DaumPostcode onComplete={handleComplete} />}

          <AddressInputArea>
            <AddressInput type="text" id="postcode" value={isZoneCode} placeholder="우편 번호" />
            <AddressInput type="text" value={isAddress} placeholder="도로명 주소" />
            <AddressInput type="text" value={MyAddress} placeholder="지명 주소" />
            <AddressInput type="text" value={isAddressPlus} onChange={onChangeAddressPlus} placeholder="상세 주소를 입력해주세요! (공란 가능)" />
          </AddressInputArea>
          <Btn onClick={editMyAddress}>수정</Btn>
          <Btn onClick={close}>뒤로</Btn>
        </Container>
      ) : null}
    </React.Fragment>
  );
};

const Container = styled.div`
  width: 30rem;
  height: 40rem;
  z-index: 1000;
  background-color: #ffffff;
  position: absolute;
`;

const Info = styled.div`
  font-size: 14px;
`;

const Input = styled.input`
  width: 300px;
  height: 3rem;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.07);
  border: none;
  border-radius: 16px;
  margin: 1rem 1rem;
`;

const AddressInput = styled(Input)`
  width: 400px;
`;

const Btn = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 16px;
  background: #ffc149;
  border: none;
  color: white;
  font-weight: 600;
  margin: 1rem 0.2rem;
`;

const AddressInputArea = styled.div`
  display: inline-block;
`;

export default EditAddress;
