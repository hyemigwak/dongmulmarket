import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { MiniCalendar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import moment from "moment";
import { DatePicker, Space } from "antd";
import { history } from "../redux/configureStore";
import "antd/dist/antd.css";
import { getCookie } from "../shared/Cookie";
import { Container } from "../element";
import camera from "../image/camera.svg";
import preview_img from "../image/preview_img.JPG";
import downarrow from "../image/downarrow.png";

const AddProduct = (props) => {
  const dispatch = useDispatch();

  //로그인 여부로 분기하기
  const cookie = getCookie("user_login") ? true : false;
  const is_login = useSelector((state) => state.user.is_login);

  //input받아서 서버에 보내줄 값들
  const [preview, setPreview] = useState(preview_img);
  const [imgfile, setImgFile] = useState(null);
  const [category, setCategory] = useState("카테고리를 선택해주세요!");
  const [myItem, setMyItem] = useState("");
  const [wantItem, setWantItem] = useState("");
  const [content, setContent] = useState("");
  const [expireDate, setExpireDate] = useState("");
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
    console.log(typeof dateString);
    console.log();
  }
  function onOk(value) {
    console.log("onOk: ", value);
  }

  function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  //오늘 이전 날짜는 선택 못하게 함
  function disabledDate(current) {
    return current < moment().startOf("day");
  }
  //최소 1시간 이상은 판매할 수 있도록 이전 시간 +1 disabled 설정
  function disabledDateTime(current) {
    let mydate = Number(1) + Number(moment().format("HH"));
    let _mydate = String(mydate);
    return {
      disabledHours: () => range(0, 24).splice(0, _mydate),
    };
  }

  //물품 등록하기 버튼 누르면 디스패치
  const onSiteAddProduct = () => {
    //하나라도 공란일 경우 되돌리기
    if (imgfile === "" || category === "" || myItem === "" || wantItem === "" || content === "" || expireDate === "") {
      window.alert("모두 입력해주세요!");
      return;
    }
    dispatch(postActions.addPostAPI(imgfile, category, myItem, wantItem, content, expireDate));
    //라우터에서 detail 게시물로 가서 확인하게 하기
    history.replace("/");
  };

  return (
    <React.Fragment>
      <Container>
        <Title>물품 등록하기</Title>
        <AddProductWrap>
          <ProductArea>
            <Camerabox>
              <label htmlFor="inputFile">
                <img src={camera} alt="카메라" className="cameraIcon" />
              </label>
              <input id="inputFile" className="uploadImg" type="file" onChange={selectFile} />
            </Camerabox>
            <SubText>물품 사진 등록하기</SubText>
            <img className="productImg" src={preview} alt="이미지" />
            <InputArea>
              <SubText>교환상품 설정</SubText>
              <Input type="text" placeholder="물물교환 할 상품을 입력해주세요!" value={myItem} onChange={onChangeMyItem} maxLength="31" />
              {/* <ArrowDropDownIcon style={{ position: "relative", top: "67px", left: "220px", width: "35px", height: "35px" }} /> */}
              <CateArea>
                <select required size="1" value={category} onChange={onChangeCategory}>
                  <option className="placehd" hidden>
                    카테고리를 설정해주세요
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
              <Input type="text" placeholder="희망 교환 물품을 입력해주세요" value={wantItem} onChange={onChangeWantItem} maxLength="31" />
              <div>
                <Textarea type="text" placeholder="물품을 설명해주세요" rows="5" value={content} onChange={onChangeContent} />
              </div>
              <SubText>교환종료일</SubText>
              <CalendarArea>
                <Calend>
                  <Space direction="vertical" size={14}>
                    <DatePicker
                      className="datepicker"
                      showTime={{ format: "HH" }}
                      disabledDate={disabledDate}
                      disabledTime={disabledDateTime}
                      format="YYYY-MM-DD HH:00"
                      onChange={onChange}
                      onOk={onOk}
                      placeholder="달력에서 날짜를 선택해주세요"
                      suffixIcon={null}
                      showNow={false}
                      style={{
                        width: "536px",
                        height: "56px",
                        padding: "17.6px 14px 14px 23.9px",
                        borderRadius: "8px",
                        border: "solid 2px #d6d6d6",
                        cursor: "pointer",
                      }}
                    />
                  </Space>
                </Calend>
              </CalendarArea>
              <BtnArea>
                <Btn
                  tabIndex="0"
                  onClick={onSiteAddProduct}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      onSiteAddProduct();
                    }
                  }}
                >
                  물품 올리기
                </Btn>
              </BtnArea>
            </InputArea>
          </ProductArea>
        </AddProductWrap>
      </Container>
    </React.Fragment>
  );
};

