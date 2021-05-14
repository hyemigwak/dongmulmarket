//판매내역 리스트

import React from "react";
import styled from "styled-components";

import Post from "../components/Post";
const SalesDetails = (props) => {
  const salesList = props.salesList;

  return (
    <React.Fragment>
        <SalesListC>
            {salesList?.map((post, idx) => (
            <Post {...post} key={idx} />
            ))}
        </SalesListC>  
    </React.Fragment>
  );
};

const SalesListC = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-left:118px;
 
`;
export default SalesDetails;
