import type { FC, ReactNode } from 'react';

import { NavigationSidebar } from '@/components/common/navigation';

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <div className="fixed inset-y-0 z-30 hidden h-full w-[72px] flex-col md:flex">
        <NavigationSidebar />
      </div>

      <main className="h-full md:pl-[72px]">{children}</main>
    </>
  );
};

export default RootLayout;
