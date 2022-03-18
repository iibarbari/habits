import { collection, getDocs, limit, onSnapshot, query } from '@firebase/firestore'
import { createContext, useEffect, useState } from 'react'
import { firestore } from '../firebase/clientApp'

const initialValue = {
  habits: [],
  error: null,
  loading: true
}

export const HabitContext = createContext<{
  habits: THabit[],
  error: Error | null,
  loading: boolean,
}>(initialValue)

export default function HabitProvider (props: any) {
  const [loading, setLoading] = useState<boolean>(initialValue.loading)
  const [error, setError] = useState<Error | null>(initialValue.error)
  const [habits, setHabits] = useState<THabit[]>(initialValue.habits)

  useEffect(() => {
    const collectionRef = collection(firestore, 'habits')

    const q = query(collectionRef, limit(10))

    return onSnapshot(q, async () => {
      try {
        const result: THabit[] = []
        const docs = await getDocs(q)

        docs.forEach((doc) => {
          result.push({
            ...doc.data(),
            id: doc.id
          } as THabit)
        })

        setHabits(result)
        setLoading(false)
        setError(null)
      } catch (error: unknown) {
        if (error instanceof Error) {
          setHabits([])
          setLoading(false)
          setError(error)
        }
      }
    })
  }, [])

  return (
    <HabitContext.Provider
      value={{
        loading,
        error,
        habits
      }}
    >
      {props.children}
    </HabitContext.Provider>
  )
}
