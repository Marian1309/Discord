import type { FC } from 'react';

import { BounceLoader } from 'react-spinners';

const GlobalLoader: FC = () => {
  return (
    <div className="h-mobile flex-center">
      <BounceLoader color="#1e1f22" size={40} loading />
    </div>
  );
};

export default GlobalLoader;
