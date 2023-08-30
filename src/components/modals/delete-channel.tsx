'use client';

import type { FC } from 'react';
import { useState } from 'react';

import { useRouter } from 'next/navigation';

import axios from 'axios';
import queryString from 'query-string';
import { toast } from 'react-hot-toast';

import useModalStore from '@/stores/use-modal';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

const DeleteChannelModal: FC = () => {
  const router = useRouter();
  const { isOpen, onClose, type, data } = useModalStore();

  const isModalOpen = isOpen && type === 'deleteChannel';
  const { server, channel } = data;

  const [isLoading, setIsLoading] = useState(false);

  const handleChannelDelete = async () => {
    try {
      setIsLoading(true);

      const url = queryString.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id
        }
      });

      await axios.delete(url);

      onClose();
      router.refresh();
      router.push(`/servers/${server?.id}`);
    } catch (err: unknown) {
      toast.error('An error occurred while deleting a server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Delete Channel
          </DialogTitle>

          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this? <br />
            <span className="font-semibold text-indigo-500">
              {channel?.name}
            </span>{' '}
            will be permanently deleted.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex w-full items-center justify-between">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              Cancel
            </Button>

            <Button
              disabled={isLoading}
              variant="primary"
              onClick={handleChannelDelete}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteChannelModal;
