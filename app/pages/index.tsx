import classNames from 'classnames';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Container } from 'reactstrap';
import { Header, WeeklyTable } from '../components';

const Home: NextPage = () => (
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

    <Header />

    <hr />

    <Container className={classNames('mt-5', 'mb-5')}>
      <WeeklyTable />
    </Container>
  </div>
);

export default Home;
