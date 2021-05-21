import React from "react";
import styled from "styled-components";


const Spinner = (props) => {
  return (
    <LoadMsg>정보를 처리하고 있는 중입니다</LoadMsg>
   
  )

}

const LoadMsg=styled.div`
margin: 269px 344px 24px;
font-size: 40px;
font-weight: bold;
line-height: 1.5;
text-align: center;
color: #676767;
`;
export default Spinner;

