import React from "react";
import { Grid, Text, Button } from "../elements";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import { history } from "../redux/configureStore";
import { apiKey } from "../shared/firebase";

const Header = (props) => {
  const dispatch = useDispatch();

  //   리덕스에서 로그인 중인지 상태값 가져오기
  const is_login = useSelector((state) => state.user.is_login);

  //   세션에 기록된 로그인 정보 가져오기
  // 어떻게 생겼는 지는 파이어베이스에서 결정해요! (우리가 결정할 수 있는 건 저장 위치뿐..!)
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;

  //   세션이(로그인 정보겠죠!) 있나없나 확인해요!
  const is_session = sessionStorage.getItem(_session_key) ? true : false;
  //  아래 주석을 풀고 세션이 있나 없나 확인해볼까요? :)
  //   console.log(is_session);

  // 리덕스에서 is_login이 true로 저장되어 있고, 세션도 있으면 로그인 중인 것으로 판단해요!
  // 로그인 한 뒤 헤더를 보여줄거예요.
  if (is_login && is_session) {
    return (
      <React.Fragment>
        <Grid is_flex padding="4px 16px">
          <Grid>
            <Text margin="0px" size="24px" bold>
              헬로
            </Text>
          </Grid>

          <Grid is_flex>
            <Button
              _onClick={() => {
                dispatch(userActions.logoutFB());
              }}
            >
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  //   로그인 중이 아니라면 로그인 전 헤더를 보여줍니다.
  return (
    <React.Fragment>
      <Grid is_flex padding="4px 16px">
        <Grid>
          <Text margin="0px" size="24px" bold>
            헬로
          </Text>
        </Grid>

        <Grid is_flex>
          <Button
            _onClick={() => {
              history.push("/login");
            }}
          >
            로그인
          </Button>
          <Button
            _onClick={() => {
              history.push("/signup");
            }}
          >
            회원가입
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Header.defaultProps = {};

export default Header;
