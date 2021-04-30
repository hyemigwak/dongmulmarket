import React from "react";
import styled from "styled-components";
import { Category, MiniCalendar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import Upload from "../shared/Upload";
import preview_img from "../image/preview_image.png";

const AddProduct = (props) => {
  const preview = useSelector((state) => state.image.preview);
  // const [preview, setPreview] = useState(preview_img);


  return (
    <React.Fragment>
      <AddProductWrap>
        <h1>물품 등록하기</h1>
        <ProductArea>
          <div>
            <Upload />
          </div>
          <div>
            <Img src={preview ? preview : "http://via.placeholder.com/400x300"} alt="대표이미지" />
          </div>
          <Input type="text" placeholder="물물교환 할 상품을 입력해주세요!" />
          <Category />
          <Input type="text" placeholder="희망 교환 물품을 입력해주세요" />
          <div>
            <Textarea type="text" placeholder="물품을 설명해주세요!" rows="5" />
          </div>
          <CalendarArea>
            <div>
              교환 종료일
              <Calend>
                <MiniCalendar />
              </Calend>
            </div>
          </CalendarArea>
        </ProductArea>
      </AddProductWrap>
    </React.Fragment>
  );
};

const AddProductWrap = styled.div`
  padding-top: 60px;
  display: flex;
  flex-direction: column;
`;

const ProductArea = styled.div`
  display: block;
`;

const Img = styled.img`
  width: 400px;
  height: 300px;
  margin: 1rem 0rem;
`;

const CalendarArea = styled.div`
  width: 300px;
  height: 180px;
  margin: 1rem 0rem 20rem 0rem;
`;

const Input = styled.input`
  width: 300px;
  height: 2.5rem;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.07);
  border: none;
  border-radius: 7px;
  margin: 1rem 0rem;
`;

const Textarea = styled.textarea`
  width: 300px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.07);
  border: none;
  resize: none;
  margin: 1rem 0rem;
`;

const Calend = styled.div`
  margin-top: 1rem;
`;

export default AddProduct;
