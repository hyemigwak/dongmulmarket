import React from "react";
import styled from "styled-components";
import logo1 from "../image/logo1.png";

const Footer = () => {
  return (
    <React.Fragment>
      <FootC>
        <WrapMarketInfo>
          <LogoWrap>
            <LogoBox src={logo1} />
          </LogoWrap>
          <Contents>
            동물마켓은 사용자 위치를 기반으로 물물 교환을 통해
            <br />
            물품을 받는 사이트입니다. 친환경적인 방법으로 필요한
            <br />
            물건을 교환하는 스마트한 문화를 만들겠습니다.
          </Contents>

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
  width: 100%;
  height: 360px;
  margin-top: 200px;
  padding: 70px 110px 100px;
  background: #f5f5f5;
  display: flex;

  @media (max-width: 768px) {
    height: 430px;
    padding: 100px 30px 60px;
  }
`;

const WrapMarketInfo = styled.div``;

const Teammates = styled.div`
  @media (max-width: 768px) {
    display: flex;
  }
`;

const Teammate1 = styled.div``;

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
`;

const LogoBox = styled.img``;

const Contents = styled.div`
  font-size: 12px;
  text-align: left;
  line-height: 20px;
  color: #7d7d7d;
  width: 273px;
  height: 60px;
  position: relative;
  top: 20px;
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

  @media (max-width: 768px) {
    display: block;
    margin-left: 110px;
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

  @media (max-width: 768px) {
    margin: 0px 97px 30px 45px;
    position: relative;
    bottom: 40px;
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

  @media (max-width: 768px) {
    margin-top: 0px;
    margin-bottom: 20px;
    position: relative;
    top: 30px;
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

  @media (max-width: 768px) {
    margin-top: 20px;
    position: relative;
    top: 110px;
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

const Member = styled.div`
  margin-top: 24px;

  @media (max-width: 768px) {
    margin-top: 0px;
    margin-left: 20px;
    position: absolute;
    left: 170px;
  }
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
