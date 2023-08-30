import type { Member, Profile, Server } from '@prisma/client';

export type Modal =
  | 'createServer'
  | 'invite'
  | 'editServer'
  | 'members'
  | 'createChannel'
  | 'leaveServer'
  | 'deleteServer';

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};
