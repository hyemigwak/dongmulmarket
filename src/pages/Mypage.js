import React, { Component, useState, useEffect } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { getCookie } from "../shared/Cookie";
import { useDispatch, useSelector } from "react-redux";
import bellimg from "../image/bell.png";
import LVector from "../image/LVector.png";
import RVector from "../image/RVector.png";

import { actionCreators as postActions } from "../redux/modules/post";
import SalesDetails from "./SalesDetails";

const Mypage = (props) => {
  const dispatch = useDispatch();
  const salesList = useSelector((state) => state.post.post_list);

  const cookie = getCookie("user_login") ? true : false;
  const is_login = useSelector((state) => state.user.is_login);

  const [showResults, setShowResults] = React.useState(false);
  const showFunction = (props) => {
    setShowResults(true);
  };

  useEffect(() => {
    dispatch(postActions.getPostAPI());
  }, []);

  // const Results = (props) => {
  //   return (
  //     <BoxContainer>
  //       <Box />
  //     </BoxContainer>
  //   );
  // };

  if (is_login && cookie) {
    console.log(salesList);
    return (
      <React.Fragment>
        <WrapMypage>
          <MpageHeader>
            <Title>마이페이지</Title>
            <div>
              <AlarmIcon className="bell"  src={bellimg}/>
            </div>
            <LocationBtn
                  onClick={() => {
                    history.push("/mylocation");
                  }}
                >
                  나의 위치 설정하기 >
                </LocationBtn>
          </MpageHeader>
          
          <MyPageC>
           <SellTitle>나의 판매내역</SellTitle>
           <SellContainer>
            <LeftArrow src={LVector}/>
            <SellBoxC>
              <SalesDetails salesList={salesList}/>
                {/* <ProductBox/>
                <ProductBox/>
                <ProductBox/>
                <ProductBox/> */}
            </SellBoxC>
            <RightArrow src={RVector}/>
           </SellContainer>

           <DoneTitle>교환완료 내역</DoneTitle>
           <DoneContainer>
           <LeftArrow src={LVector}/>
            <DoneBoxC>
                <ProductBox/>
                <ProductBox/>
                <ProductBox/>
                <ProductBox/>
            </DoneBoxC>
            <RightArrow src={RVector}/>
           </DoneContainer>
           
           <IngTitle>교환 진행중</IngTitle>
           <IngContainer>
            <LeftArrow src={LVector}/>
              <DoneBoxC>
                    <ProductBox/>
                    <ProductBox/>
                    <ProductBox/>
                    <ProductBox/>
                </DoneBoxC>
              <RightArrow src={RVector}/>            

           </IngContainer>
          
           
           
          </MyPageC>


        </WrapMypage>
      </React.Fragment>
    );
  } else {
    window.alert("로그인 해주세요!");
    history.push("/login");
    return null;
  }
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

const MpageHeader=styled.div`
display:flex;
height:200px;

`;

const Title = styled.div`
  margin: 90px 16px 0px 144px;
  font-size: 36px;
  font-weight: bold;
  line-height: 1.25;
  letter-spacing: 0.72px;
  text-align: left;
  color:#1c1c1c;
`;

const AlarmIcon= styled.img`
  width: 51px;
  height: 51px;
  flex-grow: 0;
  margin: 83px 683px 0px 20px;
  padding: 14px 14px 13px 13px;
  background-color: #3fbe81;
  border-radius: 30px;
  z-index: 1;

  .bell{
    z-index: 1000;
    width: 24px;
    height: 24px;
    flex-grow: 0;
    object-fit: contain;
    color:#fffff;
    
  }
`;

const LocationBtn = styled.button`
width: 184px;
height: 34px;
background-color:#ffffff;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
gap: 10px;
margin: 98.1px 200px;
padding: 7px 14px 6px;
border-radius: 83px;
border: solid 2px #3fbe81;
cursor: pointer;
`;

const MyPageC = styled.div`
  margin: auto;
  width: 1400px;

  height: 100vh;

`;

const SellContainer=styled.div`
display:flex;
`;

const DoneContainer=styled.div`
display:flex;
`;

const IngContainer=styled.div`
display:flex;
`;
const SellTitle=styled.div`
flex-grow: 0;
margin-left:100px;
font-size: 24px;
font-weight: 500;
line-height: 1;
letter-spacing: normal;
display:flex;
color: #2f2f2f;
margin-bottom:24px;
`;

const LeftArrow=styled.img`

width: 18px;
height: 36.3px;
object-fit: contain;
margin: 100px 0px 0px 0px;
z-index: 1000;
`;

const RightArrow=styled.img`
width: 18px;
height: 36.3px;
margin: 100px 0px 0px 0px;
object-fit: contain;


`;
const SellBoxC=styled.div`
width:1200px;
margin:auto;

display:flex;
justify-content: space-between;
`;

const ProductBox=styled.div`
width: 205px;
height: 230px;
flex-grow: 0;
margin: 0 1px 0 0;
padding: 180px 32px 16px 16px;
border-radius: 8px;
border: solid 1px #91be89;
`;

const DoneTitle=styled.div`
flex-grow: 0;
margin-top:50px;
margin-left:100px;
font-size: 24px;
font-weight: 500;
line-height: 1;
letter-spacing: normal;
display:flex;
color: #2f2f2f;
margin-bottom:24px;
`;

const DoneBoxC=styled.div`
width:1200px;
margin:auto;

display:flex;
justify-content: space-between;
`;

const IngTitle=styled.div`
flex-grow: 0;
margin-top:50px;
margin-left:100px;
font-size: 24px;
font-weight: 500;
line-height: 1;
letter-spacing: normal;
display:flex;
color: #2f2f2f;
margin-bottom:24px;
`;
const IngBoxC=styled.div`
width:1200px;
margin:auto;

display:flex;
justify-content: space-between;
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


const FinishC = styled.div`
  justify-content: space-evenly;
  margin-top: 20px;
  width: 600px;
  height: 300px;
`;

const FinishTitle = styled.div`
  display: flex;
  align-items: center;
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


export default Mypage;