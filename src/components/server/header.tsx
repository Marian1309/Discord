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

import type { Modal, ServerWithMembersWithProfiles } from '@/types';

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

  const handleOpenModal = (modelId: Modal) => {
    onOpen(modelId, { server });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="text-md h-12 w-full border-b-2 border-neutral-200 p-3 font-semibold transition flex-center hover:bg-zinc-700/10 dark:border-neutral-800 dark:hover:bg-zinc-700/50">
          {server.name}

          <ChevronDown className="ml-auto h-5 w-5" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 space-y-[2px] text-xs font-medium text-black dark:text-neutral-400">
        {isModerator && (
          <DropdownMenuItem
            className="cursor-pointer px-3 py-2 text-sm text-indigo-600 dark:text-indigo-400"
            onClick={() => handleOpenModal('invite')}
          >
            Invite People
            <UserPlus className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}

        {isAdmin && (
          <DropdownMenuItem
            className="cursor-pointer px-3 py-2 text-sm"
            onClick={() => handleOpenModal('editServer')}
          >
            Server Settings
            <Settings className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}

        {isAdmin && (
          <DropdownMenuItem
            className="cursor-pointer px-3 py-2 text-sm"
            onClick={() => handleOpenModal('members')}
          >
            Manage Members
            <Users className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}

        {isModerator && (
          <DropdownMenuItem
            className="cursor-pointer px-3 py-2 text-sm"
            onClick={() => handleOpenModal('createChannel')}
          >
            Create Channel
            <PlusCircle className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}

        {isModerator && <DropdownMenuSeparator />}

        {isAdmin && (
          <DropdownMenuItem
            className="cursor-pointer px-3 py-2 text-sm text-rose-500"
            onClick={() => handleOpenModal('deleteServer')}
          >
            Delete Channel
            <Trash className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}

        {!isAdmin && (
          <DropdownMenuItem
            className="cursor-pointer px-3 py-2 text-sm text-rose-500"
            onClick={() => handleOpenModal('leaveServer')}
          >
            Leave Server
            <Trash className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ServerHeader;