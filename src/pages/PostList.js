import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { Container } from "../element";
import { FloatBtn, Post } from "../components";
import Spinner from "../shared/Spinner";
import { getCookie } from "../shared/Cookie";

const PostList = (props) => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post.post_list);
  const is_loading = useSelector((state) => state.post.is_loading);
  const is_login = useSelector((state) => state.user.is_login);

  const [town, setTown] = useState("");
  console.log(postList);

  //길이를 확인해서, 길이 변화가 있다면 재렌더링 => 새로 등록했을때 리렌더
  const postLength = postList?.length;

  useEffect(() => {
    if (is_login) {
      dispatch(postActions.LogingetPostAPI());
      return;
    } else {
      dispatch(postActions.getPostAPI());
    }
  }, [dispatch, postLength]);

  if (is_loading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  console.log(postList);
  console.log(postList[0]);
  // console.log(postList[0]?.address);

  // if (postList && postList[0].address) {
  //   setTown(postList[0].address);
  // } else {
  //   return null;
  // }

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
  }

  @media (min-width: 768px) and (max-width: 1199px) {
    margin: 100px 30px 0px 50px;
  }

  @media (max-width: 767px) {
    margin: 60px auto 0px;
    font-size: 20px;
  }
`;

export default PostList;
