import classNames from 'classnames';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Container } from 'reactstrap';
import { WeeklyTable, Welcoming } from '../components';

const Home: NextPage = () => (
  <div>
    <Head>
      <title>Habits</title>
      <meta content="Habit Tracker" name="description" />
      <link href="/favicon.ico" rel="icon" />
    </Head>

    <Welcoming />

    <hr />

    <Container className={classNames('mt-5', 'mb-5')}>
      <WeeklyTable />
    </Container>
  </div>
);

export default Home;
