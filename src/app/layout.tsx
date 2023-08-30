import type { FC, ReactNode } from 'react';

import type { Metadata } from 'next';

import { ClerkProvider } from '@clerk/nextjs';

import { openSans } from '@/lib/fonts';

import HotToastProvider from '@/components/providers/hot-toast';
import ModalProvider from '@/components/providers/modals';
import SocketProvider from '@/components/providers/socket';
import ThemeProvider from '@/components/providers/theme';

import './globals.scss';

export const metadata: Metadata = {
  title: {
    template: '%s | Discord',
    default: 'Discord | Your Place to Talk and Hang Out'
  },
  description:
    'Discord is the easiest way to talk over voice, video, and text. Talk, chat, hang out, and stay close with your friends and communities.',
  keywords: [
    'Next.js',
    'React',
    'TailwindCSS',
    'Server Components',
    'Clerk',
    'ShadcnUI',
    'TypeScript',
    'Prisma',
    'WebSockets'
  ]
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className={openSans.className}>
        <body className="bg-white dark:bg-[#313338]">
          <ThemeProvider
            themes={['light', 'dark']}
            attribute="class"
            enableSystem={false}
            defaultTheme="dark"
          >
            <HotToastProvider />

            <SocketProvider>
              <ModalProvider />

              {children}
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
