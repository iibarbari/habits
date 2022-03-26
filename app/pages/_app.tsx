import 'bootswatch/dist/lux/bootstrap.min.css';
import type { AppProps } from 'next/app';
import { HabitProvider, RouterProvider, UserProvider } from '../contexts';

function MyApp({
  Component,
  pageProps,
}: AppProps) {
  return (
    <RouterProvider>
      <UserProvider>
        <HabitProvider>
          <Component {...pageProps} />
        </HabitProvider>
      </UserProvider>
    </RouterProvider>
  );
}

export default MyApp;
