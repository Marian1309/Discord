'use client';

import type { FC } from 'react';

import { MemberRole } from '@prisma/client';
import type { ChannelType } from '@prisma/client';
import { Plus, Settings } from 'lucide-react';

import type { ServerWithMembersWithProfiles } from '@/types';

import useModalStore from '@/stores/use-modal';

import ActionTooltip from '../common/action-tooltip';

type Props = {
  label: string;
  role?: MemberRole;
  sectionType: 'channels' | 'members';
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfiles;
};

const ServerSection: FC<Props> = ({
  label,
  role,
  sectionType,
  channelType,
  server
}) => {
  const { onOpen } = useModalStore();

  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">
        {label}
      </p>

      {role !== MemberRole.GUEST && sectionType === 'channels' && (
        <ActionTooltip label="Create Channel" side="top">
          <button
            onClick={() => onOpen('createChannel', { channelType })}
            className="text-zinc-500 transition hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
          >
            <Plus className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}

      {role === MemberRole.ADMIN && sectionType === 'members' && (
        <ActionTooltip label="Manage Members" side="top">
          <button
            onClick={() => onOpen('members', { server })}
            className="text-zinc-500 transition hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
          >
            <Settings className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
};

export default ServerSection;
