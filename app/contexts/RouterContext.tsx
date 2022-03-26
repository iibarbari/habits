import React, { createContext, useMemo } from 'react';

type TRouterContext = {
  page: TPage
  setPage: React.Dispatch<React.SetStateAction<TPage>>
}

export const RouterContext = createContext<TRouterContext>({
  page: 'landing',
  setPage: () => {},
});

export default function RouterProvider({ children }: {children: React.ReactNode}) {
  const [page, setPage] = React.useState<TPage>('landing');

  const value = useMemo(() => ({
    page,
    setPage,
  }), [page]);

  return (
    <RouterContext.Provider value={value}>
      {children}
    </RouterContext.Provider>
  );
}
