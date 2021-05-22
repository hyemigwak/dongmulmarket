import React, { useEffect, useState, memo,useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as chatActions } from "../redux/modules/chat";
import { getCookie } from "../shared/Cookie";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import user from "../image/user.png";
import { useMediaQuery } from "react-responsive";


const ChatUsers = memo((props) => {

  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  const dispatch = useDispatch();
  const token = getCookie("user_login");
  const userList = useSelector((state) => state.chat.user_list);
  console.log(userList);
  const email = getCookie("email");
  // const icrId = userList.icrId;
  const itemId = props.itemId;

  // const socket = io.connect("http://15.165.76.76:3001/chatting", { query: `email=${email}&icrId=${icrId}` });

  // useEffect(() => {
  //   socket.connect();

  //   //athenticate 인증하고, 강퇴 사용자 받아오기
  //   socket.emit(
  //     "authenticate",
  //     {
  //       token: token,
  //     },
  //     (data) => {
  //       if (data["msg"] === "success") {
  //         console.log("msg가 성공이라면 if문");
  //         const data = {
  //           email: email,
  //           itemId: itemId,
  //           icrId: icrId,
  //         };
  //         //버튼 누르면 누가 나갔는지 서버에 보내준다
  //         socket.emit("kickUser", data);
  //         //서버에서 내려준 참여자 목록을 저장해서 화면에 보여준다
  //         socket.on("kickUser", (kickData) => {
  //           console.log("강퇴된 사용자는 누구?", kickData);
  //           dispatch(chatActions.removeUserList(kickData));
  //         });
  //       }
  //     }
  //   );
  //   //이전 대화 히스토리 받아오기
  //   // socket.on("setRoom", (data) => {
  //   //   console.log("셋룸데이터", data);
  //   //   dispatch(chatActions.getAllChatList(data));
  //   // });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  // 방장은 방장 뱃지를 보여줄 것

  //유저 강퇴하는 기능
  const kickUser = () => {};
  
    //모바일 유저창 열고 닫기
    const [userOpen, setuserOpen] = useState(false);
    const open = () => {
      if(userOpen){
        setuserOpen(false);
      }else{
        setuserOpen(true);
      }
      
    }
    const close = () => setuserOpen(false);
    console.log(userOpen);
    const userListsBox = useRef();

    const handleClickOutside = ({ target }) => {
      if (userOpen) setuserOpen(false);
    };
    
    // useEffect(() => {
    //   window.addEventListener("click", handleClickOutside);
    //   return () => {
    //     window.removeEventListener("click", handleClickOutside);
    //   };
    // }, []);


  return (
    <Wrapping>
    
      <ImgBox onClick={open} src={user}></ImgBox>
     
     
      {userOpen ?  
          <>
          <LiveChatBox isBoss>     
          {userList?.map((user, idx) => {
            return (
              <OneChatUser open={userOpen} close={close} ref={userListsBox}  key={idx}>
                <LiveUser>{user.nickname}</LiveUser>
                <CheckCircleOutlineIcon onClick={kickUser} style={{ color: "green", marginRight: "10px", width: "20px", cursor: "pointer" }}/>
                <HighlightOffIcon onClick={kickUser} style={{ color: "gray", width: "20px", cursor: "pointer" }} />
              </OneChatUser>
            );
          })}
        </LiveChatBox> 
        </>
        : 
       null
       }
   

    </Wrapping>
  );

});

const Wrapping=styled.div`

`;

const ImgBox=styled.img`

position:relative;
bottom:30px;
right:30px;
@media (max-width: 767px) {
position:absolute;
cursor:pointer;
top:550px;
left:220px;  
}

@media (min-width: 768px) and (max-width: 1190px) {
   
  position: relative;
  left:515px;
  top:340px;
  
}

`;

const LiveChatBox = styled.div`
  width: 175px;
  height: 522px;
  flex-grow: 0;
  margin-top: 0px;
  ${(props) => (props.isBoss ? "background-color:#3fbe81" : "background-color: #d9d9d9")}
  
  display: block;
  position:relative;
  bottom:20px;
  @media (max-width: 767px) {
    position: absolute;
    left:95px;
    top:580px;

   
    
     }
  @media (min-width: 768px) and (max-width: 1190px) {
   
    position: absolute;
    left:545px;
    top:370px;
    
  }
`;

const OneChatUser = styled.div`
  width: 150px;
  height: 47.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom:2px solid  #ffffff;;
  border-radius:20px;
  background-color: #52c41a;
`;

const LiveUser = styled.div`
  flex-grow: 0;
  margin: 0px 20px 0px 6px;
  font-size: 16px;
  line-height: 1.71;
  color: #ffffff;
`;


const EntranceMsg = styled.div`
  width: 270px;
  height: 24px;
  flex-grow: 0;
  margin: 14px auto;
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: center;
  color: #7d7d7d;
`;

export default ChatUsers;
