import React, {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import {
  addNewHabit, getAllUserHabits, removeHabit, updateHabit,
} from '../helpers';
import { UserContext } from './UserContext';

const initialValue = {
  habits: [],
  loading: true,
  addHabit: async () => 'Not implemented',
  updateHabitByTitle: async () => 'Not implemented',
  removeHabitByTitle: async () => 'Not implemented',
};

export const HabitContext = createContext<{
  addHabit:(_: THabit) => Promise<string | null>,
  updateHabitByTitle: (
    _habit: THabit,
    _newDate?: number,
    _newTitle?: string
  ) => Promise<string | void>,
  removeHabitByTitle: (_habit: THabit) => Promise<string | null>,
  habits: THabit[],
  loading: boolean
    }>(initialValue);

export default function HabitProvider({ children }: { children: React.ReactNode }) {
  const [habits, setHabits] = useState<THabit[]>(initialValue.habits);
  const [loading, setLoading] = useState<boolean>(initialValue.loading);
  const { user } = useContext(UserContext);

  const getHabits = useCallback(async () => {
    if (user === null) {
      setHabits([]);

      return 'Not logged in';
    }

    setLoading(true);

    const habitsResponse = await getAllUserHabits(user.uid);

    setHabits(typeof habitsResponse === 'string' ? [] : habitsResponse);

    setLoading(false);

    return habitsResponse;
  }, [user]);

  const updateHabitByTitle = useCallback(async (
    habit: THabit,
    newDate?: number,
    newTitle?: string,
  ) => {
    if (user === null) return;

    setLoading(true);

    await updateHabit(user.uid, habit, newDate, newTitle);

    setLoading(false);

    await getHabits();
  }, [getHabits, user]);

  useEffect(() => {
    getHabits();
  }, [getHabits, user]);

  const addHabit = useCallback(
    async (habit: THabit) => {
      if (user === null) return 'Not logged in';

      setLoading(true);

      await addNewHabit(user.uid, habit);

      setLoading(false);

      await getHabits();

      return null;
    },
    [getHabits, user],
  );

  const removeHabitByTitle = useCallback(
    async (habit: THabit) => {
      if (user === null) return 'Not logged in';

      setLoading(true);

      await removeHabit(user.uid, habit);

      setLoading(false);

      await getHabits();

      return null;
    },
    [getHabits, user],
  );

  const value = useMemo(() => ({
    habits,
    addHabit,
    loading,
    removeHabitByTitle,
    updateHabitByTitle,
  }), [addHabit, habits, updateHabitByTitle, removeHabitByTitle, loading]);

  return (
    <HabitContext.Provider value={value}>
      {children}
    </HabitContext.Provider>
  );
}
