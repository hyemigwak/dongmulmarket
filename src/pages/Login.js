import React from 'react'
import styled from "styled-components";


const Login = () => {
    return (
        <div>
            <LoginArea>
                <div><Input type="text" placeholder="이메일을 입력해주세요"/></div>
                <div><Input type="password" placeholder="비밀번호를 입력해주세요"/></div>
                <div><input type="checkbox"/><span>자동로그인</span></div>
                <BtnArea>
                    <button>로그인</button>
                    <button>구글 로그인</button>
                </BtnArea>
                <p>회원가입</p>/<p>비밀번호 찾기</p>
            </LoginArea>
        </div>
    )
}

const LoginArea = styled.div`
   width: 30rem;
   margin: 15% auto;
   background-color: #EFEFEF;
   border-radius: 10px;
   text-align: center;
   display:block;
   
`;
const BtnArea = styled.div`
    display:block;
`;
const Input = styled.input`
    width: 70%;
    height: 1.5rem;
    margin: 0.4rem 0rem;
`;

export default Login
