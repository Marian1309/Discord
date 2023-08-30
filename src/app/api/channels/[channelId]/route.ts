import { NextResponse } from 'next/server';

import type { ChannelType } from '@prisma/client';
import { MemberRole } from '@prisma/client';
import { log } from 'console';

import type { FunctionWithChannelIdInParams } from '@/types/api';

import currentProfile from '@/lib/current-profile';
import { db } from '@/lib/database';

const DELETE: FunctionWithChannelIdInParams = async (req, { params }) => {
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

    if (!params.channelId) {
      return new NextResponse('Missing channelId', { status: 400 });
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
          delete: {
            id: params.channelId,
            name: {
              not: 'general'
            }
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

const PATCH: FunctionWithChannelIdInParams = async (req, { params }) => {
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

    if (!params.channelId) {
      return new NextResponse('Missing channelId', { status: 400 });
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
          update: {
            where: {
              id: params.channelId,
              NOT: {
                name: 'general'
              }
            },
            data: {
              name,
              type
            }
          }
        }
      }
    });

    return NextResponse.json(server, { status: 200 });
  } catch (err: unknown) {
    log('[CHANNELS_PATCH]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

export { DELETE, PATCH };
