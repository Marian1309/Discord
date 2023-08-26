import type { FC, ReactNode } from 'react';

import type { Metadata } from 'next';

import { ClerkProvider } from '@clerk/nextjs';

import { openSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';

import HotToastProvider from '@/components/providers/hot-toast';
import ThemeProvider from '@/components/providers/theme';

import './globals.scss';

export const metadata: Metadata = {
  title: {
    template: '%s | Discord',
    default: 'Discord | Your Place to Talk and Hang Out'
  },
  description:
    'Discord is the easiest way to talk over voice, video, and text. Talk, chat, hang out, and stay close with your friends and communities.',
  authors: [{ name: 'Marian', url: 'https://github.com/Marian1309' }],
  creator: 'Marian Pidchashyi',
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
      <html
        lang="en"
        suppressHydrationWarning
        className={cn(openSans.className, 'container')}
      >
        <body className="bg-white dark:bg-[#313338]">
          <HotToastProvider />

          <ThemeProvider
            themes={['light', 'dark']}
            attribute="class"
            enableSystem={false}
            defaultTheme="dark"
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
