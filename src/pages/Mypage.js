import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { Container } from "../element";

import bellimg from "../image/bell.png";
import Carousel from "../components/Carousel";
import Carousel2 from "../components/Carousel2";
import Carousel3 from "../components/Carousel3";

const Mypage = (props) => {
  const dispatch = useDispatch();

  //마이페이지 리스트를 가져옴(판매+교환성공+실패)
  const myPageList = useSelector((state) => state.post.mypage_list);

  //나의 판매내역
  const SalesList = myPageList?.filter((s) => s.status === "auction");
  //교환완료내역
  const SuccessList = myPageList?.filter((s) => s.status === "success");
  //교환실패내역
  const FailList = myPageList?.filter((s) => s.status === "fail");

  useEffect(() => {
    dispatch(postActions.myPageAPI());
  }, [dispatch, myPageList.length]);

  return (
    <React.Fragment>
      <Container>
      <WrapMypage>
        <MpageHeader>
          <Title>마이페이지</Title>
          <AlarmIcon className="bell" src={bellimg} />
          <LocationBtn
            onClick={() => {
              history.push("/mylocation");
            }}
          >
            나의 위치 설정하기
          </LocationBtn>
        </MpageHeader>

        <MyPageC>
          <SellTitle>나의 판매내역</SellTitle>
          <SellContainer>
            {SalesList.length ? (
              <Carousel SalesList={SalesList} />
            ) : (
              <>
                <BlankBox>
                  <BlankText style={{ width: "443px", height: "60px" }}>아직 판매한 내역이 없어요 :( !</BlankText>
                </BlankBox>
              </>
            )}
          </SellContainer>
          <DoneTitle>교환완료 내역</DoneTitle>
          {SuccessList.length ? (
            <DoneContainer>
              <Carousel2 SuccessList={SuccessList} />
            </DoneContainer>
          ) : (
            <DoneContainer>
              <BlankBox>
                <BlankText2 style={{ width: "510px", height: "49px" }}>교환완료된 내역이 아직 없어요 :( !</BlankText2>
              </BlankBox>
            </DoneContainer>
          )}
          <IngTitle>교환실패 내역</IngTitle>
          {FailList.length ? (
            <IngContainer>
              <Carousel3 FailList={FailList} />
            </IngContainer>
          ) : (
            <IngContainer>
              <BlankBox>
                <BlankText2 style={{ width: "510px", height: "49px" }}>교환실패한 내역이 아직 없어요 :( !</BlankText2>
              </BlankBox>
            </IngContainer>
          )}
        </MyPageC>
      </WrapMypage>
      </Container>
    </React.Fragment>
  );
};

const WrapMypage = styled.div`
  /* 최상단과 항상 떨어져 있게 함 */
  width: 1200px;
  height: 1700px;
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  margin: auto;
`;

const MpageHeader = styled.div`
  display: flex;
`;

const Title = styled.div`
  margin: 90px 0px 0px 50px;
  font-size: 36px;
  font-weight: bold;
  min-width: 180px;
  display: table;
  color: #1c1c1c;
`;

const AlarmIcon = styled.img`
  width: 51px;
  height: 51px;
  flex-grow: 0;
  margin: 93px 683px 0px 16px;
  padding: 14px 14px 13px 13px;
  background-color: #3fbe81;
  border-radius: 30px;
  z-index: 1;

  .bell {
    z-index: 1000;
    width: 24px;
    height: 24px;
    flex-grow: 0;
    object-fit: contain;
    color: #ffffff;
  }
`;

const LocationBtn = styled.button`
  min-width: 11.5em;
  height: 2.125em;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 100px;
  margin-bottom: 0px;
  padding: 7px 14px 6px;
  border-radius: 83px;
  border: 2px solid #3fbe81;
  cursor: pointer;
  text-align: center;

  @media (max-width: 767px) {
    padding: 2px 14px;
  }

  :hover {
    background-color: #3fbe81;
    color: #ffffff;
    font-weight: 600;
  }

  @media (max-width: 767px) {
    position: absolute;
    left: 800px;
    top: 120px;
  }
  @media (min-width: 768px) and (max-width: 1190px) {
    position: absolute;
    left: 550px;
    top: 120px;
  }
`;

const BlankBox = styled.div`
  height: 278px;
  width: 1000px;
  margin: auto;
  //background:pink;
  justify-content: center;
  text-align: center;

  flex-direction: row;
`;

const BlankText = styled.div`
  margin-left: 280px;
  margin-top: 100px;
  font-size: 30px;
  font-weight: 600;
  line-height: 1.67;
  justify-content: center;
  margin-left: 250px;
  color: #d2d2d2;

  @media (max-width: 767px) {
    margin-left: 210px;
  }
  @media (min-width: 768px) and (max-width: 1190px) {
    margin-left: 210px;
  }
`;

const BlankText2 = styled.div`
  margin-top: 100px;
  font-size: 30px;
  font-weight: 600;
  line-height: 1.67;
  justify-content: center;
  margin-left: 250px;
  color: #d2d2d2;

  @media (max-width: 767px) {
    margin-left: 210px;
  }
  @media (min-width: 768px) and (max-width: 1190px) {
    margin-left: 210px;
  }
`;

const MyPageC = styled.div`
  margin: auto;
  width: 1200px;
  margin-top: 70px;
  height: 100vh;

  @media (max-width: 767px) {
    width: 100%;
    margin: 0 auto;
    flex-grow: 0;
  }

  @media (min-width: 768px) and (max-width: 1199px) {
    width:100
    margin: 0px auto;
    flex-grow: 0;
    justify-content: center;
  }
`;

const SellContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;


`;

const DoneContainer = styled.div`
  display: flex;
`;

const IngContainer = styled.div`
  display: flex;
`;

const SellTitle = styled.div`
  flex-grow: 0;
  margin-left: 100px;
  font-size: 24px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: normal;
  display: flex;
  color: #2f2f2f;
  margin-bottom: 24px;
`;

const DoneTitle = styled.div`
  flex-grow: 0;
  margin-top: 50px;
  margin-left: 100px;
  font-size: 24px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: normal;
  display: flex;
  color: #2f2f2f;
  margin-bottom: 24px;
`;

const IngTitle = styled.div`
  flex-grow: 0;
  margin-top: 50px;
  margin-left: 100px;
  font-size: 24px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: normal;
  display: flex;
  color: #2f2f2f;
  margin-bottom: 24px;
`;

export default Mypage;
