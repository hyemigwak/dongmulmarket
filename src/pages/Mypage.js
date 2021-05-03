import React,{ Component,useState } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

const Mypage = () => {
  
  const [showResults,setShowResults]=React.useState(false);
  const showFunction=(props)=>{
   setShowResults(true);
  }


  return (
    <React.Fragment>
      <WrapMypage>
        <Title>마이페이지</Title>
        <MyPageC>
          <SettingC>
            <h2>설정</h2>
          </SettingC>
          <ContentsC>
            <LocationC>
              <h2>위치 설정</h2>
              <LocationBtn
                onClick={() => {
                  history.push("/mylocation");
                }}
              >
                위치 설정
              </LocationBtn>
            </LocationC>
            <FinishC>
              <FinishTitle>
                <h2>내 교환 완료 내역</h2>
                <ShowBtn onClick={showFunction}>
                  {/* {showResults? <Results/>:null} */}
                  자세히보기
                  </ShowBtn>
                
              </FinishTitle>
              <BoxContainer>
                <Box />
                <Box />
                <Box />
              </BoxContainer>
            </FinishC>
            <StillC>
              <StillTitle>
                <h2>내 교환 중 내역</h2>
              </StillTitle>
              <BoxContainer>
                <Box />
                <Box />
                <Box />      
              </BoxContainer>
            </StillC>
           
          </ContentsC>
        </MyPageC>
      </WrapMypage>
    </React.Fragment>
  );
};

const WrapMypage = styled.div`
  /* 최상단과 항상 떨어져 있게 함 */
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  /* @media (max-width: 1000px){
    heigth: 
  } */
`;

const Title = styled.div`
  padding-top: 30px;
  width: 100%;
  margin: 10px;
  font-size: 30px;
  font-weight: 600;
  text-align: center;
`;

const MyPageC = styled.div`
  margin: auto;
  width: 1200px;
  margin-top: 40px;
  height: 100vh;
  display: flex;
  background: #ffffff;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.07);
  border-radius: 20px;
`;

const SettingC = styled.div`
  width: 200px;
  height: 100vh;
  margin-top: 50px;
  h2 {
    margin-left: 2rem;
    font-size: 24px;
    font-weight: 600;
  }
`;

const ShowBtn=styled.button`
width: 100px;
height: 40px;
padding: 8px;
box-sizing: border-box;
border-radius: 16px;
background: #ffc149;
border: none;
color: #212121;
font-weight: 600;
cursor: pointer;

margin-left:10px;
margin-bottom: 10px;
`;
const ContentsC = styled.div`
  width: 600px;
  height: 100vh;
  margin-left: 300px;
  margin-top: 60px;
`;

const LocationC = styled.div`
  justify-content: space-between;
  display: flex;
`;

const FinishC = styled.div`
  justify-content: space-evenly;
  margin-top: 20px;
`;

const FinishTitle = styled.div`
display:flex;
align-items:center;
`;

const BoxContainer = styled.div`
  justify-content: space-evenly;
  display: flex;
`;

const StillC = styled.div`
  justify-content: space-evenly;
  margin-top: 50px;
`;

const StillTitle = styled.div``;
const Box = styled.div`
  width: 200px;
  height: 200px;
  background: #eee;
  margin-right: 10px;
`;

const LocationBtn = styled.button`
  width: 120px;
  height: 40px;
  padding: 8px;
  box-sizing: border-box;
  border-radius: 16px;
  background: #ffc149;
  border: none;
  color: #212121;
  font-weight: 600;
  cursor: pointer;
`;
export default Mypage;
