import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { config } from "../shared/config";

const useJoinChat = (icrId) => {
  const [chatJoinYn, setChatJoinYn] = useState(true);

  const handler = useCallback((e) => {
    setChatJoinYn(false);
  }, []);

  useEffect(() => {
    getChatYn();
  }, [icrId]);

  async function getChatYn() {
    try {
      const res = await axios.get(`${config.api}/postDetail/icrId/${icrId}`);
      if (res.data.buttonYn["groupJoinButton"] === false) {
        setChatJoinYn(false);
      }
    } catch (error) {
      console.log("isBossAPI에러", error);
    }
  }

  return { chatJoinYn, handler };
};

export default useJoinChat;
