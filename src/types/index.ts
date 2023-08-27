import type { Member, Profile, Server } from '@prisma/client';

export type Modal = 'createServer' | 'invite' | 'editServer';

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};
