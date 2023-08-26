import type { Member, Profile, Server } from '@prisma/client';

export type Modal = 'createServer';

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};
