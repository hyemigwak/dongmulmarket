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
    <div>
      <FindPwdArea>
        <div>
          <input type="text" placeholder="이메일을 입력해주세요" value={email} onChange={onChageEmail} />
        </div>
        <button onClick={onSiteFindPwd}>비밀번호찾기</button>
      </FindPwdArea>
    </div>
  );
};

const FindPwdArea = styled.div`
  width: 20rem;
  margin: 15% auto;
  background-color: #efefef;
  border-radius: 10px;
  text-align: center;
  display: block;
`;

export default Findpwd;
