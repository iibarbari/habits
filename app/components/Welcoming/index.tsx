import classNames from 'classnames';
import { Button, Container } from 'reactstrap';

export default function Welcoming() {
  return (
    <Container className={classNames('mt-5', 'mb-5', 'd-flex', 'justify-content-between')}>
      <h1>Hello, Ilknur</h1>

      <Button aria-label="Add" color="primary" outline size="sm">
        <i aria-hidden="true" className="bi fs-3 bi-plus d-flex" />
      </Button>
    </Container>
  );
}
