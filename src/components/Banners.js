import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import Slick from "react-slick";
import { Container } from "../element";
import { history } from "../redux/configureStore";
import mainbanner1 from "../image/mainbanner1.png";
import mainbanner2 from "../image/mainbanner2.png";
import mainbanner3 from "../image/mainbanner3.png";

const Banners = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToshow: 4,
    slidesToScroll: 1,
  };

  return (
    <BannerBox>
      <Slick {...settings} dotsClass="dotsCustom">
        <BannerImg1>
          <BannerGrid>
            <SmallGreen1>우리 동네에서 하는 물물교환 거래</SmallGreen1>
            <WelcomeWords1>
              동물마켓에
              <br />
              오신것을 환영합니다
            </WelcomeWords1>
            <Describe1>
              나에게 필요없는 상품이 누군가에게 꼭 필요한 상품이 될 수 있습니다.
              <br />
              동물마켓은 0원의 비용으로 지구와 사람 모두가 행복을 누릴 수 있는 환경을 생각합니다.
              <br />
              실시간 채팅을 통해 필요한 상품만 쏙 골라갈 수 있도록 스마트한 소비를 도와드릴게요!
            </Describe1>
            <LoginBtn
              onClick={() => {
                history.push("/login");
              }}
            >
              로그인하기
            </LoginBtn>
          </BannerGrid>
        </BannerImg1>
        <BannerImg2>
          <BannerGrid2>
            <SmallGreen2>친절한 냥이가 설명해주는</SmallGreen2>
            <WelcomeWords1>
              동물마켓 이용
              <br />
              튜토리얼
            </WelcomeWords1>
            <Describe2>
              동물마켓은 내가 가진 물건으로 필요한 물건을 구할 수 있어요.
              <br />
              교환하고 싶은 물건이 있다면, 단체 채팅에 참여해보세요.
              <br />
              채팅을 통해 구매자와 매칭이 되면 1:1 채팅을 할 수 있습니다!
            </Describe2>
            <TradeBtn>거래하러 가기</TradeBtn>
          </BannerGrid2>
        </BannerImg2>
        <BannerImg3>
          <BannerGrid>
            <SmallGreen1>우리 동네에서 하는 물물교환 거래</SmallGreen1>
            <WelcomeWords2>동물마켓 이용 꿀팁!</WelcomeWords2>
            <Describe1>
              1. 마감 임박 상품을 노리세요
              <br />
              2. 채팅이 활발하지 않은 물건을 선점해보세요
              <br />
              3. 원하는게 없을 때는 내가 글을 등록해보세요
            </Describe1>
            <TradeBtn>거래하러 가기</TradeBtn>
          </BannerGrid>
        </BannerImg3>
      </Slick>
    </BannerBox>
  );
};

const BannerBox = styled.div`
  width: 100%;
  height: 540px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    height: 450px;
  }

  /* .dotsCustom {
  } */

  .dotsCustom {
    position: absolute;
    bottom: 15px;
    right: 550px;
    width: 100%;
    list-style: none;
    text-align: end;
    padding: 0;

    @media (max-width: 768px) {
      bottom: 15px;
      right: 800px;
    }
  }

  .dotsCustom li {
    position: relative;
    display: inline-block;
    width: 20px;
    height: 20px;
    /*margin: 1px;*/
    padding: 0;
    cursor: pointer;
  }

  .dotsCustom li button {
    font-size: 0;
    line-height: 0;
    display: block;
    width: 20px;
    height: 20px;
    padding: 5px;
    cursor: pointer;
    color: transparent;
    border: 0;
    outline: 0;
    background: 0 0;
  }

  .dotsCustom li button:before {
    font-size: 2.7rem;
    line-height: 20px;
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    content: "•";
    text-align: center;
    opacity: 0.75;
    color: #b3b3b3;
  }

  .dotsCustom li.slick-active button:before {
    color: #3fbe81;
  }
`;

const BannerGrid = styled.div`
  margin: 100px 50px 30px 144px;
  @media (max-width: 768px) {
    margin: 104px 35px 81px;
  }
`;

const BannerGrid2 = styled.div`
  margin: 100px 127px 82px 710px;
  @media (max-width: 768px) {
    margin: 104px 35px 81px;
  }
`;

const BannerImg1 = styled.div`
  background-image: url("${mainbanner1}");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 460px;

  @media (max-width: 768px) {
    height: 450px;
  }
`;

const SmallGreen1 = styled.div`
  height: 16px;
  margin: 33px 265px 6px 0;
  font-size: 14px;
  text-align: left;
  color: #3fbe81;
`;

const SmallGreen2 = styled.div`
  font-size: 14px;
  height: 16px;
  text-align: left;
  color: #3fbe81;
  margin-bottom: 6px;
`;

const WelcomeWords1 = styled.div`
  height: 110px;
  margin: 6px 117px 20px 1px;
  font-size: 36px;
  font-weight: bold;
  line-height: 1.53;
  letter-spacing: 0.72px;
  text-align: left;
  color: #ffffff;
`;

const WelcomeWords2 = styled.div`
  font-size: 36px;
  font-weight: bold;
  line-height: 1.53;
  letter-spacing: 0.72px;
  text-align: left;
  color: #ffffff;
`;

const Describe1 = styled.div`
  height: 66px;
  margin: 20px 58px 24px 3px;
  font-size: 14px;
  line-height: 1.57;
  text-align: left;
  color: #d2d2d2;
`;

const Describe2 = styled.div`
  height: 66px;
  font-size: 14px;
  line-height: 1.57;
  text-align: left;
  color: #d2d2d2;
`;

const LoginBtn = styled.button`
  width: 111px;
  height: 34px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 24.5px 24px 46.5px 4px;
  padding: 7px 14px 6px;
  border-radius: 83px;
  background: #3fbe81;
  border: none;
  cursor: pointer;

  font-size: 16px;
  color: #ffffff;
  font-weight: 500;
`;

const BannerImg2 = styled.div`
  background-image: url("${mainbanner2}");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 460px;

  @media (max-width: 768px) {
    height: 450px;
  }
`;

const TradeBtn = styled.button`
  width: 132px;
  height: 34px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 24px 335px 46.5px 0px;
  padding: 7px 14px 6px;
  border-radius: 83px;
  background: #3fbe81;
  color: #ffffff;
  border: none;

  font-size: 16px;
  color: #ffffff;
  font-weight: 500;
`;

const BannerImg3 = styled.div`
  background-image: url("${mainbanner3}");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 460px;
`;

const Img = styled.img`
  position: relative;
  width: 1030px;
  height: 300px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  // z-index:1;
`;

export default Banners;
