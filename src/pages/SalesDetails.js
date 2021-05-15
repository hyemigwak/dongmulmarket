import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import preview_img from "../image/preview_img.JPG";
import Post from "../components/Post";

const SalesDetails = (props) => {
  const dispatch = useDispatch();

  const { image, title, nickname, wantItem, address, itemId } = props;

  const postDelete = () => {
    if (window.confirm("현재 판매중인 상품을 삭제하시겠습니까?")) {
      dispatch(postActions.deletePostAPI(itemId));
      window.alert("삭제 완료되었습니다");
    } else {
      return;
    }
  };

  return (
    <React.Fragment>
      <SalesListC>
        <Box
        //   onClick={() => {
        //   history.push(`/detail/${_itemId}`);
        // }}
        >
          <ImgBox>
            <Img src={image} alt="상품이미지" />
          </ImgBox>
          <TextBox>
            <Address style={{ marginRight: "100px" }}>{address}</Address>
            <ProductTitle>{title}</ProductTitle>
            <Title>
              <span>희망교환템:</span> {wantItem}
            </Title>
          </TextBox>
          <DELETEBOX>
            <DeleteForeverIcon onClick={postDelete}></DeleteForeverIcon>
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
  margin-left: 118px;
`;

const Box = styled.div`
  width: 205px;
  height: 278px;
  flex-grow: 0;
  margin: 40px 31px 50px 16px;
  padding: 0 0 16px;
  border-radius: 8px;
  border: solid 1px #91be89;
  position: relative;
`;

const ProductBox = styled.div`
  width: 205px;
  height: 230px;
  flex-grow: 0;
  margin: 0 1px 0 0;
  padding: 180px 32px 16px 16px;
  border-radius: 8px;
  border: solid 1px #91be89;
`;

const ImgBox = styled.div`
  margin: auto;
  object-fit: contain;
  border-radius: 8px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  max-width: 100%;
  text-align: right;
  z-index: 1000;
  img {
    width: 202px;
    height: 160px;
    object-fit: cover;
  }
`;

const Img = styled.img`
  border-radius: 8px;
  z-index: 2;
`;

const Label = styled.div`
  width: 72px;
  height: 40px;
  flex-grow: 0;
  border-radius: 8px;
  padding: 11px 12px 10px 11px;
  background-color: #3fbe81;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #ffffff;

  display: block;
  position: absolute;
  top: 0px;
  left: 130.8px;

  z-index: 1;
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

// const SubTitleArea = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-left: 1rem;
//   span {
//     font-size: 16px;
//     font-weight: 600;
//   }
// `;

const TextBox = styled.div`
  position: relative;
  top: 14px;
  text-align: left;
  padding: 2px 1px;
  padding-left: 16px;
`;

const Address = styled.div`
  flex-grow: 0;
  margin: 0 69px 2px 0;
  font-family: Roboto;
  font-size: 10px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #737373;
`;

const Time = styled.div`
  height: 16px;
  flex-grow: 0;
  margin: 9px 85px 0 0;
  font-family: Roboto;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #0c6550;
`;

const DELETEBOX = styled.div`
  margin: 25px 0px 0px 170px;
`;

export default SalesDetails;
