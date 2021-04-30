import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as mapActions } from "../redux/modules/map";
import { history } from "../redux/configureStore";

const { kakao } = window;

const MyLocation = (props) => {
  const dispatch = useDispatch();

  const [lati, setLati] = useState(0);
  const [longi, setLong] = useState(0);
  const [address, setAddress] = useState("");
  console.log(address);

  const locationCheck = () => {
    if (address.includes("관악구")) {
      window.alert("안녕하세요! 홍길동님 오이마켓에 오신걸 환영해요");
      history.push("/login");
    } else {
      window.alert("안녕하세요! 오이마켓은 관악구 주민만 이용 가능합니다😢");
      return;
    }
  };

  const locationIncorrect = () => {
    window.alert("리로드? or 걍 버튼 뺄까요?");
  };

  //내위치 좌표 가져오기
  function getLocation() {
    if (navigator.geolocation) {
      // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(
        function (position) {
          console.log(position.coords.latitude + " " + position.coords.longitude);
          setLati(position.coords.latitude);
          setLong(position.coords.longitude);
        },
        function (error) {
          console.error(error);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      alert("GPS를 지원하지 않습니다");
    }
  }
  getLocation();
  useEffect(() => {
    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(lati, longi), // 지도의 중심좌표
        level: 1, // 지도의 확대 레벨
      };

    // 지도를 생성합니다
    const map = new kakao.maps.Map(mapContainer, mapOption);

    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();

    // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
    searchAddrFromCoords(map.getCenter(), displayCenterInfo);

    // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, "idle", function () {
      searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    });

    function searchAddrFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }

    // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
    function displayCenterInfo(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        var infoDiv = document.getElementById("centerAddr");
        console.log(result);

        for (var i = 0; i < result.length; i++) {
          // 행정동의 region_type 값은 'H' 이므로
          if (result[i].region_type === "H") {
            infoDiv.innerHTML = result[i].address_name;
            console.log(infoDiv.innerHTML);
            setAddress(result[i].address_name);
            dispatch(mapActions.getAddress(infoDiv.innerHTML));
            break;
          }
        }
      }
    }
  }, [lati, longi]);

  return (
    <>
      <Container>
        <div className="map_wrap">
          <div id="map" style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}></div>
          <div className="hAddr">
            <h1>현재 위치는</h1>
            <span id="centerAddr"></span>
            <h2>가 맞나요?</h2>
            <button onClick={locationCheck}>맞아요!</button>
            <button onClick={locationIncorrect}>아니여</button>
          </div>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  margin: 10% auto;
  background-color: #eeeeee;
  width: 29rem;
  height: 30rem;
  border-radius: 12px;

  .hAddr {
    position: relative;
    top: 120px;
    left: 120px;
  }

  #centerAddr {
    font-size: 20px;
    font-weight: 600;
  }
`;

export default MyLocation;
