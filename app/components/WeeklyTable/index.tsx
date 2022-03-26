import dayjs from 'dayjs';
import range from 'lodash/range';
import React, { useCallback, useContext } from 'react';
import { FormGroup, Input, Table } from 'reactstrap';
import { HabitContext } from '../../contexts';
import WeeklyTableRowTitle from '../WeeklyTableRowTitle';

export default function WeeklyTable() {
  const {
    habits,
    updateHabitByTitle,
    loading,
  } = useContext(HabitContext);

  const handleChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>, date: number, habit: THabit) => {
      e.preventDefault();

      await updateHabitByTitle(habit, date);
    },
    [updateHabitByTitle],
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
          <tr key={habit.title}>
            <WeeklyTableRowTitle habit={habit} />

            {range(0, 7).map((date: number) => (
              <td key={date}>
                <FormGroup>
                  <Input
                    checked={
                      habit.days !== undefined
                      && habit.days.find((d) => dayjs(d).isSame(dayjs().day(date), 'day')) !== undefined
                    }
                    onChange={(e) => {
                      handleChange(e, new Date(dayjs().day(date).toDate()).getTime(), habit);
                    }}
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
