import { useContext } from 'react';

import { SocketContext } from '@/components/providers/socket';

const useSocket = () => {
  return useContext(SocketContext);
};

export default useSocket;
