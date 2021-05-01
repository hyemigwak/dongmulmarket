import React, { useState } from "react";
import io from "socket.io-client";

//사용할 도메인
const socket = io("http://localhost:3000/");

const chat = () => {
  const [userId, setUserId] = useState("amy");
  useEffect(() => {
    socket.emit("roomjoin", userId);
  }, []);

  const sendChat = (e) => {
    const str = "안녕하세요!";
    socket.emit("alert", str);
    socket.on("what", (message) => {
      alert(message);
    });
  };

  return (
    <div>
      <button onClick={sendChat}>알림창보내기</button>
    </div>
  );
};

export default chat;
