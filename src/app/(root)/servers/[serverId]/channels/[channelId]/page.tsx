import { redirect } from 'next/navigation';

import { redirectToSignIn } from '@clerk/nextjs';
import { ChannelType } from '@prisma/client';

import currentProfile from '@/lib/current-profile';
import { db } from '@/lib/database';

import ChatHeader from '@/components/chat/header';
import ChatInput from '@/components/chat/input';
import ChatMessages from '@/components/chat/messages';

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
    <div className="flex h-mobile flex-col bg-white dark:bg-[#313338]">
      <ChatHeader
        serverId={channel.serverId}
        name={channel.name}
        type="channel"
      />

      <ChatMessages
        member={member}
        name={channel.name}
        chatId={channel.id}
        type="channel"
        apiUrl="/api/messages"
        socketUrl="/api/socket/messages"
        socketQuery={{ channelId: channel.id, serverId: channel.serverId }}
        paramKey="channelId"
        paramValue={channel.id}
      />

      {channel.type === ChannelType.TEXT && (
        <ChatInput
          name={channel.name}
          type="channel"
          apiUrl="/api/socket/messages"
          query={{ channelId: channel.id, serverId: channel.serverId }}
        />
      )}
    </div>
  );
};

export default ChannelIdPage;
