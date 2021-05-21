import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { getCookie } from "../shared/Cookie";
import { useDispatch, useSelector } from "react-redux";
import bellimg from "../image/bell.png";
import { actionCreators as postActions } from "../redux/modules/post";
import SalesDetails from "./SalesDetails";

import Carousel from '../components/Carousel';
import Carousel2 from '../components/Carousel2';
import Carousel3 from '../components/Carousel3';

const Mypage = (props) => {
  const dispatch = useDispatch();
  const salesList = useSelector((state) => state.post.post_list);
  console.log(salesList);
  const email = localStorage.getItem("email");

  const cookie = getCookie("user_login") ? true : false;
  const is_login = useSelector((state) => state.user.is_login);

  //내 게시글인것만 가져와서 리스트로 만든다.
  const MyProductList = salesList.filter((s) => s.email === email);


  const [showResults, setShowResults] = useState(false);
  
  const [isEmpty, setisEmpty]=useState(false);

  const showFunction = (props) => {
    setShowResults(true);
  };


  useEffect(() => {
    dispatch(postActions.getPostAPI());
  }, []);

  useEffect(()=>{
    const len=MyProductList.length;
    console.log(len);
    if(len==0)
    {
      setisEmpty(true);     
    }
    console.log(isEmpty);
  },[]);


  return (
    <React.Fragment>
      <WrapMypage>
        <MpageHeader>
          <Title>마이페이지</Title>
          <AlarmIcon className="bell" src={bellimg} />
          <LocationBtn
            onClick={() => {
              history.push("/mylocation");
            }}
          >
            나의 위치 설정하기
          </LocationBtn>
        </MpageHeader>

        <MyPageC>
         
        {isEmpty ? 
        <>
        <SellTitle>나의 판매내역</SellTitle>
        <SellContainer>
          <BlankBox>
            <BlankText style={{width: "443px", height: "60px"}}>아직 판매한 내역이 없어요 :( !</BlankText>
          </BlankBox>
          
        </SellContainer>

        <DoneTitle>교환완료 내역</DoneTitle>
        <DoneContainer>
            <BlankBox>
              <BlankText2 style={{width: "510px", height: "49px"}}>교환완료된 내역이 아직 없어요 :( !</BlankText2>    
            </BlankBox>
        </DoneContainer>

        <IngTitle>교환실패 내역</IngTitle>
        <IngContainer>
            <BlankBox>
              <BlankText2 style={{width: "510px", height: "49px"}}>교환실패한 내역이 아직 없어요 :( !</BlankText2>    
            </BlankBox>
        </IngContainer>
        </>
        : 
        <>
        <SellTitle>나의 판매내역</SellTitle>
        <SellContainer>
          <Carousel/>
        </SellContainer>


        <DoneTitle>교환완료 내역</DoneTitle>
        <DoneContainer>
          <Carousel2/>
        </DoneContainer>

        <IngTitle>교환실패 내역</IngTitle>
        <IngContainer>
          <Carousel3/>
        </IngContainer>
        </>
        }
          
          
      </MyPageC>
      </WrapMypage>
    </React.Fragment>
  );
};


const WrapMypage = styled.div`
  /* 최상단과 항상 떨어져 있게 함 */
  width: 1200px;
  height: 1700px;
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  margin: auto;
  
`;

const MpageHeader = styled.div`
  display: flex;
`;

const Title = styled.div`
  margin: 90px 0px 0px 50px;
  font-size: 36px;
  font-weight: bold;
  min-width:180px;
  display: table;
  color: #1c1c1c;

`;

const AlarmIcon = styled.img`
  width: 51px;
  height: 51px;
  flex-grow: 0;
  margin: 93px 683px 0px 16px;
  padding: 14px 14px 13px 13px;
  background-color: #3fbe81;
  border-radius: 30px;
  z-index: 1;

  .bell {
    z-index: 1000;
    width: 24px;
    height: 24px;
    flex-grow: 0;
    object-fit: contain;
    color: #ffffff;
  }
`;

const LocationBtn = styled.button`
  min-width: 11.500em; 
  height: 2.125em; 
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 100px;
  margin-bottom: 0px;
  padding: 7px 14px 6px;
  border-radius: 83px;
  border: solid 2px #3fbe81;
  cursor: pointer;
  
  text-align:center;

  @media (max-width: 767px) {
    position: absolute;
    left:800px;
    top:120px;
     }
  @media (min-width: 768px) and (max-width: 1190px) {
   
    position: absolute;
    left:800px;
    top:120px;
    
  }
`;

const BlankBox=styled.div`
height: 278px;
width:1000px;
margin: auto;
//background:pink;
justify-content:center;
text-align:center;

flex-direction: row;


}

`;

const BlankText=styled.div`

margin-left: 280px;
margin-top: 100px;
font-size: 30px;
font-weight: 600;
line-height: 1.67;
justify-content:center;
margin-left: 250px;
color:#d2d2d2;

@media (max-width: 767px) {
  margin-left: 210px;

}
@media (min-width: 768px) and (max-width: 1190px) {
  margin-left: 210px;
}

`;

const BlankText2=styled.div`


margin-top: 100px;
font-size: 30px;
font-weight: 600;
line-height: 1.67;
justify-content:center;
margin-left: 250px;
color:#d2d2d2;

@media (max-width: 767px) {
  margin-left: 210px;

}
@media (min-width: 768px) and (max-width: 1190px) {
  margin-left: 210px;
}


`;

const MyPageC = styled.div`
  margin: auto;
  width: 1200px;
  margin-top:70px;
  height: 100vh;
`;

const SellContainer = styled.div`
  display: flex;

`;

const DoneContainer = styled.div`
  display: flex;
  
`;

const IngContainer = styled.div`
  display: flex;

`;

const SellTitle = styled.div`
  flex-grow: 0;
  margin-left: 100px;
  font-size: 24px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: normal;
  display: flex;
  color: #2f2f2f;
  margin-bottom: 24px;

`;


const DoneTitle = styled.div`
  flex-grow: 0;
  margin-top: 50px;
  margin-left: 100px;
  font-size: 24px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: normal;
  display: flex;
  color: #2f2f2f;
  margin-bottom: 24px;
`;



const IngTitle = styled.div`
  flex-grow: 0;
  margin-top: 50px;
  margin-left: 100px;
  font-size: 24px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: normal;
  display: flex;
  color: #2f2f2f;
  margin-bottom: 24px;
`;

export default Mypage;
