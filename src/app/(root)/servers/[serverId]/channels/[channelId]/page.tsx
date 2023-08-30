import { redirect } from 'next/navigation';

import { redirectToSignIn } from '@clerk/nextjs';

import currentProfile from '@/lib/current-profile';
import { db } from '@/lib/database';

type Props = {
  params: {
    serverId: string;
    channelId: string;
  };
};

const ChannelIdPage = async ({ params }: Props) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId
    }
  });

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id
    }
  });

  if (!channel || !member) {
    redirect('/');
  }

  return (
    <div className="flex h-full flex-col bg-white dark:bg-[#313338]">
      {/* <ChatHeader /> */}
    </div>
  );
};

export default ChannelIdPage;
