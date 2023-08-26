import type { Server } from '@prisma/client';
import { create } from 'zustand';

import type { Modal } from '@/types';

type ModalStore = {
  type: Modal | null;
  data: {
    server?: Server;
  };
  isOpen: boolean;
  onOpen: (type: Modal, data?: { server?: Server }) => void;
  onClose: () => void;
};

const useModalStore = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ type, isOpen: true, data }),
  onClose: () => set({ type: null, isOpen: false })
}));

export default useModalStore;
