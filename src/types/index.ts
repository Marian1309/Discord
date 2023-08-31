import type { NextApiResponse } from 'next';

import type { Member, Profile, Server } from '@prisma/client';
import type { Server as NetServer, Socket } from 'net';
import type { Server as SocketIOServer } from 'socket.io';

export type Modal =
  | 'createServer'
  | 'invite'
  | 'editServer'
  | 'members'
  | 'createChannel'
  | 'leaveServer'
  | 'deleteServer'
  | 'editChannel'
  | 'deleteChannel'
  | 'messageFile'
  | 'deleteChannel';

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
};
