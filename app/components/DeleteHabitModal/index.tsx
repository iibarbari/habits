import React, { useCallback, useContext, useState } from 'react';
import {
  Button, FormFeedback, Modal, ModalBody, ModalFooter, ModalHeader,
} from 'reactstrap';
import { HabitContext } from '../../contexts';

type Props = Overwrite<React.PropsWithoutRef<JSX.IntrinsicElements['div']>, {
  habit: THabit;
  isOpen: boolean;
  onClose: () => void;
}>

export default function DeleteHabitModal({
  isOpen, habit, onClose, ...props
}: Props) {
  const { removeHabitByTitle } = useContext(HabitContext);
  const [error, setError] = useState<string | null>(null);

  const handleClick = useCallback(async () => {
    const response = await removeHabitByTitle(habit);

    setError(response);

    if (response === null) {
      onClose();
    }
  }, [removeHabitByTitle, habit, onClose]);

  return (
    <Modal centered isOpen={isOpen} toggle={onClose} {...props}>
      <ModalHeader>
        Delete
        {' '}
        {habit.title}
        ?
      </ModalHeader>

      <ModalBody>
        <p>
          Are you sure you want to delete
          {' '}
          {habit.title}
          ? This is an irreversible action.
        </p>

        {error && <FormFeedback valid={false}>{error}</FormFeedback>}
      </ModalBody>

      <ModalFooter>
        <Button color="secondary" onClick={onClose}>
          Cancel
        </Button>

        <Button color="danger" onClick={handleClick}>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
}
