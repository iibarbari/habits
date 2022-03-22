import { FirebaseError } from '@firebase/util';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, {
  createContext, useCallback, useEffect, useMemo, useState,
} from 'react';
import firestore from '../firebase/clientApp';

type TSignUp = {
  email: string;
  password: string;
};

type TLogin = {
  email: string;
  password: string;
};

type TUser = {
  uid: string,
  email: string | null
}

type TUserContext = {
  user: TUser | null,
  isLoading: boolean,
  signUp: (_: TSignUp) => Promise<TUser | string>,
  signOut: () => Promise<string | null>,
  login: (_: TLogin) => Promise<TUser | string>
}

const initialValues: TUserContext = {
  user: null,
  isLoading: false,
  signUp: async () => 'Not implemented',
  signOut: async () => 'Not implemented',
  login: async () => 'Not implemented',
};

export const UserContext = createContext<TUserContext>(initialValues);

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<TUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const signUp = useCallback(async ({ email, password }: TSignUp) => {
    const auth = getAuth();

    try {
      setIsLoading(true);

      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      setUser({
        uid: response.user.uid,
        email: response.user.email,
      });

      const docRef = doc(firestore, `users/${response.user.uid}`);

      await setDoc(docRef, {
        email: response.user.email,
        habits: [],
      });

      return {
        uid: response.user.uid,
        email: response.user.email,
      };
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        return error.message;
      }

      return 'Something went wrong';
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    const auth = getAuth();

    try {
      setIsLoading(true);

      await auth.signOut();

      setUser(null);

      return null;
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        return error.message;
      }

      return 'Something went wrong';
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async ({ email, password }: TLogin) => {
    const auth = getAuth();

    setIsLoading(true);

    try {
      const response = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      setUser({
        uid: response.user.uid,
        email: response.user.email,
      });

      return {
        uid: response.user.uid,
        email: response.user.email,
      };
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        return error.message;
      }

      return 'Something went wrong';
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (u) => {
      setIsLoading(true);
      if (u) {
        setUser({
          uid: u.uid,
          email: u.email,
        });
      } else {
        setUser(null);
      }

      setIsLoading(false);
    });
  }, []);

  const value = useMemo(() => ({
    isLoading,
    login,
    signOut,
    signUp,
    user,
  }), [isLoading, login, signOut, signUp, user]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
