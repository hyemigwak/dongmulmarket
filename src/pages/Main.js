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
  console.log(postList);

  useEffect(() => {
    dispatch(postActions.getPostAPI());
  }, []);

  return (
    <React.Fragment>
      <WrapMain>
        <Title>교환을 기다리고 있어요!</Title>
        <AddIcon
          onClick={() => {
            history.push("/addproduct");
          }}
        />
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
  margin-top: 20px;
`;

const PostListC = styled.div`
  width: 1200px;
  margin: auto;
`;
const Post = styled.div`
  height: 200px;
  width: 150px;
  background: #eee;
`;
export default Main;
