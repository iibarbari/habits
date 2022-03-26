import classNames from 'classnames';
import Link from 'next/link';
import { useContext } from 'react';
import { Button, Container } from 'reactstrap';
import { UserContext } from '../../contexts';
import AddNewHabit from '../AddNewHabit';

export default function Header() {
  const { user, isLoading, signOut } = useContext(UserContext);

  return user === null
    ? (
      <>
        <Link href="/login" passHref>
          <Button disabled={isLoading}>
            Login
          </Button>
        </Link>

        <Link href="/sign-up" passHref>
          <Button disabled={isLoading}>
            Sign Up
          </Button>
        </Link>
      </>
    )
    : (
      <Container className={classNames('mt-5', 'mb-5', 'd-flex', 'justify-content-between')}>
        <h1>
          {`HEY ${user.name} 👋🏻`}
        </h1>

        <AddNewHabit />

        <Button disabled={isLoading} onClick={() => signOut()}>
          Sign Out
        </Button>
      </Container>
    );
}
