import React from "react";
import { Grid, Text, Input, Button } from "../elements";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

// 이메일 형식 체크하는 함수를 가져옵니다.
import { emailCheck } from "../shared/common";

const Signup = (props) => {
  const dispatch = useDispatch();

  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [pwd_check, setPwdCheck] = React.useState("");
  const [user_name, setUserName] = React.useState("");

  const signup = () => {
    // 아이디와 패스워드, 유저 닉네임이 있는 지 확인!
    // 미들웨어에서 처리해도 괜찮지만, 딱봐도 어림없는 값(공백 등등)이 굳이 미들웨어까지 갈 필요 없으니 여기에서 막아줄거예요.
    if (id === "" || pwd === "" || pwd_check === "" || user_name === "") {
      window.alert("아이디, 패스워드, 닉네임을 모두 입력해주세요!");
      return;
    }

    // id가 이메일 형식이 맞나 확인!
    if (!emailCheck(id)) {
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    }

    // 비밀번호와 비밀번호 확인 부분이 일치하나 확인!
    if (pwd !== pwd_check) {
      window.alert("패스워드와 패스워드 확인이 일치하지 않습니다!");
      return;
    }

    // 회원가입 함수를 디스패치합니다.(비밀번호 확인은 비밀번호와 똑같으니 굳이 넘기지 않았어요!)
    dispatch(userActions.signupFB(id, pwd, user_name));
  };
  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="32px" bold>
          회원가입
        </Text>

        <Grid padding="16px 0px">
          <Input
            label="아이디"
            placeholder="아이디를 입력해주세요."
            _onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="닉네임"
            placeholder="닉네임을 입력해주세요."
            _onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            _onChange={(e) => {
              setPwd(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 다시 입력해주세요."
            _onChange={(e) => {
              setPwdCheck(e.target.value);
            }}
          />
        </Grid>

        <Button _onClick={signup}>회원가입하기</Button>
      </Grid>
    </React.Fragment>
  );
};

Signup.defaultProps = {};

export default Signup;
