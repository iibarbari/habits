import { addDoc, collection } from '@firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
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
import firestore from '../../firebase/clientApp';
import { Plus } from '../../icons';
import Icon from '../Icon';

type TForm = {
  title: string
}

export default function AddNewHabit() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [habit, setHabit] = useState<TForm>({
    title: '',
  });

  const saveNewHabit = useCallback(async () => {
    const collectionRef = collection(firestore, 'habits');

    try {
      await addDoc(collectionRef, {
        title: habit.title,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
        days: {},
      });

      setIsOpen(false);
    } catch (_) {
      setError('Cannot save');
    }
  }, [habit.title]);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    saveNewHabit();
  }, [saveNewHabit]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setHabit({
      ...habit,
      [e.target.name]: e.target.value,
    });
  }, [habit]);

  useEffect(() => {
    setHabit({
      title: '',
    });
  }, [isOpen]);

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

      <Button color="primary" onClick={() => setIsOpen(true)} outline size="sm">
        <Icon icon={<Plus />} width={24} />
      </Button>
    </>
  );
}
