import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { Container } from "../element";
import Post from "../components/Post";
import Spinner from "../shared/Spinner";

const PostList = (props) => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post.post_list);
  const is_loading = useSelector((state) => state.post.is_loading);
  console.log(is_loading);
  //길이를 확인해서, 길이 변화가 있다면 재렌더링 => 새로 등록했을때 리렌더
  const postLength = postList?.length;

  useEffect(() => {
    dispatch(postActions.getPostAPI());
  }, [postLength]);

  if (is_loading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  return (
    <React.Fragment>
      <Container>
        <PostListC>
          {postList?.map((post, idx) => {
            return <Post {...post} key={idx} />;
          })}
        </PostListC>
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

export default PostList;
