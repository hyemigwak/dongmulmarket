import { useCallback } from "react";
import io from "socket.io-client";

const sockets = {};

const useSocket = (serverUrl, email, icrId) => {
  const disconnect = useCallback(() => {
    if (icrId && sockets[icrId]) {
      sockets[icrId].disconnect();
      delete sockets[icrId];
    }
  }, [icrId]);

  if (!icrId) {
    return [undefined, disconnect];
  }

  if (!sockets[icrId]) {
    sockets[icrId] = io.connect(serverUrl, {
      query: `email=${email}&icrId=${icrId}`,
    });
    console.info("create socket", icrId, sockets[icrId]);
  }

  return [sockets[icrId], disconnect];
};

export default useSocket;
