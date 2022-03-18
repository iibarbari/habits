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
      <link href="/assets/favicon.ico" rel="shortcut icon" type="image/x-icon" />
      <link href="/assets/favicon.ico" rel="icon" type="image/x-icon" />
    </Head>

    <Header />

    <hr />

    <Container className={classNames('mt-5', 'mb-5')}>
      <WeeklyTable />
    </Container>
  </div>
);

export default Home;
