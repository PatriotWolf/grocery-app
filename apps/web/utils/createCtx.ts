import React from 'react';

export function createCtx<A extends object | null>() {
  const ctx = React.createContext<A | undefined>(undefined);

  const useCtx = () => {
    const c = React.useContext(ctx);
    if (c === undefined)
      throw new Error('useCtx must be inside a Provider with a value');
    return c;
  };

  return [useCtx, ctx] as const;
}
