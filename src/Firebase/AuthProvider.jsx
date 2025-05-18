import React, { createContext } from 'react';
import { app } from './firebase_init_config';
import { createUserWithEmailAndPassword, deleteUser, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {


    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const deleteUserData = () => {
        return deleteUser(auth.currentUser);
    }


    const AuthInfo = {
      createUser,
      signInUser,
      deleteUserData
    };
    return (
        <AuthContext value={AuthInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;