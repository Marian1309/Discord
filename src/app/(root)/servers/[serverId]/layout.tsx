import type { ReactNode } from 'react';

import { redirect } from 'next/navigation';

import { redirectToSignIn } from '@clerk/nextjs';

import currentProfile from '@/lib/current-profile';
import { db } from '@/lib/database';

import { ServerSidebar } from '@/components/server';

type Props = {
  children: ReactNode;
  params: {
    serverId: string;
  };
};

const ServerIdLayout = async ({ children, params }: Props) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  if (!server) {
    redirect('/');
  }

  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-20 hidden h-full w-60 flex-col md:flex">
        <ServerSidebar serverId={params.serverId} />
      </div>

      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default ServerIdLayout;
