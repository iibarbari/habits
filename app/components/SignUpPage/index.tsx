import classNames from 'classnames';
import Head from 'next/head';
import React, { useContext, useState } from 'react';
import {
  Button, Col, Container, Form, FormGroup, Input, Label, Row,
} from 'reactstrap';
import { RouterContext, UserContext } from '../../contexts';
import { ArrowLeft } from '../../icons';
import Icon from '../Icon';
import Layout from '../Layout';

export default function SignUpPage() {
  const { setPage } = useContext(RouterContext);
  const [formData, setFormData] = useState<TSignUp>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { signUp } = useContext(UserContext);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return;
    }

    const response = await signUp({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if (typeof response === 'string') {
      setError(response);
    } else {
      setPage('habits');
    }
  };

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
        <Container className={classNames('mt-5', 'mb-5')}>
          <Row>
            <Col lg={{ offset: 3, size: 6 }} sm={{ offset: 2, size: 8 }}>
              <Form className={classNames('w-100')} onSubmit={handleSubmit}>
                <fieldset>
                  <div className={classNames('d-flex', 'flex-row', 'align-items-center', 'gap-5', 'mb-5')}>
                    <Button className={classNames('p-0')} onClick={() => setPage('landing')}>
                      <Icon height={32} icon={<ArrowLeft />} width={32} />
                    </Button>

                    <h1 className={classNames('m-0')}>Sign Up</h1>
                  </div>

                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      onChange={handleChange}
                      placeholder="Name"
                      required
                      type="text"
                      value={formData.name}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      onChange={handleChange}
                      placeholder="Email"
                      required
                      type="email"
                      value={formData.email}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      id="password"
                      minLength={6}
                      name="password"
                      onChange={handleChange}
                      placeholder="Password"
                      required
                      type="password"
                      value={formData.password}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="confirmPassword">Password Confirmation</Label>
                    <Input
                      id="confirmPassword"
                      minLength={6}
                      name="confirmPassword"
                      onChange={handleChange}
                      placeholder="Password Confirmation"
                      required
                      type="password"
                      value={formData.confirmPassword}
                    />
                  </FormGroup>

                  {error && <p className={classNames('text-danger')}>{error}</p>}

                  <Button className={classNames('mt-3')} color="primary" type="submit">
                    Sign Up
                  </Button>
                </fieldset>
              </Form>
            </Col>
          </Row>
        </Container>
      </Layout>
    </div>
  );
}
