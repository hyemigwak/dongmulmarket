import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../../redux/modules/post";
import trashcan from "../../image/trashcan.png";
import Swal from "sweetalert2";
import { history } from "../../redux/configureStore";

const SalesDetails = (props) => {
  const dispatch = useDispatch();

  const { image, title, wantItem, itemId, icrId } = props;

  const postDelete = () => {
    Swal.fire({
      title: "현재 판매중인 상품을 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonColor: "#3fbe81",
      cancelButtonColor: "#d6d6d6",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(postActions.deletePostAPI(itemId, icrId));
      } else return;
    });
  };

  return (
    <React.Fragment>
      <SalesListC>
        <Box>
          <ImgBox
            onClick={() => {
              history.push(`/detail/${itemId}`);
            }}
          >
            <Img src={image} alt="상품이미지" />
          </ImgBox>
          <TextBox
            onClick={() => {
              history.push(`/detail/${itemId}`);
            }}
          >
            <ProductTitle>{title}</ProductTitle>
            <Title>
              <span>희망교환템:</span> {wantItem}
            </Title>
          </TextBox>
          <DELETEBOX>
            <TrashImg src={trashcan} onClick={postDelete} />
          </DELETEBOX>
        </Box>
      </SalesListC>
    </React.Fragment>
  );
};

const SalesListC = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const Box = styled.div`
  width: 205px;
  height: 278px;
  flex-grow: 0;
  margin: 40px 40px 50px 0px;
  padding: 0 0 8px;
  border-radius: 8px;
  border: solid 1px #91be89;
  position: relative;
  cursor: pointer;

  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  box-sizing: border-box;
  overflow: hidden;
  background-color: #f8f8f8;

  border: solid 2px #91be89;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  :hover {
    transition: 0.2s;
    transform: scale(1.04);
    box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.05);
  }
`;

const ImgBox = styled.div`
  margin: auto;
  object-fit: contain;
  border-radius: 8px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom: 1px solid #91be89;

  max-width: 100%;
  text-align: right;
  z-index: 1000;
`;

const Img = styled.img`
  border-radius: 8px;
  z-index: 2;
  width: 202px;
  height: 160px;
  object-fit: cover;
`;

const ProductTitle = styled.div`
  flex-grow: 0;
  margin: 2px 0 4px;
  font-family: Roboto;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: left;
  color: #2f2f2f;
`;

const Title = styled.div`
  font-size: 13px;
  text-align: left;
  color: #2a2a2a;
  span {
    font-size: 12px;
    color: #737373;
  }
`;

const TextBox = styled.div`
  position: relative;
  top: 14px;
  text-align: left;
  padding: 2px 1px;
  padding-left: 16px;
`;

const DELETEBOX = styled.div`
  margin: 20px 0px 0px 170px;
`;

const TrashImg = styled.img`
  width: 30px;
  height: 30px;
`;

export default SalesDetails;
