import type { FC, ReactNode } from 'react';

import type { Metadata } from 'next';

import { figtree } from '@/lib/fonts';

import HotToastProvider from '@/components/providers/hot-toast';
import ThemeProvider from '@/components/providers/theme';

import './globals.scss';

export const metadata: Metadata = {
  title: {
    template: '%s • Next 13',
    default: 'Next 13'
  },
  description: 'Nextjs 13 App Starter',
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
    'Prisma'
  ]
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning className={figtree.className}>
      <body className="container">
        <HotToastProvider />

        <ThemeProvider
          themes={['light', 'dark']}
          attribute="class"
          enableSystem
          defaultTheme="dark"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
