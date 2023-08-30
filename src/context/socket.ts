import { createContext } from 'react';

import type { SocketContextType } from '@/types';

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false
});

export default SocketContext;
