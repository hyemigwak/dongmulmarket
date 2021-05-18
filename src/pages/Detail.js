import React, { useEffect, memo } from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { NoLogin, Chat } from "../components";

const Detail = memo((props) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const detail = useSelector((state) => state.post.detail_list);
  const is_login = useSelector((state) => state.user.is_login);

  useEffect(() => {
    dispatch(postActions.getOnePostAPI(id));
  }, [dispatch, id]);

  return (
    <React.Fragment>
      <WrapDetail>
        <Title>물품 교환하기</Title>
        <InfoTitle>상품 정보</InfoTitle>
        <WrapBox>
          <ProductsBox>         
            <Img src={detail.image} />
            <TableBox>
              <tr>
                <TitleText>품목명</TitleText>
                <DetailText>{detail.title}</DetailText>
              </tr>
              <tr>
                <TitleText>카테고리</TitleText>
                <DetailText>{detail.category}</DetailText>
              </tr>
              <tr>
                <TitleText>글 올린 시간</TitleText>
                <DetailText>{detail.createdDt}</DetailText>
              </tr>
              <tr>
                <TitleText>교환 종료 시간</TitleText>
                <DetailText>{detail.deadLine}</DetailText>
              </tr>
              <tr>
                <TitleText>코멘트</TitleText>
                <DetailText>{detail.comment}</DetailText>
              </tr>   
            </TableBox>
          </ProductsBox>
          {detail?.icrId && is_login ? <Chat {...detail} /> : <NoLogin />}
        </WrapBox>
      </WrapDetail>
    </React.Fragment>
  );
});


const WrapDetail = styled.div`
  /* 최상단과 항상 떨어져 있게 함 */
  width: 1200px;
  height:100vh;
  margin: 160px auto;
`;

const Title = styled.div`
  height: 40px;
  margin: 63px 167px 0px 50px;
  font-size: 36px;
  font-weight: 600;
  line-height: 1.11;
  text-align: left;
  color: #1c1c1c;
`;

const InfoTitle = styled.div`
  height: 24px;
  flex-grow: 0;
  margin: 26px 281px 10px 0px;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.33;
  text-align: left;
  color: #1c1c1c;
  margin-left:50px;
`;

const WrapBox = styled.div`
  display: flex;
  margin-left:50px;
  
`;

const ProductsBox = styled.div`
  
`;

const Img = styled.img`
  width: 347px;
  height: 310px;
  margin: 0px 6px 34px 0.1px;
  border-radius: 8px;
  border: solid 2px #6fcea1;
  position: relative;
  top: 10px;
`;

const TableBox=styled.table`
  width: 353.1px;
  height:240px; 

`;

const TitleText = styled.td`
  flex-grow: 0;
  font-size: 18px;
  line-height: 1.67;
  text-align: left;
  color: #7d7d7d;
  width: 125px;

`;

const DetailText=styled.td`
flex-grow: 0;
font-size: 18px;
line-height: 1.67;
text-align: left;

color: #1c1c1c;
font-weight:bold;

`;

export default Detail;