import React from 'react'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import Slick from "react-slick";
// import banner1 from ".././image/banner1.jpg";
// import banner2 from ".././image/banner2.jpg";
// import banner3 from ".././image/banner3.jpg";
// import banner4 from ".././image/banner4.jpg";
// import banner5 from ".././image/banner5.jpg";
// import next from ".././image/next.png";
// import prev from ".././image/prev.png";


const Banners = () => {

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block"}}
        onClick={onClick}
      >
      <ArrowLeft><img style={{width:"15px", height:"30px"}} alt="arrowLeft"/></ArrowLeft>
      </div>
    );
  }
  
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block"}}
        onClick={onClick}
      >
      <ArrowRight><img style={{width:"15px", height:"30px"}} alt="arrowRight"/></ArrowRight>
      </div>
    );
  }
  

    const settings = {
        dots: true,
        arrows: false,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToshow: 4,
        slidesToScroll: 1,
    };

    return (
        <BannerBox>
            <Slick {...settings}>
                <BannerImg1>
                  <SmallGreen1>
                    우리 동네에서 하는 물물교환 거래
                  </SmallGreen1>
                  <WelcomeWords1>
                    동물마켓에<br/>
                    오신것을 환영합니다
                  </WelcomeWords1>
                  <Describe1>
                  나에게 필요없는 상품이 누군가에게 꼭 필요한 상품이 될 수 있습니다.<br/>
                  동물마켓은 0원의 비용으로 지구와 사람 모두가 행복을 누릴 수 있는 환경을 생각합니다.<br/>
                  실시간 채팅을 통해 필요한 상품만 쏙 골라갈 수 있도록 스마트한 소비를 도와드릴게요! 
                  </Describe1>
                  <LoginBtn>로그인하기</LoginBtn>
                </BannerImg1>
                <BannerImg2>
                  <SmallGreen2>
                      친절한 냥이가 설명해주는
                    </SmallGreen2>
                    <WelcomeWords2>
                      동물마켓 이용<br/>
                      튜토리얼
                    </WelcomeWords2>
                    <Describe2>
                    동물마켓은 내가 가진 물건으로 필요한 물건을 구할 수 있어요.<br/>  
                    교환하고 싶은 물건이 있다면, 단체 채팅에 참여해보세요.<br/>
                    채팅을 통해 구매자와 매칭이 되면 1:1 채팅을 할 수 있습니다!
                    </Describe2>
                    <TradeBtn>
                      거래하러 가기
                    </TradeBtn>
                </BannerImg2>
                <BannerImg3>
                    <SmallGreen3>
                      우리 동네에서 하는 물물교환 거래
                    </SmallGreen3>
                    <WelcomeWords3>
                      동물마켓 이용 꿀팁!
                    </WelcomeWords3>
                    <Describe3>
                    1. 마감 임박 상품을 노리세요<br/>
                    2. 채팅이 활발하지 않은 물건을 선점해보세요<br/>
                    3. 원하는게 없을 때는 내가 글을 등록해보세요
                    </Describe3>
                    <TradeBtn>
                      거래하러 가기
                    </TradeBtn>
                </BannerImg3>
            </Slick>
        </BannerBox>
    );
}


const ArrowLeft = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 950px;
`;

const ArrowRight = styled.div`
  position: absolute;
  left: 5px;
  right: 1000px;
  top: 10px;
  z-index: 2;
`;

const BannerBox = styled.div`
width: 100vw;
height: 450px;
margin: 104px 0 100px;
padding: 60px 50px 30px 144px;
background-color: #f5f5f5;
`;

const BannerImg1=styled.div`

`;

const SmallGreen1=styled.div`

  height: 14px;
  margin: 33px 265px 6px 0;
  font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #3fbe81;

`;

const WelcomeWords1=styled.div`
  
  height: 110px;
  margin: 6px 117px 20px 1px;
  font-family: Roboto;
  font-size: 36px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.53;
  letter-spacing: 0.72px;
  text-align: left;
  color: #1c1c1c;

`;

const Describe1=styled.div`

  height: 66px;
  margin: 20px 58px 24px 3px;
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.57;
  letter-spacing: normal;
  text-align: left;
  color:#7d7d7d;
`;

const LoginBtn=styled.button`
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
  background:#3fbe81;
  color:#ffffff;
  border: 1px solid #ffffff;
`;

const BannerImg2=styled.div`

`;

const SmallGreen2=styled.div`
flex-grow: 0;
margin: 33px 236px 6px 0;
font-family: Roboto;
font-size: 12px;
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: normal;
letter-spacing: normal;
text-align: left;
color: #3fbe81;
  
`;

const WelcomeWords2=styled.div`
flex-grow: 0;
margin: 6px 124px 20px 1px;
font-family: Roboto;
font-size: 36px;
font-weight: bold;
font-stretch: normal;
font-style: normal;
line-height: 1.53;
letter-spacing: 0.72px;
text-align: left;

color: #1c1c1c;
`;

const Describe2=styled.div`
flex-grow: 0;
  margin: 20px 0 24px 3px;
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.57;
  letter-spacing: normal;
  text-align: left;
color:#7d7d7d;
`;

const TradeBtn=styled.button`
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
  background:#3fbe81;
  color:#ffffff;
  border: 1px solid #ffffff;
`;

const BannerImg3=styled.div`

`;
const SmallGreen3=styled.div`

height: 14px;
flex-grow: 0;
margin: 33px 134px 6px 0;
font-family: Roboto;
font-size: 12px;
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: normal;
letter-spacing: normal;
text-align: left;
color: #3fbe81;
  
`;

const WelcomeWords3=styled.div`
height: 55px;
flex-grow: 0;
margin: 6px 0 22px 1px;
font-family: Roboto;
font-size: 36px;
font-weight: bold;
font-stretch: normal;
font-style: normal;
line-height: 1.53;
letter-spacing: 0.72px;
text-align: left;

color: #1c1c1c;
`;

const Describe3=styled.div`
height: 66px;
flex-grow: 0;
margin: 22px 24px 33px 3px;
font-family: Roboto;
font-size: 14px;
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: 1.57;
letter-spacing: normal;
text-align: left;
color:#7d7d7d;
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