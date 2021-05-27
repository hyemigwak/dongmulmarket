import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configureStore";
import { Container } from "../element";
import { FloatBtn, Post } from "../components";
import Spinner from "../shared/Spinner";
import { useMediaQuery } from "react-responsive";
import Swal from "sweetalert2";

const PostList = (props) => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post.post_list);
  const is_loading = useSelector((state) => state.post.is_loading);
  const is_login = useSelector((state) => state.user.is_login);

  const address = useSelector((state) => state.user?.user?.address);
  const user = useSelector((state) => state.user?.user);

  //어느 지역의 게시글들인지 보여주기
  const [town, setTown] = useState("");

  //토스트 메세지 사용
  const [toast, setToast] = useState(false);

  const ClickToast = () => {
    setToast(true);
  };

  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  //길이를 확인해서, 길이 변화가 있다면 재렌더링 => 새로 등록했을때 리렌더
  const postLength = postList?.length;

  useEffect(() => {
    if (is_login) {
      if (!address) {
        Swal.fire({
          title: "주소를 먼저 설정해주세요!",
          confirmButtonColor: "#3fbe81",
          confirmButtonText: "확인",
        });
        history.push("/mylocation");
      } else {
        dispatch(postActions.LogingetPostAPI());
      }
    } else {
      dispatch(postActions.getPostAPI());
    }
  }, [dispatch, postLength]);

  useEffect(() => {
    if (is_login && postList?.[0]) {
      setTown(postList[0]["address"]);
    }
  }, [postList]);

  useEffect(() => {
    if (toast === true) {
      setTimeout(() => {
        setToast(false);
      }, 2000);
    }
  }, [toast]);

  if (is_loading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  if (postList.length === 0) {
    return (
      <React.Fragment>
        <NoPost>아직 이 동네에 등록된 거래가 없어요!</NoPost>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Container>
        {is_login && town ? (
          <Title>
            <span>{town}</span>에서 교환을 기다리고 있어요!
          </Title>
        ) : (
          <Title>교환을 기다리고 있어요!</Title>
        )}
        <BetaMsg>
          <Beta onClick={ClickToast}>베타서비스 안내</Beta>
          <ToastMessage open={toast}>현재 베타서비스 기간으로 비 로그인 시 전체 지역 거래가 보입니다.</ToastMessage>
        </BetaMsg>
        <PostListC>
          {postList?.map((post, idx) => {
            return <Post {...post} key={idx} />;
          })}
        </PostListC>
        <FloatBtn />
      </Container>
    </React.Fragment>
  );
};

const NoPost = styled.div`
  display: flex;
  justify-content: center;
  font-size: 30px;
  font-weight: 600;
  line-height: 1.67;
  color: #d2d2d2;
`;

const PostListC = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  @media (max-width: 767px) {
    width: 100%;
    margin: 0 auto;
  }
`;

const Title = styled.h2`
  width: 100%;
  height: 24px;
  flex-grow: 0;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  font-size: 25px;
  font-weight: bold;
  line-height: 0.96;
  text-align: left;
  color: #2f2f2f;

  span {
    color: #3fbe81;
    font-size: 28px;
    margin-right: 4px;

    @media (max-width: 767px) {
      font-size: 22px;
    }

    @media (min-width: 768px) and (max-width: 1199px) {
      margin-bottom: 8px;
    }
  }

  @media (min-width: 768px) and (max-width: 1199px) {
    margin: 100px auto 30px;
    width: 768px;
  }

  @media (max-width: 767px) {
    margin: 60px auto 0px;
    font-size: 20px;
  }
`;

const BetaMsg = styled.div`
  @media (max-width: 767px) {
    margin-top: 15px;
  }

  @media (min-width: 768px) and (max-width: 1199px) {
    margin: 20px auto 0px;
    width: 768px;
  }
  }
`;

const Beta = styled.div`
  width: 100%;
  font-size: 16px;
  line-height: 0.96;
  text-align: left;
  color: #a8a8a8;
  cursor: pointer;
  display: flex;
  justify-content: center;

  :hover {
    font-weight: 600;
    font-size: 18px;
  }
`;

const fadein = keyframes`
  from { top: 0px; opacity: 0; } 
  to { top: -30px; opacity: 1; }
`;

const ToastMessage = styled.div`
  display: ${(props) => (props.open ? "block" : "none")};
  position: relative;
  font-size: 16px;
  bottom: 20px;
  /* right: 50px; */
  background-color: #3fbe81;
  color: #ffffff;
  font-weight: 600;
  padding: 10px 10px;
  width: 550px;
  margin: 0 auto;
  text-align: center;
  border-radius: 18px;
  animation: ${(props) =>
    props.open
      ? css`
          ${fadein} 0.5s;
        `
      : ""};

  @media (max-width: 767px) {
    width: 300px;
    font-size: 16px;
  }

  @media (min-width: 768px) and (max-width: 1199px) {
    width: 768px;
    margin: 0 auto;
  }
`;

export default PostList;
