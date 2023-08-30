import { NextResponse } from 'next/server';

import { log } from 'console';

import currentProfile from '@/lib/current-profile';
import { db } from '@/lib/database';

import type { ServerIdFn } from './types';

const PATCH: ServerIdFn = async (req, { params }) => {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { name, imageUrl } = (await req.json()) as {
      name: string;
      imageUrl: string;
    };

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id
      },
      data: {
        name,
        imageUrl
      }
    });

    return NextResponse.json(server, { status: 200 });
  } catch (err: unknown) {
    log('[SERVER_ID_PATCH]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

const DELETE: ServerIdFn = async (req, { params }) => {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const server = await db.server.delete({
      where: {
        id: params.serverId,
        profileId: profile.id
      }
    });

    return NextResponse.json(server, { status: 200 });
  } catch (err: unknown) {
    log('[SERVER_ID_DELETE]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

export { PATCH, DELETE };
