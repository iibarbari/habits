import React, { createContext, useMemo } from 'react';

type TPage = 'sign-up' | 'login' | 'habits'

type TRouterContext = {
  page: TPage
  setPage: React.Dispatch<React.SetStateAction<TPage>>
}

export const RouterContext = createContext<TRouterContext>({
  page: 'sign-up',
  setPage: () => {},
});

export default function RouterProvider({ children }: {children: React.ReactNode}) {
  const [page, setPage] = React.useState<TPage>('sign-up');

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
