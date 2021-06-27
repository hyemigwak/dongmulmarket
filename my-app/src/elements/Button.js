import React from "react";
import styled from "styled-components";

// 버튼 컴포넌트
/**
 *
 * @param {*} props
 * - _onClick : 버튼 클릭 시 실행할 함수
 * - _is_float : 플로팅 버튼인지 아닌 지 여부 boolean
 * - children : 열림 태그와 닫힘 태그 사이에 들어가는 자식 노드 / ex) <>여기에 들어가는 게 자식 노드!</>
 * - margin : margin 값 (px 등 단위를 포함한 string)
 * - width : width 값 (px 등 단위를 포함한 string)
 * - padding : padding 값 (px 등 단위를 포함한 string)
 * @returns
 */
const Button = (props) => {
  const { _onClick, is_float, children, margin, width, padding } = props;

  //   is_float가 true면 플로팅 버튼을 반환합니다.
  // return 이후의 구문은 읽지 않으니, else는 굳이 쓰지 않아도 괜찮아요!
  if (is_float) {
    return (
      <React.Fragment>
        <FloatButton onClick={_onClick}>{children}</FloatButton>
      </React.Fragment>
    );
  }

  //   스타일드 컴포넌트에 보낼 내용만 따로 묶어주면 return에 들어갈 코드가 좀 더 깔끔해집니다!
  const styles = {
    margin: margin,
    width: width,
    padding: padding,
  };

  return (
    <React.Fragment>
      <ElButton {...styles} onClick={_onClick}>
        {children}
      </ElButton>
    </React.Fragment>
  );
};

// props가 넘어오지 않아도 화면이 잘 그려지도록 기본 값 넣어주기
Button.defaultProps = {
  children: null,
  _onClick: () => {},
  is_float: false,
  margin: false,
  width: "100%",
  padding: "12px 0px",
};

const ElButton = styled.button`
  width: ${(props) => props.width};
  background-color: #212121;
  color: #ffffff;
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  border: none;
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
`;

const FloatButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: #212121;
  color: #ffffff;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  bottom: 50px;
  right: 16px;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 50px;
`;

export default Button;
