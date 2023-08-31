import type { FC } from 'react';

import { cn } from '@/lib/utils';

import { Avatar, AvatarImage } from '../ui/avatar';

type Props = {
  src?: string;
  className?: string;
};

const UserAvatar: FC<Props> = ({ src, className }) => {
  return (
    <Avatar className={cn('h-7 w-8 md:h-10 md:w-10', className)}>
      <AvatarImage src={src} />
    </Avatar>
  );
};

export default UserAvatar;
