import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { NoLogin, Chatting } from "../components";
import { useMediaQuery } from "react-responsive";

const Detail = ({ history }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const detail = useSelector((state) => state.post.detail_list);
  const is_login = useSelector((state) => state.user.is_login);

  useEffect(() => {
    dispatch(postActions.getOnePostAPI(id));
  }, [dispatch, id]);

  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  const isTablet = useMediaQuery({
    query: "(max-width: 768px) and (max-width: 1199px)",
  });

  const isPc = useMediaQuery({
    query: "(min-width: 1200px)",
  });

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
                <TitleText>희망 교환템</TitleText>
                <DetailText>{detail.wantItem}</DetailText>
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

          {detail?.icrId && is_login ? <Chatting {...detail} history={history} /> : <NoLogin />}
        </WrapBox>
      </WrapDetail>
    </React.Fragment>
  );
};

const WrapDetail = styled.div`
  /* 최상단과 항상 떨어져 있게 함 */
  width: 1200px;
  margin: 160px auto;

  @media (max-width: 767px) {
    height: 1400px;
    // width:100%;

    width: 280px;

    margin: 10px auto 15px;

    /* margin: 160px auto; */
  }
  @media (min-width: 768px) and (max-width: 1190px) {
    width: 100%;
    height: 1200px;
  }
`;

const Title = styled.div`
  height: 40px;
  margin: 63px 167px 0px 50px;
  font-size: 36px;
  font-weight: 600;
  line-height: 1.11;
  text-align: left;
  color: #1c1c1c;
  @media (max-width: 767px) {
    margin: 63px 167px 0px 10px;
  }

  @media (min-width: 768px) and (max-width: 1190px) {
    margin: 63px 167px 0px 10px;
  }
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
  margin-left: 50px;

  @media (max-width: 767px) {
    margin: 30px 167px 0px 10px;
  }
  @media (min-width: 768px) and (max-width: 1190px) {
    margin: 30px 167px 0px 10px;
  }
`;

const WrapBox = styled.div`
  display: flex;
  /* margin-left: 50px; */

  @media (max-width: 767px) {
    display: block;
    width: 310px;
    margin: 0 auto;
  }
`;

const ProductsBox = styled.div`

 
@media (max-width: 767px) {
  position: relative;
 
  bottom:230px;
  right:260px;
  width: 285px;
  background:pink;
}

}
`;

const Img = styled.img`
  width: 347px;
  height: 310px;
  margin: 0px 6px 34px 0.1px;
  border-radius: 8px;
  border: solid 3px #6fcea1;
  position: relative;
  top: 10px;
  @media (max-width: 767px) {
    position: absolute;
    top: 250px;
    left: 238px;

    width: 250px;
    height: 250px;
  }
  @media (min-width: 768px) and (max-width: 1190px) {
    position: absolute;
    top: 270px;
    left: 10px;
  }
`;

const TableBox = styled.table`
  width: 353.1px;
  height: 240px;

  @media (max-width: 767px) {
    position: absolute;
    top: 520px;
    left: 230px;
  }
  @media (min-width: 768px) and (max-width: 1190px) {
    position: absolute;
    top: 300px;
    left: 380px;
  }
`;

const TitleText = styled.td`
  flex-grow: 0;
  font-size: 18px;
  line-height: 1.67;
  text-align: left;
  color: #7d7d7d;
  width: 125px;

  @media (max-width: 767px) {
    font-size: 14px;
    width: 100px;
  }
`;

const DetailText = styled.td`
  flex-grow: 0;
  font-size: 18px;
  line-height: 1.67;
  text-align: left;
  color: #1c1c1c;
  font-weight: bold;

  @media (max-width: 767px) {
    font-size: 14px;
  }
`;

export default Detail;
