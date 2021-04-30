import React from "react";
import styled from "styled-components";

const Post = (props) => {
  console.log(props);
  const { image_url, myItem, WantItem, location, expireDate } = props;

  return (
    <React.Fragment>
      <Box>
        <ImgBox src={image_url} />
        <Title>교환상품: {myItem}</Title>
        <Title>희망교환템: {WantItem}</Title>
        <Title>교환지역: {location}</Title>
        <Title>경매종료: {expireDate} 전</Title>
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
  height: 350px;
  width: 250px;
  background: #eee;
  display: flex;
  flex-wrap: wrap;
`;

const ImgBox = styled.img`
  height: 150px;
  width: 150px;
  background: pink;
  margin-left: 40px;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  margin-left: 30px;
  font-size: 16px;
`;

export default Post;
