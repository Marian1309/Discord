'use client';

import { Plus } from 'lucide-react';

import useModalStore from '@/stores/use-modal';

import ActionTooltip from '../common/action-tooltip';

const NavigationAction = () => {
  const { onOpen } = useModalStore();

  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add a center">
        <button
          className="group flex items-center"
          onClick={() => onOpen('createServer')}
        >
          <div className="mx-3 h-[48px] w-[48px] overflow-hidden rounded-[24px] bg-background transition-all flex-center group-hover:rounded-[16px] group-hover:bg-emerald-500 dark:bg-neutral-700">
            <Plus
              size={25}
              className="text-emerald-500 transition group-hover:text-white"
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};

export default NavigationAction;
