import type { Metadata } from 'next';

import { db } from '@/lib/database';

// export const generateMetadata = async ({
//   params
// }: {
//   params: { serverId: string };
// }): Promise<Metadata> => {
//   const server = await db.server.findFirst({
//     where: {
//       id: params.serverId
//     }
//   });

//   return {
//     title: server?.name
//   };
// };

const ServerIdPage = async ({ params }: { params: { serverId: string } }) => {
  return <p className="p-4">{params.serverId}</p>;
};

export default ServerIdPage;
