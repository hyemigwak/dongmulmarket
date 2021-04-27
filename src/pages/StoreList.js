import React from "react";
import styled from "styled-components";
import Map from "./Map";

const StoreList = () => {
  const food_list = ["짜장면", "김치찌개", "제육볶음", "햄버거", "피자", "부대찌개", "갈비탕", "치킨", "소고기", "샤브샤브"];
  const random_num = Math.floor(Math.random() * food_list.length);
  console.log(random_num);
  return (
    <React.Fragment>
      <WrapMyPage>
        <SelectMeunTitle>
          <h1>오늘의 점심 메뉴는 {food_list[random_num]} 어떠세요? </h1>
          <button>이전</button>
          <button>확인</button>
        </SelectMeunTitle>
        <Contents>
          <MapImg>
            <p>
              <Map />
            </p>
          </MapImg>
          <TableList>
            <table>
              <thead>
                <tr>
                  <th>상호명</th>
                  <th>전화번호</th>
                  <th>거리</th>
                  <th>주소</th>
                  <th>평점</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>뚱보집</td>
                  <td>02-0000-0000</td>
                  <td>200m</td>
                  <td>동작구 상도1동 </td>
                  <td>4.2점</td>
                </tr>
              </tbody>
            </table>
          </TableList>
        </Contents>
      </WrapMyPage>
    </React.Fragment>
  );
};

const WrapMyPage = styled.div`
  padding-top: 60px;
  width: 1020px;
  margin: auto;
`;

const SelectMeunTitle = styled.div`
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const Contents = styled.div`
  width: 1020px;
  margin: auto;
  display: flex;
`;

const MapImg = styled.div`
  height: 400px;
  width: 500px;
`;

const TableList = styled.div`
  height: 300px;
  width: 400px;
  background: #eee;
`;

export default StoreList;
