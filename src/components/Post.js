import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

const Post = (props) => {
  console.log(props);

  const { image, title, wantItem, address, deadLine, itemId } = props;
  const _itemId = props.itemId;

  //몇 분 전을 나타내는 함수
  function timeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);

    //ms 초 단위로 계산되기때문에 1000으로 나누고 다시 분(60)으로 나눈다. 1분전일때는 -> 방금 전 표기
    const betweenTime = Math.floor(
      (timeValue.getTime() - today.getTime()) / 1000 / 60
    );
    // if (betweenTime < 1) return "방금 전";
    if (betweenTime < 60) {
      return `${betweenTime}분`;
    }
    if (betweenTime < 0) {
      return "종료되었습니다";
    }
    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간`;
    }
    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일`;
    }
  }

  return (
    <React.Fragment>
      <Box
        onClick={() => {
          history.push(`/detail/${_itemId}`);
        }}
      >
        <ImgBox>
          <Img src={props.image} alt="상품이미지" />
          <Label>곧 마감</Label>
        </ImgBox>
        <TextBox>
          <Address style={{ marginRight: "100px" }}>{props.address}</Address>
          <ProductTitle>{props.title}</ProductTitle>
          <Title>
            <span>희망교환템:</span> {props.wantItem}
          </Title>
          <Time>{timeForToday(props.deadLine)} 남음</Time>
        </TextBox>
      </Box>
    </React.Fragment>
  );
};

Post.defaultProps = {
  image:
    "https://mblogthumb-phinf.pstatic.net/MjAxNzA5MTFfOTUg/MDAxNTA1MDkwOTQ4Nzkx.d6WmUQbJNVn_AgreyvKeQVnSTLnlzHFJsi4lWdgsTr0g.2BA8M9s7-eZEwkJZ5SJ6uVYD4g3kCAXUuQYOZtw1Uusg.PNG.nong-up/image.png?type=w800",
  myItem: "고구마 3개",
  wantItem: "감자 3개",
  location: "신림 1동",
  expireDate: "2021-04-29 10:00:00",
};

const Box = styled.div`
  width: 205px;
  height: 278px;
  flex-grow: 0;
  margin: 40px 31px 50px 30px;
  padding: 0 0 16px;
  border-radius: 8px;
  border: solid 1px #91be89;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const ImgBox = styled.div`
  margin: 0 auto;
  border-radius: 8px;
  max-width: 100%;
  z-index: 1000;
  position: relative;
  top: -2px;
  left: -1px;
  img {
    width: 205px;
    height: 160px;
    object-fit: cover;
  }
`;

const Img = styled.img`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  z-index: 2;
  width: 205px;
  height: 165px;
  border: solid 1px #91be89;
`;

const Label = styled.div`
  width: 72px;
  height: 40px;
  flex-grow: 0;
  border-top-right-radius: 8px;
  padding: 8px 12px 10px 11px;
  background-color: #3fbe81;
  font-size: 16px;
  color: #ffffff;

  display: block;
  position: absolute;
  top: 0px;
  left: 133px;

  z-index: 1;
`;
const ProductTitle = styled.div`
  width: 157px;
  height: 24px;
  flex-grow: 0;
  margin: 2px 0 4px;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.33;
  text-align: left;
  color: #2f2f2f;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Title = styled.div`
  font-size: 13px;
  text-align: left;
  color: #2a2a2a;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 150px;
  height: 17px;
  span {
    font-size: 12px;
    color: #737373;
  }
`;

const TextBox = styled.div`
  position: relative;
  top: 14px;
  text-align: left;
  padding: 2px 1px;
  padding-left: 16px;
`;

const Address = styled.div`
  flex-grow: 0;
  margin: 0 69px 2px 0;
  font-family: Roboto;
  font-size: 10px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #737373;
`;

const Time = styled.div`
  height: 16px;
  flex-grow: 0;
  margin: 9px 85px 0 0;
  font-size: 14px;
  font-weight: bold;
  text-align: left;
  color: #0c6550;
`;

export default Post;
