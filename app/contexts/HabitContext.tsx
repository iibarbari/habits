import { FirebaseError } from '@firebase/util';
import {
  arrayUnion, doc, getDoc, updateDoc,
} from 'firebase/firestore';
import React, {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import firestore from '../firebase/clientApp';
import { UserContext } from './UserContext';

const initialValue = {
  habits: [],
  loading: true,
  addHabit: async () => 'Not implemented',
};

export const HabitContext = createContext<{
  addHabit:(_: Omit<THabit, 'id'>) => Promise<string | null>,
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

    try {
      setLoading(true);

      const docRef = doc(firestore, `users/${user.uid}`);
      const mySnapshot = await getDoc(docRef);

      if (mySnapshot.exists()) {
        const docData = mySnapshot.data();

        if (docData && docData.habits) {
          setHabits(docData.habits);
        }
      }

      return null;
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        return err.message;
      }

      return 'Something went wrong';
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    getHabits();
  }, [getHabits]);

  const addHabit = useCallback(
    async (habit: Omit<THabit, 'id'>) => {
      if (user === null) return 'Not logged in';

      try {
        setLoading(true);

        const docRef = doc(firestore, `users/${user.uid}`);

        await updateDoc(docRef, {
          habits: arrayUnion(habit),
        });

        return await getHabits();
      } catch (err: unknown) {
        if (err instanceof FirebaseError) {
          return err.message;
        }

        return 'Something went wrong';
      } finally {
        setLoading(false);
      }
    },
    [getHabits, user],
  );

  const value = useMemo(() => ({
    habits,
    addHabit,
    loading,
  }), [addHabit, habits, loading]);

  return (
    <HabitContext.Provider value={value}>
      {children}
    </HabitContext.Provider>
  );
}
