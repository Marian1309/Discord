import type { Member, Profile, Server } from '@prisma/client';

export type Modal =
  | 'createServer'
  | 'invite'
  | 'editServer'
  | 'members'
  | 'createChannel'
  | 'leaveServer'
  | 'deleteServer'
  | 'editChannel'
  | 'deleteChannel';

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};
