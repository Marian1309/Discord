'use client';

import { type FC, useRef } from 'react';

import { useRouter } from 'next/navigation';

import axios from 'axios';
import { Plus, SendHorizonal } from 'lucide-react';
import queryString from 'query-string';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import type { ChatInputSchema } from '@/lib/validations';

import useModalStore from '@/stores/use-modal';

import EmojiPicker from '@/components/common/emoji-picker';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type Props = {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: 'conversation' | 'channel';
};

const ChatInput: FC<Props> = ({ apiUrl, query, name, type }) => {
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { onOpen } = useModalStore();
  const form = useForm<ChatInputSchema>({
    defaultValues: {
      content: ''
    }
  });

  const { isLoading } = form.formState;

  ref.current?.focus();

  const onSubmit = async (values: ChatInputSchema) => {
    if (values.content.length === 0) {
      toast.error('Please type something.');
      return ref.current?.focus();
    }

    try {
      const url = queryString.stringifyUrl({
        url: apiUrl,
        query
      });

      await axios.post(url, values);

      form.reset();
      router.refresh();
    } catch (err: unknown) {
      toast.error('An error occurred while creating a message.');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <button
                    type="button"
                    onClick={() => onOpen('messageFile', { apiUrl, query })}
                    className="absolute left-8 top-7 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-zinc-500 p-1 transition hover:bg-zinc-600 dark:bg-zinc-400 dark:hover:bg-zinc-300"
                  >
                    <Plus className="text-white dark:text-[#313338]" />
                  </button>

                  <Input
                    disabled={isLoading}
                    className="border-0 border-none bg-zinc-200/90 px-14 py-6 text-zinc-600 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-zinc-700/75 dark:text-zinc-200"
                    placeholder={`Message ${
                      type === 'conversation' ? name : `#${name}`
                    }`}
                    {...field}
                    ref={ref}
                  />
                  <div className="absolute right-8 top-7 flex gap-x-3">
                    <EmojiPicker
                      onChange={(emoji: string) =>
                        field.onChange(`${field.value} ${emoji}`)
                      }
                    />

                    <button type="submit">
                      <SendHorizonal className="cursor-pointer" />
                    </button>
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ChatInput;
