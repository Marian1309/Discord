import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import currentProfile from '@/lib/current-profile';
import { db } from '@/lib/database';

const PATCH = async (
  req: NextRequest,
  { params }: { params: { serverId: string } }
) => {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = (await req.json()) as {
      name: string;
      imageUrl: string;
    };
    console.log({ body });
    const { name, imageUrl } = body;

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
    console.log('[SERVER_ID_PATCH]', err);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

export { PATCH };
