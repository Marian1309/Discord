import type { Channel, ChannelType, Server } from '@prisma/client';
import { create } from 'zustand';

import type { Modal } from '@/types';

type ModalData = {
  server?: Server;
  channel?: Channel;
  channelType?: ChannelType;
};

type ModalStore = {
  type: Modal | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: Modal, data?: ModalData) => void;
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
