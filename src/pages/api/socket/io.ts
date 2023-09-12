import type { NextApiRequest } from 'next';

import type { Server as NetServer } from 'http';
import { Server as SocketIO } from 'socket.io';

import type { NextApiResponseServerIo } from '@/types';

export const config = {
  api: {
    bodyParser: false
  }
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = '/api/socket/io';
    const httpServer: NetServer = res.socket.server as any;
    const io = new SocketIO(httpServer, {
      path,
      addTrailingSlash: false,
      cors: {
        origin: process.env.NEXT_PUBLIC_LIVEKIT_URL
      }
    });

    res.socket.server.io = io;
  }

  res.end();
};

export default ioHandler;
