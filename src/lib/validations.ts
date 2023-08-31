import { ChannelType } from '@prisma/client';
import * as z from 'zod';

export const initialSchema = z.object({
  name: z.string().min(1, { message: 'Server name is required.' }),
  imageUrl: z.string().min(1, { message: 'Server image is required.' })
});
export type InitialSchema = z.infer<typeof initialSchema>;

export const channelSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Channel name is required.'
    })
    .refine((name) => name !== 'general', {
      message: "Channel name cannot be 'general'"
    }),
  type: z.nativeEnum(ChannelType)
});
export type ChannelSchema = z.infer<typeof channelSchema>;

export const chatInputSchema = z.object({
  content: z.string().min(1)
});
export type ChatInputSchema = z.infer<typeof chatInputSchema>;

export const chatFileSchema = z.object({
  fileUrl: z.string().min(1, { message: 'Attachment is requird.' })
});
export type ChatFileSchema = z.infer<typeof chatFileSchema>;
