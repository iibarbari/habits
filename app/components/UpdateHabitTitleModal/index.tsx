import React, { useCallback, useContext, useState } from 'react';
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

type Props = Overwrite<React.PropsWithoutRef<JSX.IntrinsicElements['div']>, {
  habit: THabit;
  isOpen: boolean;
  onClose: () => void;
}>

export default function UpdateHabitTitleModal({
  isOpen, habit, onClose, ...props
}: Props) {
  const { updateHabitByTitle } = useContext(HabitContext);
  const [error, setError] = useState<string | null>(null);
  const [formHabit, setFormHabit] = useState<THabit>(habit);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await updateHabitByTitle(habit, undefined, formHabit.title);

    if (typeof response === 'string') {
      setError(response);
    } else {
      onClose();
    }
  }, [updateHabitByTitle, habit, formHabit.title, onClose]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormHabit({
      ...formHabit,
      [e.target.name]: e.target.value,
    });
  }, [formHabit]);

  return (
    <Modal centered isOpen={isOpen} toggle={onClose} {...props}>
      <ModalHeader>
        Rename your habit
      </ModalHeader>

      <ModalBody>
        <Form id="update-habit-form" onSubmit={handleSubmit}>
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
                value={formHabit.title}
              />

              {error && <FormFeedback valid={false}>{error}</FormFeedback>}
            </FormGroup>
          </fieldset>
        </Form>
      </ModalBody>

      <ModalFooter>
        <Button color="secondary" onClick={onClose}>
          Cancel
        </Button>

        <Button color="primary" form="update-habit-form" type="submit">
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
}
