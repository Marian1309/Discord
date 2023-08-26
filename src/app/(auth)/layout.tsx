import type { FC, ReactNode } from 'react';

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="h-mobile flex-center">{children}</div>;
};

export default AuthLayout;
