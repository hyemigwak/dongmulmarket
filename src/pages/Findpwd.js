import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import styled from "styled-components";
import { history } from "../redux/configureStore";

const Findpwd = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const onChageEmail = useCallback((e) => setEmail(e.target.value), []);

  //이메일 정규표현식
  const email_regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  const onSiteFindPwd = () => {
    if (email === "") {
      window.alert("이메일을 써주세요!");
      return;
    }
    if (!email_regExp.test(email)) {
      window.alert("이메일이 맞지 않습니다");
      return;
    }
    dispatch(userActions.FindPwdAPI(email));
    window.alert("가입하신 이메일로 비밀번호 재설정 메일을 보내드렸습니다");
    history.push("/login");
  };

  return (
    <React.Fragment>
      <WrapFindPwd>
        <FindPwdC>
           <Input type="text" placeholder="이메일을 입력해주세요" value={email} onChange={onChageEmail} />
            <FindpwdBtn onClick={onSiteFindPwd}>비밀번호찾기</FindpwdBtn>
           
        </FindPwdC>
      </WrapFindPwd>
    </React.Fragment> 
    
  );
};

const WrapFindPwd = styled.div`
  /* 최상단과 항상 떨어져 있게 함 */
  padding-top: 60px; 
  display: flex;
  flex-direction: column;
  /* @media (max-width: 1000px){
    heigth: 
  } */
`;

const FindPwdC = styled.div`
  width: 500px;
  height:200px;
  margin: auto;
  margin-top: 20px;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0px;
  border-radius:30px;
`;

const Input = styled.input`
  width: 300px;
  height:40px;
  margin: 50px;
  border: 1px solid #DBDBDB;
  border-radius: 10px;
`;

const FindpwdBtn = styled.button`
  width: 120px;
  padding: 7px 0px 7px 0px;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 600;
  margin-top: 10px;
  border: 1px solid #DBDBDB;
  cursor:pointer;
  outline: none;
  background-color: #0095f6;
  color: white;
`;


export default Findpwd;
