import classNames from 'classnames';
import { Container } from 'reactstrap';
import Header from '../Header';
import WeeklyTable from '../WeeklyTable';

export default function HabitsPage() {
  return (
    <>
      <Header />

      <hr />

      <Container className={classNames('mt-5', 'mb-5')}>
        <WeeklyTable />
      </Container>
    </>
  );
}
