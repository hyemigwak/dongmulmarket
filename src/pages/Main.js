import React from "react";
import Map from "./Map";

const Main = () => {
  const food_list = ["짜장면", "김치찌개", "제육볶음", "햄버거", "피자", "부대찌개", "갈비탕"];
  const random_num = Math.floor(Math.random() * food_list.length);
  console.log(random_num);

  return (
    <div>
      오늘 점심 메뉴는 {food_list[random_num]} 입니다.
      <Map />
    </div>
  );
};

export default Main;
