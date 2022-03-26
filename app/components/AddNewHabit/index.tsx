import classNames from 'classnames';
import React, {
  useCallback, useContext, useState,
} from 'react';
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import { HabitContext } from '../../contexts';
import { Plus } from '../../icons';
import Icon from '../Icon';

export default function AddNewHabit() {
  const { addHabit } = useContext(HabitContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [habit, setHabit] = useState<THabit>({
    title: '',
    days: [],
  });

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await addHabit(habit);

    setError(response);

    if (response === null) {
      setIsOpen(false);
      setHabit({
        title: '',
        days: [],
      });
    }
  }, [addHabit, habit]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setHabit({
      ...habit,
      [e.target.name]: e.target.value,
    });
  }, [habit]);

  return (
    <>
      <Modal centered isOpen={isOpen} toggle={() => setIsOpen((prev) => !prev)}>
        <ModalHeader>
          Add new habit
        </ModalHeader>

        <ModalBody>
          <Form id="new-habit-form" onSubmit={handleSubmit}>
            <fieldset>
              <FormGroup>
                <Label for="new-habit">Enter a new habit to exercise</Label>
                <Input
                  id="new-habit"
                  invalid={error !== null}
                  name="title"
                  onChange={handleChange}
                  placeholder="Be kind to yourself"
                  required
                  type="text"
                  value={habit.title}
                />

                {error && <FormFeedback valid={false}>{error}</FormFeedback>}
              </FormGroup>
            </fieldset>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button color="secondary" onClick={() => setIsOpen((prev) => !prev)}>
            Cancel
          </Button>

          <Button color="primary" form="new-habit-form" type="submit">
            Save
          </Button>
        </ModalFooter>
      </Modal>

      <Button className={classNames('d-flex', 'align-items-center')} color="primary" onClick={() => setIsOpen(true)} outline size="sm">
        <Icon height={24} icon={<Plus />} width={24} />

        Add new habit
      </Button>
    </>
  );
}
