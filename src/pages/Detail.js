import React from 'react';
import styled from "styled-components";

const Detail = (props)=>{

    return (
        <React.Fragment>
            <WrapDetail>
                <WrapBox>
                    <ProductsBox>
                    <Img  src="http://via.placeholder.com/400x300"/>
                    <InfoBox>
                        <p>품목명: 감자</p>
                        <p>카테고리: 농작물</p>
                        <p>글 올린 시간: 3분 전</p>
                        <p>교환 종료 시간: 14:00</p>
                        <p>경매 참여 인원: 4명</p>
                        <p>코멘트: hi!</p>
                    </InfoBox>
                    </ProductsBox>
                    <ChatBox>
                        <ChatBtn>채팅하기</ChatBtn>
                        <ChatGrid>

                        </ChatGrid>
                    </ChatBox>
                </WrapBox>   
            </WrapDetail>
        </React.Fragment>
    );
};

const WrapDetail = styled.div`
  /* 최상단과 항상 떨어져 있게 함 */
  padding-top: 60px; 
  display: flex;
  
  /* @media (max-width: 1000px){
    heigth: 
  } */
`;

const WrapBox=styled.div`
display:flex;
width:1200px;
margin:auto;
justify-content: space-evenly;
`;

const ProductsBox=styled.div`
background:aliceblue;
height:650px;
width:600px;
`;

const Img=styled.img`
margin-left: 100px;
margin-top: 40px;
`;

const InfoBox=styled.div`
margin-left: 100px;
margin-top: 40px;
`;

const ChatBtn=styled.button`

margin-left: 480px;
margin-top: 10px;
}`;
const ChatBox=styled.div`
background:aliceblue;
height:650px;
width:600px;
`;

const ChatGrid=styled.div`
background:#fff;
height:550px;
width:500px;
margin-left: 50px;
margin-top: 30px;
`;


export default Detail;