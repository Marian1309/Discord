'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import type { MemberRole } from '@prisma/client';
import axios from 'axios';
import {
  Check,
  Gavel,
  Loader2,
  MoveVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion
} from 'lucide-react';
import qs from 'query-string';
import { toast } from 'react-hot-toast';

import type { ServerWithMembersWithProfiles } from '@/types';

import useModalStore from '@/stores/use-modal';

import UserAvatar from '@/components/common/user-avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 text-indigo-500" />,
  ADMIN: <ShieldAlert className="h-4 w-4 text-rose-500" />
};

const MembersModal = () => {
  const router = useRouter();
  const { type, isOpen, onClose, data, onOpen } = useModalStore();
  const [loadingId, setLoadingId] = useState('');

  const isModalOpen = isOpen && type === 'members';
  const { server } = data as { server: ServerWithMembersWithProfiles };

  const handleRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId);

      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server.id
        }
      });

      const response = await axios.patch(url, { role });

      router.refresh();
      onOpen('members', { server: response.data });
    } catch (err: unknown) {
      toast.error('An error occurred while changing role.');
    } finally {
      setLoadingId('');
    }
  };

  const handleMemberKick = async (memberId: string) => {
    try {
      setLoadingId(memberId);

      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server.id
        }
      });

      const response = await axios.delete(url);

      router.refresh();
      onOpen('members', { server: response.data });
    } catch (err: unknown) {
      toast.error('An error occurred while changing role.');
    } finally {
      setLoadingId('');
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Manage members
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="text-center text-zinc-500">
          {server?.members?.length}{' '}
          {server?.members?.length === 1 ? 'Member' : 'Members'}
        </DialogDescription>

        <ScrollArea className="mt-8 max-h-[420px] px-6">
          {server?.members?.map((member) => {
            const roleIcon = roleIconMap[member.role];

            return (
              <div key={member.id} className="mb-6 flex items-center gap-x-2">
                <UserAvatar src={member.profile.imageUrl} />
                <div className="flex flex-col gap-y-1">
                  <div className="flex items-center text-xs font-semibold">
                    {member.profile.name}
                    <span className="pl-1">{roleIcon}</span>
                  </div>

                  <p className="text-xs text-zinc-500">
                    {member.profile.email}
                  </p>
                </div>

                {server.profileId !== member.profileId &&
                  loadingId !== member.id && (
                    <div className="ml-auto">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoveVertical className="h-4 w-4 text-zinc-500" />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent side="left">
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                              <ShieldQuestion className="mr-2 h-4 w-4" />

                              <span>Role</span>
                            </DropdownMenuSubTrigger>

                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleRoleChange(member.id, 'GUEST')
                                  }
                                >
                                  <Shield className="mr-2 h-4 w-4" />
                                  Guest
                                  {member.role === 'GUEST' && (
                                    <Check className="ml-1 h-4 w-4" />
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleRoleChange(member.id, 'MODERATOR')
                                  }
                                >
                                  <ShieldCheck className="mr-2 h-4 w-4" />
                                  Moderator
                                  {member.role === 'MODERATOR' && (
                                    <Check className="ml-1 h-4 w-4" />
                                  )}
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            onClick={() => handleMemberKick(member.id)}
                            className="cursor-pointer text-rose-500"
                          >
                            <Gavel className="mr-2 h-4 w-4" />
                            Kick
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}

                {loadingId === member.id && (
                  <Loader2 className="ml-auto h-4 w-4 animate-spin text-zinc-500" />
                )}
              </div>
            );
          })}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MembersModal;
