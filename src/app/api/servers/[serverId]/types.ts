import type { NextRequest } from 'next/server';

export type ServerIdFn = (
  req: NextRequest,
  { params }: { params: { serverId: string } }
) => void;
