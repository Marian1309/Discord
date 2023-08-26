import { type FC, type ReactNode } from 'react';

import { NavigationSidebar } from '@/components/common/navigation';

const RootLayout: FC<{ children: ReactNode }> = async ({ children }) => {
  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-30 hidden h-full w-[72px] flex-col md:flex">
        <NavigationSidebar />
      </div>

      <main className="h-full md:pl-[72px]">{children}</main>
    </div>
  );
};

export default RootLayout;
