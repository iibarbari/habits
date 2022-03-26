import classNames from 'classnames';
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { Pen, Trash } from '../../icons';
import DeleteHabitModal from '../DeleteHabitModal';
import Icon from '../Icon';
import UpdateHabitTitleModal from '../UpdateHabitTitleModal';

type Props = Overwrite<React.PropsWithoutRef<JSX.IntrinsicElements['th']>, {
  habit: THabit;
}>

export default function WeeklyTableRowTitle({ habit, ...props }: Props) {
  const [hover, setHover] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);

  return (
    <>
      <DeleteHabitModal
        habit={habit}
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      />

      <UpdateHabitTitleModal
        habit={habit}
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
      />

      <th
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        scope="row"
        {...props}
      >
        <div className={classNames('d-flex', 'gap-3', 'flex-column')}>
          {habit.title}

          {hover && (
            <div className={classNames('d-flex', 'gap-3')}>
              <Button className={classNames('p-1')} onClick={() => setShowUpdateModal(true)}>
                <Icon icon={<Pen />} />
              </Button>

              <Button className={classNames('p-1')} onClick={() => setShowDeleteModal(true)}>
                <Icon icon={<Trash />} />
              </Button>
            </div>
          )}
        </div>
      </th>
    </>
  );
}
