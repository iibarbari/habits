import { FirebaseError } from '@firebase/util';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import firestore from '../firebase/clientApp';
import { RouterContext } from './RouterContext';

type TUserContext = {
  user: TUser | null,
  isLoading: boolean,
  signUp: (_: Omit<TSignUp, 'confirmPassword'>) => Promise<null | string>,
  signOut: () => Promise<string | null>,
  login: (_: TLogin) => Promise<null | string>
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
  const { setPage } = useContext(RouterContext);
  const [user, setUser] = useState<TUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const updateUser = useCallback(async (name: TSignUp['name']) => {
    const auth = getAuth();

    if (auth.currentUser === null) return 'Not authenticated';

    try {
      setIsLoading(true);

      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      if (user !== null) {
        setUser({
          ...user,
          name,
        });
      }

      return null;
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        return error.message;
      }

      return 'Something went wrong';
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const signUp = useCallback(async ({ name, email, password }: Omit<TSignUp, 'confirmPassword'>) => {
    const auth = getAuth();

    try {
      setIsLoading(true);

      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      setUser({
        name,
        uid: response.user.uid,
        email: response.user.email as string,
      });

      const docRef = doc(firestore, `users/${response.user.uid}`);

      await setDoc(docRef, {
        habits: [],
      });

      const updateUserResponse = updateUser(name);

      if (updateUserResponse !== null) {
        return updateUserResponse;
      }

      return null;
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        return error.message;
      }

      return 'Something went wrong';
    } finally {
      setIsLoading(false);
    }
  }, [updateUser]);

  const signOut = useCallback(async () => {
    const auth = getAuth();

    try {
      setIsLoading(true);

      await auth.signOut();

      setUser(null);

      setPage('login');

      return null;
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        return error.message;
      }

      return 'Something went wrong';
    } finally {
      setIsLoading(false);
    }
  }, [setPage]);

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
        name: response.user.displayName as string,
        uid: response.user.uid,
        email: response.user.email as string,
      });

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

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (u) => {
      setIsLoading(true);

      if (u) {
        setUser({
          name: u.displayName as string,
          uid: u.uid,
          email: u.email as string,
        });
      } else {
        setUser(null);
      }

      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (user !== null) {
      setPage('habits');
    } else {
      setPage('landing');
    }
  }, [setPage, user]);

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
