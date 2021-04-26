import React from 'react'
import styled from "styled-components";


const Signup = (props) => {
    return (
        <div>
            <SingUpArea>
                <EmailArea>
                    <Input type="text" placeholder="이메일을 입력해주세요"/>
                    <button>인증</button>
                </EmailArea>
                <Input type="text" placeholder="인증번호를 입력해주세요"/>
                <Input type="password" placeholder="비밀번호를 입력해주세요"/>
                <Input type="password" placeholder="비밀번호를 다시 입력해주세요"/>
                <button>회원가입</button>
            </SingUpArea>
        </div>
    )
}

const SingUpArea = styled.div`
   width: 30rem;
   margin: 15% auto;
   background-color: #EFEFEF;
   border-radius: 10px;
   text-align: center;
   display:block;
   
`;

const EmailArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Input = styled.input`
    width: 20rem;
    height: 1.5rem;
    margin: 1rem 0.4rem;
    display: inline-block;
    
`;



export default Signup
