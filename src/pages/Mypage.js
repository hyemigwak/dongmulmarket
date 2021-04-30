import React from "react";
import styled from "styled-components";

const Mypage = () => {
  return (
    <React.Fragment>
      <WrapMypage>
        <MyPageC>
         <SettingC>
           <h2>설정</h2>
         </SettingC>
         <ContentsC>
           <LocationC>
            <h2>위치 설정</h2>
            <button>위치 설정</button>
           </LocationC>
           <FinishC>
             <FinishTitle>
             <h2>내 교환 완료 내역</h2>
             </FinishTitle>
             <BoxContainer>
              <Box/>
              <Box/>
              <Box/>
             </BoxContainer>  
           </FinishC>
           <StillC>
               <StillTitle><h2>내 교환 중 내역</h2></StillTitle>
               <BoxContainer>
                <Box/>
                <Box/>
                <Box/>
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

const MyPageC=styled.div`
margin:auto;
width:1200px;
margin-top:100px;
height:100vh;
display:flex;

background:aliceblue;
`;

const SettingC =styled.div`
width: 200px;
height:100vh;

margin-top:50px;

`;

const ContentsC=styled.div`
width: 600px;
height:100vh;
margin-left:300px;
margin-top:60px;

`;

const LocationC=styled.div`
justify-content: space-between;
display:flex;
`;

const FinishC=styled.div`
justify-content: space-evenly;
margin-top:20px;
`;

const FinishTitle=styled.div`

`;

const BoxContainer=styled.div`
justify-content: space-evenly;
display:flex;
`;

const StillC=styled.div`
justify-content: space-evenly;
margin-top:50px;

`;

const StillTitle=styled.div`

`;
const Box=styled.div`
width:200px;
height:250px;
background:#eee;
margin-right:10px;
`;
export default Mypage;
