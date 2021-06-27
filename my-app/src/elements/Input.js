import React from "react";
import styled from "styled-components";

import { Text, Grid } from "./index";

// 인풋 컴포넌트
/**
 * 
 * @param {*} props 
 * - label 인풋 박스 위에 넣어줄 텍스트 
 * - placeholder 인풋 박스에 미리 넣어줄 텍스트
 * - _onChange 인풋에 들어갈 값(text, file 등)이 변경되면 실행할 함수
 * - type 인풋 박스의 타입 (file, text 등)
 * - multiline 여러 줄(엔터 포함)을 보여줄 지 말지 여부 (input과 textarea로 분기할거예요.)
 * - value 인풋 박스의 값
 * - is_submit 엔터키 이벤트를 줄지 말지 여부 boolean
 * - onSubmit 엔터키 이벤트에서 실행할 함수(onKeyPress 이벤트를 사용해요!)
 * @returns 
 */
const Input = (props) => {
  const {
    label,
    placeholder,
    _onChange,
    type,
    multiLine,
    value,
    is_submit,
    onSubmit,
  } = props;

  if (multiLine) {
    return (
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        <ElTextarea
          rows={10}
          value={value}
          placeholder={placeholder}
          onChange={_onChange}
        ></ElTextarea>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        {is_submit ? (
          <ElInput
            type={type}
            placeholder={placeholder}
            onChange={_onChange}
            value={value}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onSubmit(e);
              }
            }}
          />
        ) : (
          <ElInput type={type} placeholder={placeholder} onChange={_onChange} />
        )}
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
  multiLine: false,
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  value: "",
  is_submit: false,
  onSubmit: () => {},
  _onChange: () => {},
};

const ElTextarea = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

const ElInput = styled.input`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

export default Input;
