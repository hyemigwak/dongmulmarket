import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import Swal from "sweetalert2";

const Post = (props) => {
  const { image, title, wantItem, address, deadLine, itemId, kickYn } = props;

  const Today = new Date();
  const NewDeadLine = new Date(deadLine);
  const newDate = new Date(NewDeadLine.getTime() + NewDeadLine.getTimezoneOffset() * 60 * 1000);
  const TimeGap = newDate - Today;

  //만약 경매시간이 지났다면, 클릭 시 알럿 후 리로드, 아니라면 디테일 페이지로 넘김
  const TimeLimit = () => {
    if (TimeGap < 0) {
      Swal.fire({
        title: "교환이 마감된 상품입니다.",
        confirmButtonColor: "#d6d6d6",
        confirmButtonText: "확인",
      });
      window.location.reload();
      return;
    }
    if (kickYn && kickYn === "true") {
      Swal.fire({
        title: "강퇴로 인해 참여가 더 이상 불가능합니다.",
        confirmButtonColor: "#d6d6d6",
        confirmButtonText: "확인",
      });
      return;
    }
    history.push(`/detail/${itemId}`);
  };

  //마감전 상품 곧 마감 뱃지 붙일 준비
  const [badge, setBadge] = useState(false);

  //몇 분 전을 나타내는 함수
  function timeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);

    //ms 초 단위로 계산되기때문에 1000으로 나누고 다시 분(60)으로 나눈다. 1분전일때는 -> 방금 전 표기
    const betweenTime = Math.floor((timeValue.getTime() - today.getTime()) / 1000 / 60);
    if (betweenTime < 0) return "종료되었습니다";
    if (betweenTime < 1) return "방금 전";
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

  //마감 6시간 전 상품에 곧마감 뱃지 붙이기
  const TimeBadge = () => {
    if (TimeGap / (1000 * 60) < 60 * 6) {
      setBadge(true);
    }
  };

  //렌더링될때 1시간 이내 상품은 곧 마감 딱지 붙여줌
  useEffect(() => {
    TimeBadge();
  }, []);

  return (
    <React.Fragment>
      <Box onClick={TimeLimit}>
        <ImgBox>
          <Img src={image} alt="상품이미지" />
          {badge ? (
            <>
              <Label>
                곧 마감
                <div className="soonend">{timeForToday(newDate)} 뒤 마감!</div>
              </Label>
            </>
          ) : null}
        </ImgBox>
        <TextBox>
          <Address style={{ marginRight: "100px" }}>{address}</Address>
          <ProductTitle>{title}</ProductTitle>
          <Title>
            <span>희망교환템:</span> {wantItem}
          </Title>
          <Time>{timeForToday(newDate)} 남음</Time>
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
  margin: 40px 30px 50px 30px;
  padding: 0 0 16px;
  border-radius: 8px;
  border: solid 1px #91be89;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;

  :hover {
    transition: 0.2s;
    transform: scale(1.08);
    box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 768px) {
    margin: 40px 12.5px 48px 25px;
  }
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
  display: ${(props) => (props.deadLineSoon ? "block" : "none")};
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

  .soonend {
    position: absolute;
    bottom: 3px;
    right: 76px;
    z-index: 2;
    font-size: 11px;
    font-weight: 600;
    color: #2f2f2f;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.65);
    color: #ffffff;
    border-radius: 16px;
    padding: 6px 10px;
    width: 84px;
    height: 30px;
  }

  :hover {
    background-color: #e72a2a;
    .soonend {
      opacity: 1;
    }
  }
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
