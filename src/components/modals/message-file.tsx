'use client';

import type { FC } from 'react';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import queryString from 'query-string';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import type { ChatFileSchema } from '@/lib/validations';
import { chatFileSchema } from '@/lib/validations';

import useModalStore from '@/stores/use-modal';

import FileUpload from '@/components/forms/file-upload';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

const MessageFileModal: FC = () => {
  const router = useRouter();
  const { isOpen, onClose, type, data } = useModalStore();
  const form = useForm<ChatFileSchema>({
    defaultValues: {
      fileUrl: ''
    },
    resolver: zodResolver(chatFileSchema)
  });

  const { isLoading } = form.formState;
  const isModalOpen = isOpen && type === 'messageFile';
  const { apiUrl, query } = data;

  const onSubmit = async (values: ChatFileSchema) => {
    try {
      const url = queryString.stringifyUrl({
        url: apiUrl || '',
        query
      });

      await axios.post(url, { ...values, content: values.fileUrl });

      form.reset();
      router.refresh();
      handleClose();
    } catch (err: unknown) {
      toast.error('An error occurred while creating a message.');
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Add an attachment
          </DialogTitle>

          <DialogDescription className="text-center text-zinc-500">
            Send a file as a message
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="fileUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint="messageFile"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button variant="primary" disabled={isLoading}>
                Send
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MessageFileModal;
