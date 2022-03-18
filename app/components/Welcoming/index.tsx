import classNames from 'classnames';
import { Container } from 'reactstrap';

export default function Welcoming() {
  return (
    <Container className={classNames('mt-5', 'mb-5', 'd-flex', 'justify-content-between')}>
      <h1>Hello, Ilknur</h1>
    </Container>
  );
}
