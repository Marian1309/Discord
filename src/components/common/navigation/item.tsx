'use client';

import type { FC } from 'react';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';

import ActionTooltip from '../action-tooltip';

type Props = {
  id: string;
  imageUrl: string;
  name: string;
};

const NavigationItem: FC<Props> = ({ id, imageUrl, name }) => {
  const router = useRouter();
  const params = useParams() as { serverId: string };

  const handleClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <div className="mb-3">
      <ActionTooltip side="right" align="center" label={name}>
        <button
          onClick={handleClick}
          className="group relative flex items-center"
        >
          <div
            className={cn(
              'absolute left-0 w-[4px] rounded-r-full bg-primary transition-all',
              params.serverId !== id && 'group-hover:h-[20px]',
              params.serverId === id ? 'h-[36px]' : 'h-[8px]'
            )}
          />

          <div
            className={cn(
              'group relative mx-3 flex h-[48px] w-[48px] overflow-hidden rounded-[24px] transition-all group-hover:rounded-[16px]',
              params.serverId === id &&
                'rounded-[16px] bg-primary/10 text-primary'
            )}
          >
            <Image fill alt="Channel" src={imageUrl} />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};

export default NavigationItem;
