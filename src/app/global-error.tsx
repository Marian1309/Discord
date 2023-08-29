'use client';

import type { FC } from 'react';

type Props = {
  error: Error;
  reset: () => void;
};

const GlobalError: FC<Props> = ({ error, reset }) => {
  return (
    <html lang="en">
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
};

export default GlobalError;
