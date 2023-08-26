import { redirect } from 'next/navigation';

import { db } from '@/lib/database';
import initialProfile from '@/lib/initial-profile';

const SetupPage = async () => {
  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return <p>Create a Server</p>;
};

export default SetupPage;
