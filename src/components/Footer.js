import React from "react";
import styled from "styled-components";
import logo1 from "../image/logo1.png";
import { useMediaQuery } from "react-responsive";

const Footer = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  return (
    <React.Fragment>
      <FootC>
        <WrapMarketInfo>
          <LogoWrap>
            <LogoBox src={logo1} />
          </LogoWrap>
          {isMobile ? null : (
            <>
              <Contents>
                동물마켓은 사용자 위치를 기반으로 물물 교환을 하는 사이트입니다. <br />
                친환경적인 방법으로 필요한 물건을 교환하는 스마트한 문화를 만들겠습니다.
              </Contents>
            </>
          )}
          {isMobile ? null : (
            <>
              <TeamLeaderBox>
                <TeamBox>
                  <BoldText>Team</BoldText>
                  <MiddleText>
                    Hanghae99
                    <br />
                    동물의 왕국
                  </MiddleText>
                </TeamBox>
                <LeaderBox>
                  <BoldText>Leader</BoldText>
                  <MiddleText>원동균</MiddleText>
                </LeaderBox>
              </TeamLeaderBox>
            </>
          )}
        </WrapMarketInfo>

        <FBD>
          <FrontEnd>
            <BoldText>FrontEnd</BoldText>

            <Teammates>
              <Teammate1>
                <MiddleText>곽혜미</MiddleText>
                <ID href="mailto:goadl92@naver.com">goadl92@naver.com</ID>
                <br />
                <Git target="_blank" href="https://github.com/hyemigwak">
                  https://github.com/hyemigwak
                </Git>
              </Teammate1>
              <Member>
                <MiddleText>이지은</MiddleText>
                <ID href="mailto:wldms9412@naver.com">wldms9412@naver.com</ID>
                <br />
                <Git target="_blank" href="https://github.com/Jinnycorn">
                  https://github.com/Jinnycorn
                </Git>
              </Member>
            </Teammates>
          </FrontEnd>
          <BackEnd>
            <BoldText>BackEnd</BoldText>
            <Teammates>
              <Teammate1>
                <MiddleText>원동균</MiddleText>
                <ID href="mailto:waterflame1@naver.com">waterflame1@naver.com</ID>
                <br />
                <Git target="_blank" href="https://github.com/WonDongGyun">
                  https://github.com/WonDongGyun
                </Git>
              </Teammate1>
              <Member>
                <MiddleText>이재윤</MiddleText>
                <ID href="mailto:uon10@naver.com">uon10@naver.com</ID>
                <br />
                <Git target="_blank" href="https://github.com/Leejaeyoon94">
                  https://github.com/Leejaeyoon94
                </Git>
              </Member>
            </Teammates>
          </BackEnd>
          <Design>
            <BoldText>Design</BoldText>
            <Teammates>
              <Teammate1>
                <MiddleText>최혜진</MiddleText>
                <ID href="mailto:wemsgu32625@naver.com">wemsgu32625@naver.com</ID>
                <br />
                <Git target="_blank" href="https://www.behance.net/oxke05676019">
                  https://www.behance.net/oxke05676019
                </Git>
              </Teammate1>
              <Member>
                <MiddleText>황나경</MiddleText>
                <ID href="ghkd6868@naver.com">ghkd6868@naver.com</ID>
              </Member>
            </Teammates>
          </Design>
        </FBD>
      </FootC>
    </React.Fragment>
  );
};

const FootC = styled.div`
  width: 100vw;
  height: 360px;
  margin-top: 200px;
  padding: 85px 190px;
  background: #f5f5f5;
  display: flex;

  @media (max-width: 767px) {
    width: 100%;
    height: 590px;
    padding: 50px 60px 60px;
    display: block;
    margin-top: 30px;
  }

  @media (min-width: 768px) and (max-width: 1199px) {
    height: 530px;
    padding: 100px 30px 60px;
    background: #f5f5f5;
  }
`;

const WrapMarketInfo = styled.div`
  @media (max-width: 767px) {
    width: 100%;
    padding: 0px 0px 30px;
    display: flex;
    margin-right: 0px;
  }

  @media (min-width: 768px) and (max-width: 1199px) {
    padding: 10px 5px 60px;
  }
`;

const Teammates = styled.div`
  @media (max-width: 767px) {
    display: block;
    font-size: 12px;
  }
`;

const Teammate1 = styled.div`
  @media (max-width: 767px) {
    font-size: 12px;
  }
`;

const Member = styled.div`
  margin-top: 24px;

  @media (max-width: 767px) {
    margin-top: 6px;
    margin-bottom: 6px;
  }
`;

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
`;

const LogoBox = styled.img`
  @media (max-width: 767px) {
    width: 90%;
  }
`;

const Contents = styled.div`
  font-size: 12px;
  text-align: left;
  line-height: 20px;
  color: #7d7d7d;
  width: 273px;
  height: 60px;
  position: relative;
  top: 20px;

  @media (max-width: 767px) {
    margin-left: 15px;
    font-size: 8px;
  }
`;

const TeamLeaderBox = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const TeamBox = styled.div`
  position: relative;
  top: 23px;
  flex-grow: 0;
  height: 45px;
  margin: 23px 60px 0 0;
`;

const LeaderBox = styled.div`
  position: relative;
  top: 23px;
  height: 45px;
  flex-grow: 0;
  margin: 23px 60px 0 0;
`;

const FBD = styled.div`
  display: flex;
  margin-left: 121px;
  position: relative;
  right: 121px;

  @media (max-width: 767px) {
    display: block;
    margin-left: 30px;
  }

  @media (min-width: 768px) and (max-width: 1199px) {
    margin-left: 30px;
  }
`;

const FrontEnd = styled.div`
  width: 72px;
  height: 21px;
  flex-grow: 0;
  margin: 11px 97px 30px 121px;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.17;
  text-align: left;
  color: var(--head-text-1-2);

  @media (max-width: 767px) {
    margin: 0px 60px 135px 110px;
  }
`;

const BackEnd = styled.div`
  width: 70px;
  height: 21px;
  flex-grow: 0;
  margin: 11px 115px 30px 45px;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.17;
  text-align: left;
  color: var(--head-text-1-2);

  @media (max-width: 767px) {
    margin: 0px 60px 135px 110px;
  }
`;

const Design = styled.div`
  width: 56px;
  height: 21px;
  flex-grow: 0;
  margin: 11px 108px 30px 46px;
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.17;
  letter-spacing: normal;
  text-align: left;
  color: var(--head-text-1-2);

  @media (max-width: 767px) {
    margin-top: 20px;
    margin-left: 110px;
  }

  @media (min-width: 768px) and (max-width: 1199px) {
    position: absolute;
    top: 220px;
    left: 70px;
  }
`;

const BoldText = styled.div`
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

const MiddleText = styled.div`
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

const ID = styled.a`
  color: #7d7d7d;
  font-size: 10px;
  text-align: left;
  margin: 6px 32px 2px 0;
`;

const Git = styled.a`
  color: #7d7d7d;
  font-size: 10px;
  text-align: left;
  margin: 2px 0 0;
`;
export default Footer;
