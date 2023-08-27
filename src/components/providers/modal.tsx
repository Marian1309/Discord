'use client';

import { useEffect, useState } from 'react';

import CreateServerModal from '@/components/modals/create-server';
import EditServerModal from '@/components/modals/edit-server';
import InviteModal from '@/components/modals/invite';

const ModalProvider = () => {
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
    </>
  );
};

export default ModalProvider;
