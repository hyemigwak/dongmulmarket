import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../shared/Cookie";
import { history } from "../redux/configureStore";

const Detail = (props) => {
  const id = props.match.params.id;
  console.log(id);
  const products = useSelector((state) => state.post.post_list);
  const product_idx = products.findIndex((p) => p.ProductId === Number(id));
  const product = products[product_idx];
  console.log(product);

  //내가 쓴건지 아는 방법(일반로그인일때) -> 서버에서 내려오는 email값이 있을때 주석 풀자요
  // const is_me = getCookie("email") === props.email;

  return (
    <React.Fragment>
      <WrapDetail>
        <WrapBox>
          <ProductsBox>
            <Img src={product.image_url} />
            <InfoBox>
              <Text>
                <span>품목명:</span> &nbsp;{product.myItem}
              </Text>
              <Text>
                <span>카테고리: </span>&nbsp;카테고리도 디테일에서 받아와야겠다
              </Text>
              <Text>
                <span>글 올린 시간: </span> &nbsp;{product.createdAt}
              </Text>
              <Text>
                <span>교환 종료 시간: </span> &nbsp;{product.expireDate}
              </Text>
              <Text>
                <span>경매 참여 인원:</span> &nbsp;채팅이 구현되면 받아와야겠다.
              </Text>
              <Text>
                <span>코멘트:</span> &nbsp; 목api에 코멘트를 안넣었네 디테일에서 받아야겠다
              </Text>
            </InfoBox>
          </ProductsBox>
          <ChatBox>
            <ChatView>
              <br />
              <h2>
                <b>😺Chating😺</b>
              </h2>
              <h3>user1님이 입장했습니다.</h3>
              <h3>user2님이 입장했습니다.</h3>
              <ChatInputC>
                <ChatInput placeholder=" &nbsp;내용을 입력하세요." />
                <ChatBtn>입력</ChatBtn>
              </ChatInputC>
            </ChatView>
          </ChatBox>
          <UserView>
            <Text>
              <h3>
                <b>참여중</b>
              </h3>
            </Text>
            <UserBox>
              <UserNameBtn
                onClick={() => {
                  if (window.confirm("user1님과 거래를 진행하시겠습니까?")) {
                    history.push("/contact");
                  } else {
                    return;
                  }
                }}
              >
                user1
              </UserNameBtn>
              <UserNameBtn>user2</UserNameBtn>
            </UserBox>
          </UserView>
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

const WrapBox = styled.div`
  display: flex;
  width: 1024px;
  margin: auto;
  justify-content: space-evenly;
  align-items: center;
`;

const ProductsBox = styled.div`
  height: 100vh;
  width: 600px;
`;

const Text = styled.h3`
  span {
    font-weight: 600;
  }
`;

const Img = styled.img`
  margin-left: 100px;
  margin-top: 40px;
  width: 400px;
  height: 300px;
`;

const InfoBox = styled.div`
  margin-left: 100px;
  margin-top: 40px;
`;

const ChatBox = styled.div`
  margin-top: 10px;
  height: 100vh;
  width: 600px;
`;

const ChatView = styled.div`
  background: #ffe0a2;
  height: 500px;
  width: 500px;
  margin-left: 30px;
  margin-top: 30px;
  border-radius: 30px;
  border: 1px solid #eee;
  text-align: center;
`;

const ChatInputC = styled.div`
  justify-content: center;
  margin-top: 370px;
`;

const ChatInput = styled.input`
  height: 50px;
  width: 400px;
  border-radius: 20px;
  border: 1px solid #eee;

  margin-top: 15px;
  background: #fff;
`;

const ChatBtn = styled.button`
margin-left: 10px;
height: 40px;
padding: 10px;
border-radius: 4px;
font-size: 13px;
font-weight: 600;

border: 1px solid #dbdbdb;
cursor: pointer;
outline: none;
background-color: #ffc149;
color: black;
border-radius: 20px;
}`;

const UserView = styled.div`
  margin-bottom: 300px;
  margin-left: 30px;

  text-align: center;
`;

const UserBox = styled.div`
  background: #ffc149;
  height: 550px;
  width: 150px;
  border-radius: 20px;
`;

const UserNameBtn = styled.button`
  margin-left: 10px;
  margin-top: 5px;
  height: 40px;
  width: 100px;
  padding: 10px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;

  border: 1px solid #dbdbdb;
  cursor: pointer;
  outline: none;
  background-color: #ffe0a2;
  color: black;
  border-radius: 20px;
`;

export default Detail;
