'use client';

import type { FC } from 'react';
import { useState } from 'react';

import axios from 'axios';
import { Check, Copy, RefreshCw } from 'lucide-react';
import { toast } from 'react-hot-toast';

import useOrigin from '@/hooks/use-origin';

import useModalStore from '@/stores/use-modal';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const InviteModal: FC = () => {
  const { type, isOpen, onClose, data, onOpen } = useModalStore();
  const origin = useOrigin();
  const { server } = data;

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === 'invite';

  const inviteURL = `${origin}/invite/${server?.inviteCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteURL);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const handleOnNew = async () => {
    try {
      setIsLoading(true);

      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      );

      onOpen('invite', { server: response.data });
    } catch (err: unknown) {
      toast.error('An error occurred while generating a link.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Invite Friends
          </DialogTitle>
        </DialogHeader>

        <div className="p-6">
          <Label className="text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70">
            Server invite link
          </Label>

          <div className="mt-2 flex items-center gap-x-2">
            <Input
              className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
              value={inviteURL}
              disabled={isLoading}
            />

            <Button size="icon" onClick={handleCopy} disabled={isLoading}>
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>

          <Button
            variant="link"
            size="sm"
            className="mt-4 text-xs text-zinc-500"
            onClick={handleOnNew}
          >
            Generate a new link
            <RefreshCw className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
