import { FirebaseError } from '@firebase/util';
import dayjs from 'dayjs';
import {
  arrayUnion, doc, getDoc, updateDoc,
} from 'firebase/firestore';
import omit from 'lodash/omit';
import firestore from '../firebase/clientApp';

export async function getAllUserHabits(userId: string): Promise<THabit[] | string> {
  try {
    const docRef = doc(firestore, `users/${userId}`);
    const mySnapshot = await getDoc(docRef);

    if (mySnapshot.exists()) {
      const docData = mySnapshot.data();

      if (docData && docData.habits) {
        return docData.habits;
      }
    }

    return 'Something went wrong';
  } catch (error) {
    if (error instanceof FirebaseError) {
      return error.message;
    }

    return 'Something went wrong';
  }
}

export async function addNewHabit(userId: string, habit: Omit<THabit, 'id'>): Promise<string> {
  const docRef = doc(firestore, `users/${userId}`);

  try {
    await updateDoc(docRef, {
      habits: arrayUnion(habit),
    });

    return 'Habit added';
  } catch (error) {
    if (error instanceof FirebaseError) {
      return error.message;
    }

    return 'Something went wrong';
  }
}

export async function updateHabit(
  userId: string,
  habit: Omit<THabit, 'id'>,
  newDate?: number,
  newTitle?: string,
): Promise<string> {
  const docRef = doc(firestore, `users/${userId}`);

  try {
    const mySnapshot = await getDoc(docRef);

    if (mySnapshot.exists()) {
      const docData = mySnapshot.data();

      if (docData && docData.habits) {
        const updatedHabits = docData.habits.map((item: THabit) => {
          if (item.title === habit.title) {
            const alreadyInArray = newDate === undefined ? -1 : item.days.findIndex((day: number) => dayjs(newDate).isSame(dayjs(day), 'day'));

            if (alreadyInArray >= 0) item.days.splice(alreadyInArray, 1);

            const days = alreadyInArray < 0 && newDate !== undefined
              ? [...item.days, newDate]
              : item.days;

            return {
              ...habit,
              days,
              title: newTitle || habit.title,
            };
          }

          return omit(item, 'id');
        });

        await updateDoc(docRef, {
          habits: updatedHabits,
        });
      }
    }

    return 'Habit updated';
  } catch (error) {
    if (error instanceof FirebaseError) {
      return error.message;
    }

    return 'Something went wrong';
  }
}

export async function removeHabit(userId: string, habit:THabit) {
  const docRef = doc(firestore, `users/${userId}`);

  try {
    const mySnapshot = await getDoc(docRef);

    if (mySnapshot.exists()) {
      const docData = mySnapshot.data();

      if (docData && docData.habits) {
        const habits = docData.habits.filter((item: THabit) => item.title !== habit.title);

        await updateDoc(docRef, {
          habits,
        });
      }
    }

    return 'Habit deleted';
  } catch (error) {
    if (error instanceof FirebaseError) {
      return error.message;
    }

    return 'Something went wrong';
  }
}
