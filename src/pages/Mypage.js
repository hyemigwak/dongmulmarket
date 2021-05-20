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

import Carousel from '../components/Carousel';

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
        </>
        : 
        <>
        <SellTitle>나의 판매내역</SellTitle>
        <SellContainer>
        <Carousel/>
          {/* <LeftArrow src={LVector} />
          <SellBoxC>
            {MyProductList?.map((myProduct, idx) => (
                <SalesDetails {...myProduct} key={idx} />
              ))}
          </SellBoxC>
          <RightArrow src={RVector} /> */}
        </SellContainer>


        <DoneTitle>교환완료 내역</DoneTitle>
        <DoneContainer>
        
          {/* <LeftArrow src={LVector} />
          <DoneBoxC>
            <ProductBox />
            <ProductBox />
            <ProductBox />
            <ProductBox />
          </DoneBoxC>
          <RightArrow src={RVector} /> */}
        </DoneContainer>

        {/* <IngTitle>교환 진행중</IngTitle>
        <IngContainer>
          <LeftArrow src={LVector} />
          <DoneBoxC>
            <ProductBox />
            <ProductBox />
            <ProductBox />
            <ProductBox />
          </DoneBoxC>
          <RightArrow src={RVector} />
        </IngContainer> */}
        </>
        }
          
          
      </MyPageC>
      </WrapMypage>
    </React.Fragment>
  );
};

const BlankBox=styled.div`
height: 278px;
width:1000px;
margin: auto;
//background:pink;
justify-content:center;
text-align:center;

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

`;

const BlankText2=styled.div`


margin-top: 100px;
font-size: 30px;
font-weight: 600;
line-height: 1.67;
justify-content:center;
margin-left: 250px;
color:#d2d2d2;

`;
const WrapMypage = styled.div`
  /* 최상단과 항상 떨어져 있게 함 */
  width: 1200px;
  height: 1200px;
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
  
  //display: table;

  text-align:center;
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

const LeftArrow = styled.img`
  width: 18px;
  height: 36.3px;
  object-fit: contain;
  margin: 100px 0px 0px 0px;
  z-index: 1000;
`;

const RightArrow = styled.img`
  width: 18px;
  height: 36.3px;
  margin: 100px 0px 0px 0px;
  object-fit: contain;
`;

const SellBoxC = styled.div`
width: 1200px;
margin: auto;
display: flex;
justify-content: flex-start;
`;

const ProductBox = styled.div`
width: 205px;
height: 278px;
flex-grow: 0;

margin: 40px 30px 50px 60px;

padding: 0 0 16px;
border-radius: 8px;
border: solid 1px #91be89;
position: relative;
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

const DoneBoxC = styled.div`
  width: 1200px;
  margin: auto;
  display: flex;
  justify-content: flex-start;
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
