import type { NextApiRequest } from 'next';

import { log } from 'console';

import type { NextApiResponseServerIo } from '@/types';

import currentProfile from '@/lib/current-profile-pages';
import { db } from '@/lib/database';

const handler = async (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    const profile = await currentProfile(req);

    if (!profile) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { content, fileUrl } = req.body as {
      content: string;
      fileUrl: string;
    };
    const { serverId, channelId } = req.query as {
      serverId: string;
      channelId: string;
    };

    if (!serverId) {
      return res.status(400).json({ error: 'Server ID missing.' });
    }

    if (!channelId) {
      return res.status(400).json({ error: 'Channel ID missing.' });
    }

    if (!content) {
      return res.status(400).json({ error: 'Content missing.' });
    }

    const server = await db.server.findFirst({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id
          }
        }
      },
      include: {
        members: true
      }
    });

    if (!server) {
      return res.status(404).json({ error: 'Server not found.' });
    }

    const channel = await db.channel.findFirst({
      where: {
        id: channelId,
        serverId
      }
    });

    if (!channel) {
      return res.status(404).json({ error: 'Channel not found.' });
    }

    const findedMember = server.members.find(
      (member) => member.profileId === profile.id
    );

    if (!findedMember) {
      return res
        .status(400)
        .json({ error: 'You are already in this channel.' });
    }

    const message = await db.message.create({
      data: {
        content,
        fileUrl,
        channelId,
        memberId: findedMember.id
      },
      include: {
        member: {
          include: {
            profile: true
          }
        }
      }
    });

    const channelKey = `chat:${channelId}:messages`;

    res?.socket?.server?.io?.emit(channelKey, message);

    return res.status(200).json(message);
  } catch (err: unknown) {
    log('[MESSAGES_POST]', err);
    return res.status(500).json({ message: 'Internal Error' });
  }
};

export default handler;
