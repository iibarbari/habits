import dayjs from 'dayjs';
import { doc, setDoc } from 'firebase/firestore';
import { omit } from 'lodash';
import range from 'lodash/range';
import React, { useCallback, useContext } from 'react';
import { FormGroup, Input, Table } from 'reactstrap';
import { HabitContext } from '../../contexts';
import firestore from '../../firebase/clientApp';

export default function WeeklyTable() {
  const {
    habits,
    loading,
  } = useContext(HabitContext);

  const handleChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>, date: number, habit: THabit) => {
      await setDoc(doc(firestore, 'habits', habit.id), {
        ...omit(habit, 'id'),
        updatedAt: dayjs().format('YYYY-MM-DD'),
        days: e.target.checked ? {
          ...habit.days,
          [dayjs().day(date).format('YYYY-MM-DD')]: {
            timestamp: new Date().getTime(),
          },
        } : omit(habit.days, dayjs().day(date).format('YYYY-MM-DD')),
      });
    },
    [],
  );

  return loading ? <p>Loading...</p> : (
    <Table borderless responsive size="sm">
      <thead>
        <tr>
          <th aria-label="habits table" />

          {range(0, 7).map((day) => ({
            date: dayjs().day(day).format('DD MMM'),
            day: dayjs().day(day).format('ddd'),
          })).map(({
            date,
            day,
          }) => (
            <th key={date} scope="col">
              <p>{date}</p>
              <p>{day}</p>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {habits.map((habit) => (
          <tr key={habit.id}>
            <th scope="row">{habit.title}</th>

            {range(0, 7).map((date: number) => (
              <td key={date}>
                <FormGroup>
                  <Input
                    checked={
                      habit.days !== undefined
                      && Object.keys(habit.days).includes(dayjs().day(date).format('YYYY-MM-DD'))
                    }
                    onChange={(e) => handleChange(e, date, habit)}
                    type="checkbox"
                  />
                </FormGroup>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
