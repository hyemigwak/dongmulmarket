import React from "react";
import styled from "styled-components";
import Select from "react-select";

const Category = (props) => {
  const options = [
    { value: "디지털/가전", label: "디지털/가전" },
    { value: "가구/인테리어", label: "가구/인테리어" },
    { value: "유아동/유아도서", label: "유아동/유아도서" },
    { value: "식품", label: "식품" },
    { value: "스포츠/레저", label: "스포츠/레저" },
    { value: "여성잡화", label: "여성잡화" },
    { value: "여성의류", label: "여성의류" },
    { value: "남성패션/잡화", label: "남성패션/잡화" },
    { value: "게임/취미", label: "게임/취미" },
    { value: "뷰티/미용", label: "뷰티/미용" },
    { value: "반려동물용품", label: "반려동물용품" },
    { value: "도서/티켓/음반", label: "도서/티켓/음반" },
    { value: "생활용품", label: "생활용품" },
    { value: "식물", label: "식물" },
    { value: "기타 중고물품", label: "기타 중고물품" },
  ];
  return (
    <SelectArea>
      <Select options={options} placeholder="카테고리 선택" />
    </SelectArea>
  );
};

const SelectArea = styled.div`
  width: 280px;
`;

export default Category;
