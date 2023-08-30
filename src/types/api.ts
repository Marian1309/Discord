import type { NextRequest } from 'next/server';

export type FunctionWithServerIdInParams = (
  req: NextRequest,
  { params }: { params: { serverId: string } }
) => void;

export type FunctionWithMemberIdInParams = (
  req: NextRequest,
  { params }: { params: { memberId: string } }
) => void;

export type FunctionWithChannelIdInParams = (
  req: NextRequest,
  { params }: { params: { channelId: string } }
) => void;
