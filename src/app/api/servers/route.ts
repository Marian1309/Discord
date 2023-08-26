import { type NextRequest, NextResponse } from 'next/server';

import { nanoid } from 'nanoid';

import currentProfile from '@/lib/current-profile';
import { MemberRole, db } from '@/lib/database';

const POST = async (req: NextRequest) => {
  try {
    const { name, imageUrl } = await req.json();

    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: nanoid(13),
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
    console.log('[SERVERS_ERROR]', err);
  }
};

export { POST };
