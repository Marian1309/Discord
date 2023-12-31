import { NextResponse } from 'next/server';

import type { MemberRole } from '@prisma/client';
import { log } from 'console';

import type { FunctionWithMemberIdInParams } from '@/types/api';

import currentProfile from '@/lib/current-profile';
import { db } from '@/lib/database';

const PATCH: FunctionWithMemberIdInParams = async (req, { params }) => {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const { role } = (await req.json()) as { role: MemberRole };

    const serverId = searchParams.get('serverId');

    if (!serverId) {
      return new NextResponse('Server ID missing', { status: 400 });
    }

    if (!params.memberId) {
      return new NextResponse('Member ID missing', { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id
      },
      data: {
        members: {
          update: {
            where: {
              id: params.memberId,
              profileId: {
                not: profile.id
              }
            },
            data: {
              role
            }
          }
        }
      },
      include: {
        members: {
          include: {
            profile: true
          },
          orderBy: {
            role: 'asc'
          }
        }
      }
    });

    return NextResponse.json(server, { status: 200 });
  } catch (err: unknown) {
    log('[MEMBER_ID_PATCH]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

const DELETE: FunctionWithMemberIdInParams = async (req, { params }) => {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(req.url);

    const serverId = searchParams.get('serverId');

    if (!serverId) {
      return new NextResponse('Server ID missing', { status: 400 });
    }

    if (!params.memberId) {
      return new NextResponse('Member ID missing', { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id
      },
      data: {
        members: {
          deleteMany: {
            id: params.memberId,
            profileId: {
              not: profile.id
            }
          }
        }
      },
      include: {
        members: {
          include: {
            profile: true
          },
          orderBy: {
            role: 'asc'
          }
        }
      }
    });

    return NextResponse.json(server, { status: 200 });
  } catch (err: unknown) {
    log('[MEMBER_ID_DELETE]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

export { PATCH, DELETE };
