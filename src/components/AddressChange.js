import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import DaumPostcode from "react-daum-postcode";
import { Container } from "../element";
import Swal from "sweetalert2";

const { daum } = window;

const AddressChange = (props) => {
  const dispatch = useDispatch();
  const { open, close } = props;

  const { email } = useSelector((state) => state.user.user);

  const editMyAddress = () => {
    dispatch(postActions.ChangeAddressAPI(email, new_address));
    close();
  };

  //주소창 열고 닫기
  const [isPostOpen, setIsPostOpen] = useState(false);

  // 지번주소만 서버에 보내주면 됨
  const [isAddress, setIsAddress] = useState("");
  const str = isAddress.split(" ");
  const new_address = str[0] + " " + str[1];

  // 우편번호 / 주소 찾기
  function sample4_execDaumPostcode() {
    new daum.Postcode({
      onComplete: function (data) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var roadAddr = data.roadAddress; // 도로명 주소 변수
        var extraRoadAddr = ""; // 참고 항목 변수

        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraRoadAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraRoadAddr += extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraRoadAddr !== "") {
          extraRoadAddr = " (" + extraRoadAddr + ")";
        }

        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        document.getElementById("sample4_postcode").value = data.zonecode;
        document.getElementById("sample4_roadAddress").value = roadAddr;
        document.getElementById("sample4_jibunAddress").value = data.jibunAddress;
        setIsAddress(data.jibunAddress);

        // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
        // if (roadAddr !== "") {
        //   document.getElementById("sample4_extraAddress").value = extraRoadAddr;
        // } else {
        //   document.getElementById("sample4_extraAddress").value = "";
        // }

        var guideTextBox = document.getElementById("guide");
        // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
        if (data.autoRoadAddress) {
          var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
          guideTextBox.innerHTML = "(예상 도로명 주소 : " + expRoadAddr + ")";
          guideTextBox.style.display = "block";
        } else if (data.autoJibunAddress) {
          var expJibunAddr = data.autoJibunAddress;
          guideTextBox.innerHTML = "(예상 지번 주소 : " + expJibunAddr + ")";
          guideTextBox.style.display = "block";
        } else {
          guideTextBox.innerHTML = "";
          guideTextBox.style.display = "none";
        }
      },
    }).open();
  }

  return (
    <React.Fragment>
      {open ? (
        <Container>
          <ContainerBox>
            {isPostOpen && <DaumPostcode />}
            <AddressInputArea>
              <TextInputC>
                <SmallTitle>도로명 주소</SmallTitle>
                <AInput type="text" id="sample4_roadAddress" placeholder="도로명주소를 입력하세요" />
              </TextInputC>

              <TextInputC>
                <SmallTitle>지번 주소</SmallTitle>
                <AInput type="text" id="sample4_jibunAddress" placeholder="지번주소를 입력하세요" value={isAddress} />
                <span id="guide" style={{ color: "#999", display: "none" }}></span>
              </TextInputC>

              <TextInputC>
                <SmallTitle>상세주소</SmallTitle>
                <AInput type="text" id="sample4_detailAddress" placeholder="상세주소를 입력하세요" />
              </TextInputC>

              <TextInputC>
                <SmallTitle>우편번호</SmallTitle>
                <PInput type="text" id="sample4_postcode" placeholder="우편번호 입력" />
                <SInput type="button" onClick={sample4_execDaumPostcode} value="우편번호 검색" />
              </TextInputC>

              {/* <PInput type="text" id="sample4_extraAddress" placeholder="참고항목" /> */}
            </AddressInputArea>
            <BtnArea>
              <Btn onClick={close}>뒤로가기</Btn>
              <Btn onClick={editMyAddress}>수정하기</Btn>
            </BtnArea>
          </ContainerBox>
        </Container>
      ) : null}
    </React.Fragment>
  );
};

const ContainerBox = styled.div`
  width: 600px;
  height: 380px;
  z-index: 1000;
  background-color: #ffffff;

  border-radius: 8px;
  position: absolute;
  left: 50%;
  top: -1%;
  transform: translateX(-50%);
  border: solid 1px #ffffff;

  @media (max-width: 767px) {
    width: 310px;
  }
`;

const TextInputC = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 767px) {
    width: 300px;
  }
`;

const SmallTitle = styled.div`
  width: 90px;
  height: 24px;
  font-size: 18px;
  line-height: 1.33;
  text-align: left;
  color: #2f2f2f;

  @media (max-width: 767px) {
    width: 100%;
    font-size: 12px;
  }
`;

const AInput = styled.input`
  width: 359px;
  height: 56px;
  padding: 14px 97px 14px 16px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.07);
  border: 3px solid #d2d2d2;
  border-radius: 8px;
  margin: 24px 68px 24px 97px;
  ::placeholder {
    font-size: 18px;
    line-height: 1.33;
    color: #b5b5b5;

    @media (max-width: 768px) {
      font-size: 12px;
      padding: 4px 0px;
    }
  }
  :hover {
    border: 3px solid #656565;
  }

  @media (max-width: 768px) {
    margin: 12px auto 12px;
    padding: 12px 15px;
    width: 230px;
    height: 48px;
  }
`;

const PInput = styled.input`
  width: 199px;
  height: 57px;
  margin: 16px 16px 16px 97px;
  padding: 14px 40px 14px 16px;
  border-radius: 8px;
  border: 3px solid #c4c4c4;
  ::placeholder {
    color: #b5b5b5;
    font-size: 18px;
    line-height: 1.33;

    @media (max-width: 768px) {
      font-size: 12px;
      padding: 4px 10px;
    }
  }
  :hover {
    border: 3px solid #656565;
  }
  @media (max-width: 768px) {
    width: 130px;
    margin: 20px 5px;
    height: 48px;
    padding: 14px 10px;
  }
`;

const SInput = styled.input`
  width: 144px;
  height: 55px;
  flex-grow: 0;
  margin: 14px 68px 14px 16px;
  padding: 12px 2px;
  border-radius: 8px;
  border: 3px solid #6fcea1;
  background-color: #ffffff;
  font-size: 18px;
  color: #6fcea1;
  line-height: 1.33;

  :hover {
    background-color: #3fbe81;
    color: #ffffff;
  }
  cursor: pointer;

  @media (max-width: 768px) {
    width: 85px;
    margin: 20px 7px;
    height: 48px;
    font-size: 12px;
  }
`;

const Btn = styled.button`
  width: 115px;
  height: 50px;
  border-radius: 8px;
  background-color: #d6d6d6;
  border: none;
  color: white;
  font-weight: 600;
  margin: 2rem 0.5rem;
  font-size: 18px;
  cursor: pointer;
  :hover {
    background-color: #3fbe81;
  }

  @media (max-width: 767px) {
    width: 90px;
    height: 44px;
    font-size: 15px;
    margin: 20px 10px;
  }
`;

const BtnArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  @media (max-width: 767px) {
    width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
  }
`;

const AddressInputArea = styled.div`
  display: inline-block;
  @media (max-width: 767px) {
    width: 300px;
  }
`;

export default AddressChange;
