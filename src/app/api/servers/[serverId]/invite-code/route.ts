'use server';

import { NextResponse } from 'next/server';

import { nanoid } from 'nanoid';

import currentProfile from '@/lib/current-profile';
import { db } from '@/lib/database';

const PATCH = async (
  _: unknown,
  { params }: { params: { serverId: string } }
) => {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new Response('Unauthorized', { status: 401 });
    }

    if (!params.serverId) {
      return new Response('Missing server ID', { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id
      },
      data: {
        inviteCode: nanoid()
      }
    });

    return NextResponse.json(server, { status: 200 });
  } catch (err: unknown) {
    console.log('SERVER_ID', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

export { PATCH };
