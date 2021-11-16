import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { firebaseApp, googleAuthProvider } from '../firebase/firebase-config';

import { types } from '../types/types';
import { finishLoading, startLoading } from './ui.actions';

// Swet Alert
import Swal from 'sweetalert2';
import { errorHandler } from '../errorHandler/errorHandler';

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    // startLoading
    dispatch(startLoading());
    const auth = getAuth(firebaseApp);
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        // finishLoading
        dispatch(finishLoading());
      })
      .catch((err) => {
        // finishLoading
        dispatch(finishLoading());
        // console.log(err);
        Swal.fire('Error', errorHandler(err.code), 'error');
      });
  };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    const auth = getAuth(firebaseApp);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        await updateProfile(user, { displayName: name });
        dispatch(login(user.uid, user.displayName));
      })
      .catch((err) => {
        // console.log(err);
        Swal.fire('Error', errorHandler(err.code), 'error');
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    const auth = getAuth(firebaseApp);
    signInWithPopup(auth, googleAuthProvider).then(({ user }) => {
      // console.log(user);
      dispatch(login(user.uid, user.displayName));
    });
  };
};

export const login = (uid, displayName) => {
  return {
    type: types.login,
    payload: {
      uid,
      displayName,
    },
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    const auth = getAuth(firebaseApp);
    await signOut(auth);
    dispatch(logout());
  };
};

export const logout = () => {
  return {
    type: types.logout,
  };
};
