import Head from 'next/head';
import React, { useContext } from 'react';
import {
  Button, Col, Container, Row,
} from 'reactstrap';
import { RouterContext } from '../../contexts';
import Layout from '../Layout';

export default function LandingPage() {
  const { setPage } = useContext(RouterContext);
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

      <Layout verticallyCenter>
        <Container>
          <Row>
            <Col>
              <h1>Make your habits visible on every new tab.</h1>

              <p>
                Remember to exercise with small tasks,
                and never break the chain two days in a row.
              </p>
            </Col>
          </Row>

          <Row>
            <Col className="mt-3" lg={2} md={4} sm={12}>
              <Button block color="primary" onClick={() => setPage('login')} outline>Login</Button>
            </Col>

            <Col className="mt-3" lg={2} md={4} sm={12}>
              <Button block color="primary" onClick={() => setPage('sign-up')}>Sign Up</Button>
            </Col>
          </Row>
        </Container>
      </Layout>
    </div>
  );
}
