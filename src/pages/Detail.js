import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as chatActions } from "../redux/modules/chat";
import { OneChat, GroupChat, NoLogin, LoginChat, ChatUsers } from "../components";
import { getCookie } from "../shared/Cookie";
import { Chat } from "../components";
import io from "socket.io-client";
import axios from "axios";
import { config } from "../shared/config";

const Detail = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const detail = useSelector((state) => state.post.detail_list);
  const is_login = useSelector((state) => state.user.is_login);
  console.log(detail);

  const email = localStorage.getItem("email");
  const icrId = detail?.icrId;
  console.log("icrId", icrId);

  const socket = io("http://15.165.76.76:3001/chatting", { query: `email=${email}&icrId=${icrId}` });

  //채팅 보여주기
  const [chatView, setChatView] = useState(false);

  //렌더링 될때, 디테일 데이터 받아오기 & 소켓 연결하기(확인)
  useEffect(() => {
    dispatch(postActions.getOnePostAPI(id));
  }, [icrId, id]);

  return (
    <React.Fragment>
      <WrapDetail>
        <Title>물품 교환하기</Title>
        <WrapBox>
         <ProductsBox>
            <InfoTitle>상품 정보</InfoTitle>
            <Img src={detail.image} />
            <InfoBox>
              <TitleArea>
                <TitleText>품목명:</TitleText>
                <TitleText>카테고리:</TitleText>
                <TitleText>글 올린 시간:</TitleText>
                <TitleText>교환 종료 시간:</TitleText>
                <TitleText>참여 인원:</TitleText>
                <TitleText>코멘트:</TitleText>
              </TitleArea>
              <DetailArea>
                <DetailText>{detail.title}</DetailText>
                <DetailText>{detail.category}</DetailText>
                <DetailText>{detail.createdDt}</DetailText>
                <DetailText>{detail.deadLine}</DetailText>
                <DetailText>2명</DetailText>
                <DetailText>{detail.comment}</DetailText>
              </DetailArea>
            </InfoBox>
          </ProductsBox>
          {is_login ? <Chat {...detail} /> : <NoLogin />}
        </WrapBox>
      </WrapDetail>
    </React.Fragment>
  );
};

const WrapDetail = styled.div`
  /* 최상단과 항상 떨어져 있게 함 */
  width: 100vw;
  margin: 200px auto;

  /* @media (max-width: 1000px){
    heigth: 
  } */
`;

const Title = styled.div`
  height: 40px;
  margin: 63px 167px 6px 0px;
  font-family: NotoSans;
  font-size: 36px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.11;
  letter-spacing: normal;
  text-align: left;
  color: #1c1c1c;
`;

const WrapBox = styled.div`
  display: flex;
  /* width: 100%;
  margin: 0 auto; */
`;

const ProductsBox = styled.div`
  /* margin-left: 51px; */
`;

const InfoTitle = styled.div`
  height: 24px;
  flex-grow: 0;
  margin: 0 281px 10px 1px;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: #1c1c1c;
  position: relative;
  top: 26px;
`;

const InfoBox = styled.div`
  display: flex;
  width: 353.1px;
  height: 240px;
  flex-grow: 0;
  margin: 30px 0 0;
  justify-content: space-between;
`;

const TitleArea = styled.div`
  margin: 0 10px 12px 0;
  width: 150px;
  flex-grow: 1;
`;

const DetailArea = styled.div``;

const TitleText = styled.div`
  flex-grow: 0;
  margin-bottom: 12px;
  font-family: NotoSans;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: normal;
  text-align: left;
  color: #7d7d7d;
`;

const DetailText = styled.div`
  flex-grow: 0;
  margin-bottom: 12px;
  font-family: NotoSans;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: normal;
  text-align: left;
  color: #1c1c1c;
`;

const Img = styled.img`
  width: 347px;
  height: 310px;
  margin: 10px 6px 34px 0.1px;
  border-radius: 8px;
  border: solid 2px #6fcea1;
  position: relative;
  top: 10px;
`;

const BtnArea = styled.div`
  display: flex;
  width: 723px;

  .group {
    background-color: #3fbe81;
    color: #ffffff;
    cursor: pointer;
    border: solid 1px #3fbe81;
    font-size: 16px;
    line-height: 1.33;
    padding: 10px 36px;
    width: 156px;
    height: 44px;
    border-radius: 8px 0 0 0;
  }
  .one {
    background-color: #ffffff;
    color: #7d7d7d;
    cursor: pointer;
    border: solid 1px #7d7d7d;
    font-size: 16px;
    line-height: 1.33;
    padding: 10px 29px;
    width: 156px;
    height: 44px;
    border-radius: 0 8px 0 0;
  }
`;

export default Detail;
