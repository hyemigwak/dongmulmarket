import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { MiniCalendar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import preview_img from "../image/preview_image.png";
import moment from "moment";
import { DatePicker, Space } from "antd";
import { history } from "../redux/configureStore";
import "antd/dist/antd.css";

import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const AddProduct = (props) => {
  const dispatch = useDispatch();

  //input받아서 서버에 보내줄 값들
  const [preview, setPreview] = useState(preview_img);
  const [imgfile, setImgFile] = useState(null);
  const [category, setCategory] = useState("카테고리를 선택해주세요!");
  const [myItem, setMyItem] = useState("");
  const [wantItem, setWantItem] = useState("");
  const [content, setContent] = useState("");
  const [expireDate, setExpireDate] = useState("");
  console.log(typeof expireDate);
  const createdAt = moment().format("YYYY-MM-DD hh:mm:ss");

  const onChangeCategory = useCallback((e) => setCategory(e.target.value), []);
  const onChangeMyItem = useCallback((e) => setMyItem(e.target.value), []);
  const onChangeWantItem = useCallback((e) => setWantItem(e.target.value), []);
  const onChangeContent = useCallback((e) => setContent(e.target.value), []);

  //파일리더로 파일 읽어오기
  const selectFile = (e) => {
    //file state에 현재 선택된 파일정보 저장
    setImgFile(e.target.files[0]);
    if (!e.target.files[0]) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setPreview(reader.result);
    };
  };
  //datepicker 달력 함수
  function onChange(value, dateString) {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
    setExpireDate(dateString);
  }
  function onOk(value) {
    console.log("onOk: ", value);
  }
  //물품 등록하기 버튼 누르면 디스패치
  const onSiteAddProduct = () => {
    dispatch(postActions.addPostAPI(imgfile, category, myItem, wantItem, content, expireDate, createdAt));
    window.alert("등록 완료입니다!");
    //라우터에서 detail 게시물로 가서 확인하게 하기
    history.replace('/detail');
  };

  return (
    <React.Fragment>
      <Title>물품 등록하기</Title>
      <AddProductWrap>
        <ProductArea>
          <div>
            <input startIcon={<CloudUploadIcon />} type="file" onChange={selectFile} />
          </div>
          <div>
            <Img src={preview} alt="대표이미지" />
          </div>
          <Input type="text" placeholder="물물교환 할 상품을 입력해주세요!" value={myItem} onChange={onChangeMyItem} />
          <CateArea>
            <select size="1" value={category} onChange={onChangeCategory}>
              <option value="카테고리를 선택해주세요" selected>
                카테고리를 선택해주세요
              </option>
              <option value="디지털/가전">디지털/가전</option>
              <option value="가구/인테리어">가구/인테리어</option>
              <option value="유아동/유아도서">유아동/유아도서</option>
              <option value="식품">식품</option>
              <option value="스포츠/레저">스포츠/레저</option>
              <option value="여성잡화">여성잡화</option>
              <option value="여성의류">여성의류</option>
              <option value="남성패션/잡화">남성패션/잡화</option>
              <option value="게임/취미">게임/취미</option>
              <option value="뷰티/미용">뷰티/미용</option>
              <option value="반려동물용품">반려동물용품</option>
              <option value="도서/티켓/음반">도서/티켓/음반</option>
              <option value="생활용품">생활용품</option>
              <option value="식물">식물</option>
              <option value="기타 중고물품">기타 중고물품</option>
            </select>
          </CateArea>
          <Input type="text" placeholder="희망 교환 물품을 입력해주세요" value={wantItem} onChange={onChangeWantItem} />
          <div>
            <Textarea type="text" placeholder="물품을 설명해주세요!" rows="5" value={content} onChange={onChangeContent} />
          </div>
          <CalendarArea>
            <span>교환 종료일</span>
            <Calend>
              <Space direction="vertical" size={12}>
                <DatePicker showTime={{ format: "HH:mm" }} onChange={onChange} onOk={onOk} />
              </Space>
            </Calend>
          </CalendarArea>
          <BtnArea>
            <Btn onClick={onSiteAddProduct}>물품 올리기</Btn>
          </BtnArea>
        </ProductArea>
      </AddProductWrap>
    </React.Fragment>
  );
};

const AddProductWrap = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;
`;

const Title = styled.div`
  padding-top: 100px;
  width: 100%;
  margin: 10px;
  font-size: 30px;
  font-weight: 600;
  text-align: center;
`;

const ProductArea = styled.div`
  display: block;
`;

const Img = styled.img`
  width: 300px;
  height: 300px;
  margin: 1rem 0rem;
`;

const Input = styled.input`
  width: 400px;
  height: 2.5rem;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.07);
  border: none;
  border-radius: 7px;
  margin: 1rem 0rem;
`;

const Textarea = styled.textarea`
  width: 400px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.07);
  border: none;
  resize: none;
  margin: 1rem 0rem;
`;

const Calend = styled.div`
  margin-top: 1rem;
`;
const CalendarArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    margin-right: 1rem;
    position: relative;
    left: -30px;
  }
`;

const BtnArea = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  padding-bottom: 80px;
`;

const Btn = styled.button`
  width: 120px;
  height: 40px;
  padding: 8px;
  border-radius: 16px;
  background: #ffc149;
  border: none;
  color: #212121;
  font-weight: 600;
  margin: 1rem 1rem 0rem 0rem;
  cursor: pointer;
`;

const CateArea = styled.div`
  select {
    width: 400px;
    height: 2.5rem;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.07);
    border: none;
    border-radius: 7px;
  }
`;

export default AddProduct;
