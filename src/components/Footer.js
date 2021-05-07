import React from 'react';
import styled from "styled-components";

const Footer = () => {
    return (
        <React.Fragment>
            <FootC>
              <WrapMarketInfo>
                <LogoWrap>
                      <LogoBox/>
                      <LogoText>동물마켓</LogoText>
                  </LogoWrap>
                  <Contents>
                  동물마켓은 사용자 위치를 기반으로 물물 교환을 통해<br/>
                  물품을 받는 사이트입니다. 친환경적인 방법으로 필요한<br/> 
                  물건을 교환하는 스마트한 문화를 만들겠습니다.
                  </Contents>

                  <TeamLeaderBox>
                    <TeamBox>
                    <BoldText>Team</BoldText>
                    <MiddleText>Hanghae99 동물의 왕국</MiddleText>
                    </TeamBox>
                    <LeaderBox>
                      <BoldText>Leader</BoldText>
                      <MiddleText>원동균</MiddleText>
                    </LeaderBox>
                  </TeamLeaderBox>
              </WrapMarketInfo>
              
                <FBD>
                  <FrontEnd>
                    <BoldText>FrontEnd</BoldText>
                   
                      <MiddleText>곽혜미</MiddleText>
                      <ID>goadl92@naver.com</ID>
                      <Git>https://github.com/hyemigwak</Git>
                      
                      <MemMar>
                        <MiddleText>이지은</MiddleText>
                        <ID>wldms9412@naver.com</ID>
                        <Git>https://github.com/Jinnycorn</Git>
                      </MemMar>
                      
                    

                  </FrontEnd>
                  <BackEnd>
                    <BoldText>BackEnd</BoldText>
                    <MiddleText>원동균</MiddleText>
                      <ID>waterflame1@naver.com</ID>
                      <Git>https://github.com/WonDongGyun</Git>
                      
                      <MemMar>
                        <MiddleText>이재윤</MiddleText>
                        <ID>uon10@naver.com</ID>
                        <Git>https://github.com/Leejaeyoon94</Git>
                      </MemMar>
                  </BackEnd>
                  <Design>
                    <BoldText>Design</BoldText>
                    <MiddleText>최혜진</MiddleText>
                      <ID>wemsgu32625@naver.com</ID>
                      <Git>https://www.behance.net/oxke05676019</Git>
                      
                      <MemMar>
                        <MiddleText>황나경</MiddleText>
                        <ID>ghkd6868@naver.com</ID>
                      </MemMar>
                  </Design>
                </FBD>
              
              
            </FootC>
        </React.Fragment>
    )
}

const FootC=styled.div`
width: 100%;
height: 360px;
margin: 100px 0 0;
padding: 60px 144px 110px;
background:#f5f5f5;
display:flex;
`;

const WrapMarketInfo=styled.div`

`;

const LogoWrap=styled.div`
display:flex;
align-items:center;
`;

const LogoBox = styled.div`
  width: 42px;
  height: 42px;
  margin: 0 0 1px 0;
  background-color: #c4c4c4;
`;

const LogoText = styled.div`
  width: 118px;
  height: 40px;
  margin: 0px 357px 0px 0px;
  flex-grow: 0;
  font-size: 30px;
  text-align: left;
  color: #2f2f2f;
  font-family: "Binggrae";
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  position:relative;
  left: 16px;
`;

const Contents = styled.div`
  font-size: 12px;
  text-align: left;
  font-stretch: normal;
  font-style: normal;
  line-height: 20px;
  font-stretch: normal;
  font-style: normal;
  color: #7d7d7d;
  width: 273px;
  height: 60px;
  position:relative;
  top: 20px;
`;

const TeamLeaderBox=styled.div`
display:flex;
justify-contents:space-evenly;

`;

const TeamBox=styled.div`
  position:relative;
  top:23px;
  flex-grow: 0;
  height:45px;
  margin: 23px 60px 0 0;
`;

const LeaderBox=styled.div`
position:relative;
top:23px;
height:45px;
flex-grow: 0;
margin: 23px 60px 0 0;
`;

const FBD=styled.div`
display:flex;
position:relative;
right:121px;

`;

const FrontEnd=styled.div`
  width: 72px;
  height: 21px;
  flex-grow: 0;
  margin: 11px 97px 30px 121px;
  font-family: Roboto;
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.17;
  letter-spacing: normal;
  text-align: left;
  color: var(--head-text-1-2);
`;

const BackEnd=styled.div`
width: 70px;
height: 21px;
flex-grow: 0;
margin: 11px 115px 30px 45px;
font-family: Roboto;
font-size: 18px;
font-weight: 500;
font-stretch: normal;
font-style: normal;
line-height: 1.17;
letter-spacing: normal;
text-align: left;
color: var(--head-text-1-2);
`;

const Design=styled.div`
width: 56px;
height: 21px;
flex-grow: 0;
margin: 11px 108px 30px 46px;
font-family: Roboto;
font-size: 18px;
font-weight: 500;
font-stretch: normal;
font-style: normal;
line-height: 1.17;
letter-spacing: normal;
text-align: left;
color: var(--head-text-1-2);
`;

const BoldText=styled.div`
flex-grow: 0;
margin: 0 0 8px;
color: #4c4c4c;
font-size: 18px;
font-weight: 600;
font-stretch: normal;
font-style: normal;
line-height: normal;
letter-spacing: normal;
text-align: left;
color: var(--head-text-1-2);
`;

const MiddleText=styled.div`

  flex-grow: 0;
  margin: 8px 0 0;
  color: #7d7d7d;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: var(--sub-text-title-2);
`;

const MemMar=styled.div`
margin-top:24px;
`;
const ID=styled.div`
color:#7d7d7d;
font-size:10px;
text-align: left;
margin: 6px 32px 2px 0;

`;

const Git=styled.div`
color:#7d7d7d;
font-size:10px;
text-align: left;
margin: 2px 0 0;

`;
export default Footer;
