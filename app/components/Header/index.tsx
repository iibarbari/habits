import classNames from 'classnames';
import { Container } from 'reactstrap';
import AddNewHabit from '../AddNewHabit';

export default function Header() {
  return (
    <Container className={classNames('mt-5', 'mb-5', 'd-flex', 'justify-content-between')}>
      <h1>HEY 👋🏻</h1>

      <AddNewHabit />
    </Container>
  );
}
