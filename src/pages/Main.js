import React, { useEffect } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import AddIcon from "@material-ui/icons/Add";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import PostList from "./PostList";

const Main = (props) => {
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post.post_list);

  useEffect(() => {
    if (!postList) {
      return;
    }
    dispatch(postActions.getPostAPI());
  }, []);

  return (
    <React.Fragment>
      <WrapMain>
        <Title>교환을 기다리고 있어요!</Title>
        <PostListC>
          <PostList postList={postList} />
        </PostListC>
      </WrapMain>
    </React.Fragment>
  );
};

const WrapMain = styled.div`
  /* 최상단과 항상 떨어져 있게 함 */
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  /* @media (max-width: 1000px){
    heigth: 
  } */
`;

const Title = styled.h2`
  text-align: center;
  font-weight: bold;
  font-size: 30px;
  color: #212121;
  margin-top: 20px;
`;

const PostListC = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 auto;
`;

export default Main;
