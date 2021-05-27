# 동물마켓, 동네에서 즐기는 물물교환 플랫폼

## 💛프로젝트 요약

- [사이트 바로가기](https://dongmulmarket.com/)

- [YouTube 시연영상](https://youtu.be/_H-cVhny3BY)

- [72시간 합숙코딩 비하인드 영상](https://www.youtube.com/watch?v=-LWeflvLABY)

- 위치를 기반으로 **동네**에서 필요한 **물물교환**할 수 있는 웹사이트입니다. 

  기존의 지역거래 플랫폼을 모티브로, 현 플랫폼의 불편한 점과 아쉬운점을 개선했습니다.

  다대다 채팅을 이용해 게시글에서 바로 거래할 수 있어 불필요한 구매 과정을 최소화했습니다.

## 🧡팀 소개

- React, Node.js 기반

- 개발인원: 6명

   1) Front-end: 곽혜미, 이지은

   2) Back-end: 원동균, 이재윤

   3) Designer: 최혜진, 황나경

- 백엔드 github : https://github.com/WonDongGyun

- [팀 노션](https://www.notion.so/6d5c61254bf541c0bb5931de59a8d5ca)

## 💜프로젝트 설명

- 프로젝트명: 동물마켓(**동**네에서 물물교환으로 **마**음에 드는 물건을 **켓**하세요)

- 개발기간: 2021.04.23~ 2021.05.28

- 개발언어: JavaScript

- 개발 라이브러리: React.js

- 협업 툴: git / notion / figma / zeplin

- 프로젝트 취지: 기존 지역거래 플랫폼의 수많은 1:1 채팅을 다대다 실시간 채팅으로 줄여 거래 과정을 간소화하고, 돈이 없어도 물건을 구할 수 있는 색다른 커머스를 구현하고자 함

- 프로젝트 기능: 

    1) 사용자의 위치를 기반으로 위치 기반 등록된 거래 물품만 보여줌

    2) 마감 5시간 상품은 최상단에서 마감 뱃지로 알 수 있음

    3) 소켓 io를 통해, 게시글마다 실시간 채팅방에 다대다로 참여 가능

    4) 채팅창을 흐리는 블랙 컨슈머 강퇴 가능 및 교환을 원하는 유저와 교환 수립 기능

    5) 마이페이지에서 현 진행중인 거래, 완료 거래, 실패 거래를 확인할 수 있음

## 🤎기술 소개

1. **Geolocation을 이용한 실시간 사용자 위치 확인**

   - kakao map api에서 제공해주는 geolocation으로 현 위치를 좌표로 수집

   - 좌표를 주소로 변환 -> 서버에 주소값을 "구/시" 까지 전달 -> 유저 데이터 저장

   - 위치가 부정확하게 나올 때, 수기로 정확한 주소를 입력할 수 있도록 **daum-post-api** 사용

   - 우편번호 검색을 통한 주소 획득 -> 지번 주소 서버에 전달

   - 설정한 주소에 맞는 게시글만 확인 가능(메인화면)

     ![image-20210528001427781](C:\Users\Kwak\AppData\Roaming\Typora\typora-user-images\image-20210528001427781.png)![image-20210528001440296](C:\Users\Kwak\AppData\Roaming\Typora\typora-user-images\image-20210528001440296.png)![image-20210528005202681](C:\Users\Kwak\AppData\Roaming\Typora\typora-user-images\image-20210528005202681.png)

     

2. **Socket io 를 이용한 실시간 채팅**

   - socket.on / socket.emit으로 서버와 실시간 데이터 양방향 전송

   - 채팅방 참여, 실시간 참여 인원, 메세지 전송 및 받기, 강퇴, 교환 수립 등 소켓 event 생성

   - 실시간 유저 및 채팅방 참여 인원은 리덕스에서 관리

   - socket 연결을 custom hook으로  별도 관리하여 코드 및 렌더링 최적화

   - 로그인 여부/ 기 참여 여부/ 방장 여부로 동일 페이지 채팅창 view 분리

   - <img src="C:\Users\Kwak\AppData\Roaming\Typora\typora-user-images\image-20210528002114661.png" alt="image-20210528002114661" style="zoom: 33%;" /><img src="C:\Users\Kwak\AppData\Roaming\Typora\typora-user-images\image-20210528004932681.png" alt="image-20210528002012117" style="zoom: 33%;" />

     

     ![image-20210528005028819](C:\Users\Kwak\AppData\Roaming\Typora\typora-user-images\image-20210528005028819.png)![image-20210528002023217](C:\Users\Kwak\AppData\Roaming\Typora\typora-user-images\image-20210528002023217.png)

3. **소셜로그인, 이메일 인증**

   - 카카오/구글로그인 구현

   - 카카오 비즈앱 신청으로 email 필수동의 전환

   - 기본 로그인(JWT)

   - 이메일 인증 기능 구현 -> 이메일 인증번호 확인 후 불일치 시 안내 문구 띄움

     <img src="C:\Users\Kwak\AppData\Roaming\Typora\typora-user-images\image-20210528004655644.png" alt="image-20210528004655644" style="zoom: 50%;" />

4. **https 배포**

   - AWS S3 배포 후, cloudfront에서 인증서 발급 후 https 배포
