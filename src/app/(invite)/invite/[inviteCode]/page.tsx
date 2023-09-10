import { redirect } from 'next/navigation';

import currentProfile from '@/lib/current-profile';
import { db } from '@/lib/database';

type Props = {
  params: {
    inviteCode: string;
  };
};

const InvideCodePage = async ({ params }: Props) => {
  const profile = await currentProfile();

  if (!profile) {
    redirect('/');
  }

  if (!params.inviteCode) {
    redirect('/');
  }

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  if (existingServer) {
    redirect(`/servers/${existingServer.id}`);
  }

  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode
    },
    data: {
      members: {
        create: [{ profileId: profile.id }]
      }
    }
  });

  if (server) {
    redirect(`/servers/${server.id}`);
  }

  return null;
};

export default InvideCodePage;
