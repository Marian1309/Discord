import { NextResponse } from 'next/server';

import { log } from 'console';

import type { FunctionWithServerIdInParams } from '@/types/api';

import currentProfile from '@/lib/current-profile';
import { db } from '@/lib/database';

const PATCH: FunctionWithServerIdInParams = async (req, { params }) => {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.serverId) {
      return new NextResponse('Missing serverId', { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: {
          not: profile.id
        },
        members: {
          some: {
            profileId: profile.id
          }
        }
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id
          }
        }
      }
    });

    return NextResponse.json(server, { status: 200 });
  } catch (err: unknown) {
    log('[SERVER_ID_LEAVE_PATCH]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

export { PATCH };
