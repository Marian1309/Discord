import { useContext } from 'react';

import SocketContext from '@/context/socket';

const useSocket = () => {
  return useContext(SocketContext);
};

export default useSocket;
