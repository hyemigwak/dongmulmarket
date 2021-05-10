import React, { useEffect } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import AddIcon from "@material-ui/icons/Add";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import PostList from "./PostList";
import Banners from "../components/Banners";
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
      <Banners/>
        <Title>교환을 기다리고 있어요!</Title>
        {/* <PostListC> */}
        <PostList postList={postList} />
        {/* </PostListC> */}
      </WrapMain>
    </React.Fragment>
  );
};

const WrapMain = styled.div`
  /* 최상단과 항상 떨어져 있게 함 */
  // margin-top:120px;
  display: flex;
  width: 100vw;
  flex-direction: column;
  /* @media (max-width: 1000px){
    heigth: 
  } */
`;

const Title = styled.h2`
  height: 24px;
  flex-grow: 0;
  margin: 0px 171px 10px 143px;
  font-family: Roboto;
  font-size: 25px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.96;
  letter-spacing: normal;
  text-align: left;
  color: #2f2f2f;

  // width: 39px;
  // height: 21px;
  // flex-grow: 0;
  // margin: 0 85px 6px 0;
  // font-family: Roboto;
  // font-size: 14px;
  // font-weight: 500;
  // font-stretch: normal;
  // font-style: normal;
  // line-height: 1.5;
  // letter-spacing: normal;
  // text-align: left;
  // color: var(--sub-text-title-2);
`;

const PostListC = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  //justify-content: space-evenly;
  align-items: center;
  margin: 0 auto;
`;

export default Main;
