import 'bootswatch/dist/lux/bootstrap.min.css';
import type { AppProps } from 'next/app';
import { HabitProvider } from '../contexts';
import 'bootstrap-icons/font/bootstrap-icons.css';

function MyApp({
  Component,
  pageProps,
}: AppProps) {
  return (
    <HabitProvider>
      <Component {...pageProps} />
    </HabitProvider>
  );
}

export default MyApp;