const AddProductWrap = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;
`;

const Title = styled.div`
  margin: 160px 158px 40px 144px;
  font-size: 36px;
  font-weight: 600;
  /* text-align: center; */
`;

const ProductArea = styled.div`
  display: block;
  width: 536px;
  margin: -30px auto;

  .productImg {
    width: 536px;
    height: 400px;
    margin: 18px auto;
  }
`;

const Camerabox = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: #6fcea1;
  position: relative;
  top: 410px;
  left: 420px;
  z-index: 1;

  label {
    position: relative;
    width: 80px;
    height: 80px;
    border-radius: 10px;
    cursor: pointer;
  }

  .uploadImg {
    display: none;
  }

  .cameraIcon {
    z-index: 1000;
    position: relative;
    top: 19px;
  }
`;

const ImageBox = styled.div`
  /* display: none; */
  width: 536px;
  height: 400px;
  border-radius: 10px;
  border: solid 2px #d6d6d6;
  background-color: #efefef;
  margin: 18px auto 60px;

  div {
    font-size: 18px;
    line-height: 1.56;
    text-align: center;
    position: relative;
    top: 40%;
    color: #7d7d7d;
  }
`;

const InputArea = styled.div`
  width: 536px;
  margin: 0px auto;
`;

const SubText = styled.div`
  font-size: 18px;
  margin-bottom: 5px;
  line-height: 1.33;
  text-align: left;
  color: #1c1c1c;
`;

const Input = styled.input`
  width: 536px;
  height: 56px;
  margin: 16px auto 25.8px;
  padding: 17.6px 23px 14.4px 23.9px;
  border-radius: 8px;
  border: solid 2px #d6d6d6;
  ::placeholder {
    font-size: 18px;
    line-height: 1.33;
    text-align: left;
    color: #7d7d7d;
  }
  :hover {
    border: 2px solid #6fcea1;
  }
  :focus {
    border: 2px solid #6fcea1;
    outline: none;
  }
`;

const Textarea = styled.textarea`
  width: 536px;
  height: 99px;
  resize: none;
  margin: 16px auto 25.8px;
  padding: 17.6px 23px 14.4px 23.9px;
  border-radius: 8px;
  border: 2px solid #d6d6d6;
  ::placeholder {
    font-size: 18px;
    line-height: 1.33;
    text-align: left;
    color: #7d7d7d;
  }
  :hover {
    border: solid 2px #6fcea1;
  }
  :focus {
    border: solid 2px #6fcea1;
    outline: none;
  }
`;

const CateArea = styled.div`
  select {
    width: 536px;
    height: 56px;
    margin: 16px auto 25.8px;
    padding: 13px 266.1px 12px 23.9px;
    border-radius: 8px;
    border: 2px solid #d6d6d6;
    font-size: 18px;
    text-align: left;
    color: #7d7d7d;
    -webkit-appearance: none; /* 외형 감추기 */
    -moz-appearance: none;
    appearance: none;
    background: url(${downarrow}) no-repeat 95% 57%;

    :hover {
      border: 2px solid #6fcea1;
    }
    :focus {
      border: 2px solid #6fcea1;
      outline: none;
    }
  }
  .placehd {
    font-size: 18px;
    text-align: left;
    color: #7d7d7d;
    line-height: 1.33;
  }
`;

const Calend = styled.div`
  margin-top: 1rem;
  cursor: pointer;
  input {
    font-size: 18px;
    text-align: left;
    color: #7d7d7d;
    line-height: 1.33;
    cursor: pointer;
  }
  :hover {
    border: 2px solid #6fcea1;
  }
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
  margin-top: 52px;
  padding-bottom: 100px;
`;

const Btn = styled.div`
  width: 177px;
  height: 53px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: auto;
  border-radius: 8px;
  background-color: #d6d6d6;
  padding: 10px 30px;

  font-size: 24px;
  font-weight: 600;
  color: #ffffff;

  cursor: pointer;
  :hover {
    background-color: #6fcea1;
  }
`;

export default AddProduct;
