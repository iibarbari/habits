import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useContext, useMemo } from 'react';
import {
  HabitsPage, LandingPage, LoginPage, SignUpPage,
} from '../components';
import { RouterContext } from '../contexts';

const Home: NextPage = () => {
  const { page } = useContext(RouterContext);

  const currentPage = useMemo<React.ReactNode>(() => {
    if (page === 'habits') {
      return <HabitsPage />;
    } if (page === 'login') {
      return <LoginPage />;
    } if (page === 'sign-up') {
      return <SignUpPage />;
    } if (page === 'landing') {
      return <LandingPage />;
    }

    return <p>Not found</p>;
  }, [page]);

  return (
    <div>
      <Head>
        <title>Habits</title>
        <meta content="Habit Tracker" name="description" />
        <link href="/assets/apple-touch-icon.png" rel="apple-touch-icon" sizes="152x152" />
        <link href="/assets/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
        <link href="/assets/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
        <link href="/assets/site.webmanifest" rel="manifest" />
        <link color="#5bbad5" href="/assets/safari-pinned-tab.svg" rel="mask-icon" />
        <meta content="#da532c" name="msapplication-TileColor" />
        <meta content="#ffffff" name="theme-color" />
      </Head>

      {currentPage}
    </div>
  );
};

export default Home;
