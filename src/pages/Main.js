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
        <FloatButton
          onClick={() => {
            history.push("/addproduct");
          }}
        ><div>+</div></FloatButton>
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

const FloatButton = styled.button`
  // width: 50px;
  // height: 50px;
  // background-color: pink;
  // color: #ffffff;
  // box-sizing: border-box;
  // font-size: 36px;
  // font-weight: 800;
  // position: fixed;
  // bottom: 50px;
  // right: 16px;
  // text-align: center;
 
  // vertical-align: middle;
  // border: none;
  // border-radius: 50px;

  color: #fff;
  padding: 0;
  width: 55.5px; height: 55.5px;
  display: inline-block;
  outline: 0;
  border: none;
  text-decoration: none;
  background: #2196F3;
  text-align: center;
  border-radius: 50%;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  margin-left: 1300px;

  :hover {
    background: #42A5F5;
  }
  
  & div {
    font-size: 1.8em;
    padding: 0;
    margin: 3px 0 0 0;
    padding-top: 5px;
    padding-bottom: 15px;
   
}
  
`;

export default Main;
