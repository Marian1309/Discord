'use client';

import type { FC } from 'react';

import { BounceLoader } from 'react-spinners';

const GlobalLoader: FC = () => {
  return (
    <div className="h-mobile flex-center">
      <BounceLoader color="#641ae6" size={40} loading />
    </div>
  );
};

export default GlobalLoader;
