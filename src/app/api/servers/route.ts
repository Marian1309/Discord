import { type NextRequest, NextResponse } from 'next/server';

import { MemberRole } from '@prisma/client';
import { log } from 'console';
import { nanoid } from 'nanoid';

import currentProfile from '@/lib/current-profile';
import { db } from '@/lib/database';

const POST = async (req: NextRequest) => {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { name, imageUrl } = await req.json();

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: nanoid(),
        channels: {
          create: [{ name: 'general', profileId: profile.id }]
        },
        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }]
        }
      }
    });

    return NextResponse.json(server, { status: 200 });
  } catch (err: unknown) {
    log('[SERVERS_POST]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

export { POST };
