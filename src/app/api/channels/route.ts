import { type NextRequest, NextResponse } from 'next/server';

import { type ChannelType, MemberRole } from '@prisma/client';
import { log } from 'console';

import currentProfile from '@/lib/current-profile';
import { db } from '@/lib/database';

const POST = async (req: NextRequest) => {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(req.url);

    const serverId = searchParams.get('serverId');

    if (!serverId) {
      return new NextResponse('Missing serverId', { status: 400 });
    }

    const { name, type } = (await req.json()) as {
      name: string;
      type: ChannelType;
    };

    if (name === 'general') {
      return new NextResponse('Name cannot be "general"', { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR]
            }
          }
        }
      },
      data: {
        channels: {
          create: {
            profileId: profile.id,
            name,
            type
          }
        }
      }
    });

    return NextResponse.json(server, { status: 200 });
  } catch (err: unknown) {
    log('[CHANNELS_POST]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

export { POST };
