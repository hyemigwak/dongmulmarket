import React from "react";
import styled from "styled-components";

const Post = (props) => {
  console.log(props);
  const { image_url, myItem, WantItem, location, expireDate } = props;

  console.log(new Date());

  //몇 분 전을 나타내는 함수
  function timeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);

    //ms 초 단위로 계산되기때문에 1000으로 나누고 다시 분(60)으로 나눈다. 1분전일때는 -> 방금 전 표기
    const betweenTime = Math.floor((timeValue.getTime() - today.getTime()) / 1000 / 60);
    // if (betweenTime < 1) return "방금 전";
    if (betweenTime < 60) {
      return `${betweenTime}분`;
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
      <Box>
        <ImgBox>
          <img src={image_url} alt="상품이미지" />
        </ImgBox>
        <ProductTitle>{myItem}</ProductTitle>
        <Title>
          <span>희망교환템:</span> {WantItem}
        </Title>
        <SubTitleArea>
          <div style={{ marginRight: "100px" }}>{location}</div>
          <div>{timeForToday(expireDate)} 남음</div>
        </SubTitleArea>
      </Box>
    </React.Fragment>
  );
};

Post.defaultProps = {
  image_url:
    "https://mblogthumb-phinf.pstatic.net/MjAxNzA5MTFfOTUg/MDAxNTA1MDkwOTQ4Nzkx.d6WmUQbJNVn_AgreyvKeQVnSTLnlzHFJsi4lWdgsTr0g.2BA8M9s7-eZEwkJZ5SJ6uVYD4g3kCAXUuQYOZtw1Uusg.PNG.nong-up/image.png?type=w800",
  myItem: "고구마 3개",
  wantItem: "감자 3개",
  location: "신림 1동",
  expireDate: "2021-04-29 10:00:00",
};

const Box = styled.div`
  height: 380px;
  border-radius: 12px;
  width: 250px;
  margin: 0rem 2rem 1rem 0rem;
  background: #ffffff;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.07);
  border-radius: 20px;
  display: flex;
  flex-wrap: wrap;
  margin-right: 30px; 
  margin-top:30px;
`;

const ImgBox = styled.div`
  margin: auto;
  object-fit: contain;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  max-width: 100%;
  text-align: right;
  z-index: 1000;
  img {
    width: 250px;
    height: 250px;
    object-fit: cover;
  }
`;

const ProductTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin: 0.4rem auto 0rem;
`;

const Title = styled.div`
  margin-left: 1rem;
  span {
    font-size: 16px;
    font-weight: 600;
  }
`;

const SubTitleArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 1rem;
  span {
    font-size: 16px;
    font-weight: 600;
  }
`;

export default Post;
