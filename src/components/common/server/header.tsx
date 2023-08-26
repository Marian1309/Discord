'use client';

import { type FC, useMemo } from 'react';

import { MemberRole } from '@prisma/client';
import {
  ChevronDown,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users
} from 'lucide-react';

import type { ServerWithMembersWithProfiles } from '@/types';

import useModalStore from '@/stores/use-modal';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

type Props = {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
};

const ServerHeader: FC<Props> = ({ server, role }) => {
  const { onOpen } = useModalStore();

  const isAdmin = useMemo(() => {
    return role === MemberRole.ADMIN;
  }, [role]);

  const isModerator = useMemo(() => {
    return isAdmin || role === MemberRole.MODERATOR;
  }, [isAdmin, role]);

  const handleClickInvite = () => {
    onOpen('invite', { server });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="text-md flex h-12 w-full border-b-2 border-neutral-200 p-3 font-semibold transition hover:bg-zinc-700/10 dark:border-neutral-800 dark:hover:bg-zinc-700/50">
          {server.name}

          <ChevronDown className="ml-auto h-5 w-5" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 space-y-[2px] text-xs font-medium text-black dark:text-neutral-400">
        {isModerator && (
          <DropdownMenuItem
            className="cursor-pointer px-3 py-2 text-sm text-indigo-600 dark:text-indigo-400"
            onClick={handleClickInvite}
          >
            Invite People
            <UserPlus className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}

        {isAdmin && (
          <DropdownMenuItem className="cursor-pointer px-3 py-2 text-sm">
            Server Settings
            <Settings className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}

        {isAdmin && (
          <DropdownMenuItem className="cursor-pointer px-3 py-2 text-sm">
            Manage Members
            <Users className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}

        {isModerator && (
          <DropdownMenuItem className="cursor-pointer px-3 py-2 text-sm">
            Create Channel
            <PlusCircle className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}

        {isModerator && <DropdownMenuSeparator />}

        {isAdmin && (
          <DropdownMenuItem className="cursor-pointer px-3 py-2 text-sm text-rose-500">
            Delete Channel
            <Trash className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}

        {!isAdmin && (
          <DropdownMenuItem className="cursor-pointer px-3 py-2 text-sm text-rose-500">
            Leave Server
            <Trash className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerHeader;
