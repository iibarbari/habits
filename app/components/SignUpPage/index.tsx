import classNames from 'classnames';
import Head from 'next/head';
import React, { useContext, useState } from 'react';
import {
  Button, Col, Container, Form, FormGroup, Input, Label, Row,
} from 'reactstrap';
import { RouterContext, UserContext } from '../../contexts';

type TSignUp = {
  email: string,
  password: string,
  passwordConfirm: string,
}

export default function SignUpPage() {
  const { setPage } = useContext(RouterContext);
  const [formData, setFormData] = useState<TSignUp>({
    email: '',
    password: '',
    passwordConfirm: '',
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

    if (formData.password !== formData.passwordConfirm) {
      return;
    }

    const response = await signUp({ email: formData.email, password: formData.password });

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

      <Container className={classNames('mt-5', 'mb-5')}>
        <Row>
          <Col lg={{ offset: 3, size: 6 }} sm={{ offset: 2, size: 8 }}>
            <Form className={classNames('w-100')} onSubmit={handleSubmit}>
              <fieldset>
                <h1 className={classNames('mb-5')}>Sign Up</h1>

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
                  <Label for="passwordConfirm">Password Confirmation</Label>
                  <Input
                    id="passwordConfirm"
                    minLength={6}
                    name="passwordConfirm"
                    onChange={handleChange}
                    placeholder="Password Confirmation"
                    required
                    type="password"
                    value={formData.passwordConfirm}
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
    </div>
  );
}
