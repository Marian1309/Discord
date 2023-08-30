'use client';

import type { FC } from 'react';
import { useEffect, useState } from 'react';

import CreateChannelModal from '@/components/modals/create-channel';
import CreateServerModal from '@/components/modals/create-server';
import DeleteChannelModal from '@/components/modals/delete-channel';
import DeleteServerModal from '@/components/modals/delete-server';
import EditChannelModal from '@/components/modals/edit-channel';
import EditServerModal from '@/components/modals/edit-server';
import InviteModal from '@/components/modals/invite';
import LeaveServerModal from '@/components/modals/leave-server';
import MembersModal from '@/components/modals/members';

const ModalProvider: FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => setIsMounted(false);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
    </>
  );
};

export default ModalProvider;
