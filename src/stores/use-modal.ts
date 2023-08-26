import { create } from 'zustand';

import type { Modal } from '@/types';

type ModalStore = {
  type: Modal | null;
  isOpen: boolean;
  onOpen: (type: Modal) => void;
  onClose: () => void;
};

const useModalStore = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  onOpen: (type) => set({ type, isOpen: true }),
  onClose: () => set({ type: null, isOpen: false })
}));

export default useModalStore;
