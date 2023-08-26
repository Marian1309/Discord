import { redirect } from 'next/navigation';

import { UserButton } from '@clerk/nextjs';

import currentProfile from '@/lib/current-profile';
import { db } from '@/lib/database';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

import ThemeToggle from '../theme-toggle';

import NavigationAction from './action';
import NavigationItem from './item';

const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect('/');
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  return (
    <div className="flex h-full w-full flex-col items-center space-y-4 py-3 text-primary dark:bg-[#1e1f22]">
      <NavigationAction />

      <Separator className="mx-auto h-[2px] w-10 rounded-md bg-zinc-300 dark:bg-zinc-700" />

      <ScrollArea className="w-full flex-1">
        {servers.map(({ id, imageUrl, name }) => (
          <NavigationItem key={id} id={id} imageUrl={imageUrl} name={name} />
        ))}
      </ScrollArea>

      <div className="mt-auto flex flex-col items-center gap-y-4 pb-3">
        <ThemeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{ elements: { avatarBox: 'h-[48px] w-[48px]' } }}
        />
      </div>
    </div>
  );
};

export default NavigationSidebar;
