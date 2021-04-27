import React from 'react'
import styled from 'styled-components'

const Mypage = () => {
    return (
        <React.Fragment>
           <WrapMyPage>
             <SelectMeunTitle>
                 <h1>오늘의 점심 메뉴는 짜장면 입니다!</h1>
                 <button>이전</button>
                 <button>확인</button>
             </SelectMeunTitle>
             <Contents>
             <MapImg>
                <p>Map</p>
             </MapImg>
              <Table>
                  <p>상호명</p>
                  <p>전화번호</p>
                  <p>거리</p>
                  <p>주소</p>
                  <p>평점</p>
              </Table>
             </Contents>   
            </WrapMyPage>
        </React.Fragment>
    )
}

const WrapMyPage=styled.div`
padding-top: 60px; 
width:1020px;
margin:auto;
`;

const SelectMeunTitle=styled.div`
text-align:center;
align-items:center;
justify-contents:center;
display:flex;

`;

const Contents=styled.div`
width:1020px;
margin:auto;
display:flex;
`;

const MapImg=styled.div`
height:300px;
width:300px;
background:pink;
`;

const Table=styled.div`
height:300px;
width:300px;
background:#eee;
`;



export default Mypage
